"use client";

import { useEffect, useRef } from "react";

const INTRO_MS = 3200;

type MeshQuality = "high" | "medium" | "low";

type QualityConfig = {
  spacing: number;
  dprMax: number;
  diagonal: boolean;
  introFps: number;
  /** イントロ後もパルスを流し続ける（高負荷を避けるため high のみ true） */
  steadyPulse: boolean;
  steadyFps: number;
};

const QUALITY: Record<MeshQuality, QualityConfig> = {
  high: {
    spacing: 7,
    dprMax: 1.5,
    diagonal: true,
    introFps: 60,
    steadyPulse: true,
    steadyFps: 20,
  },
  medium: {
    spacing: 10,
    dprMax: 1.25,
    diagonal: false,
    introFps: 30,
    steadyPulse: false,
    steadyFps: 0,
  },
  low: {
    spacing: 14,
    dprMax: 1,
    diagonal: false,
    introFps: 24,
    steadyPulse: false,
    steadyFps: 0,
  },
};

function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge0 === edge1) return x >= edge1 ? 1 : 0;
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function stagedFadeX(x: number, width: number): number {
  const t = x / width;
  const appear = smoothstep(0, 0.36, t);
  const disappear = 1 - smoothstep(0.52, 0.9, t);
  return appear * disappear;
}

function introWave(x: number, width: number, elapsed: number): number {
  if (elapsed >= INTRO_MS) return 1;
  const progress = elapsed / INTRO_MS;
  const waveFront = progress * width * 1.06;
  const band = width * 0.28;
  if (x >= waveFront) return 0;
  if (x <= waveFront - band) return 1;
  return 1 - smoothstep(waveFront - band, waveFront, x);
}

function detectQuality(reducedMotion: boolean): MeshQuality {
  if (reducedMotion) return "low";

  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (conn?.saveData) return "low";

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const lowCpu =
    navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;

  if (coarse && narrow) return "low";
  if (narrow || lowCpu) return "medium";
  return "high";
}

type Node = { x: number; y: number; phase: number };
type Edge = {
  from: number;
  to: number;
  progress: number;
  speed: number;
  drawPulse: boolean;
};

type Graph = {
  nodes: Node[];
  edges: Edge[];
  width: number;
  height: number;
};

function buildGraph(
  width: number,
  height: number,
  config: QualityConfig,
): Graph {
  const { spacing, diagonal } = config;
  const cols = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / spacing) + 1;
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      nodes.push({
        x: col * spacing,
        y: row * spacing,
        phase: ((col * 17 + row * 31) % 100) / 100 * Math.PI * 2,
      });
    }
  }

  const index = (col: number, row: number) => row * cols + col;
  const pulsePick = config.steadyPulse ? 0.4 : 0.22;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const from = index(col, row);
      if (col + 1 < cols) {
        edges.push(makeEdge(from, index(col + 1, row), pulsePick));
      }
      if (row + 1 < rows) {
        edges.push(makeEdge(from, index(col, row + 1), pulsePick));
      }
      if (diagonal && col + 1 < cols && row + 1 < rows && (col + row) % 4 === 0) {
        edges.push(makeEdge(from, index(col + 1, row + 1), pulsePick * 0.5));
      }
    }
  }

  return { nodes, edges, width, height };
}

function makeEdge(from: number, to: number, pulsePick: number): Edge {
  return {
    from,
    to,
    progress: Math.random(),
    speed: 0.0018 + Math.random() * 0.0022,
    drawPulse: Math.random() < pulsePick,
  };
}

function dotOpacity(
  x: number,
  width: number,
  elapsed: number,
  reducedMotion: boolean,
): number {
  const spatial = stagedFadeX(x, width);
  const temporal = reducedMotion ? 1 : introWave(x, width, elapsed);
  return spatial * temporal;
}

/**
 * ヒーロー写真上の青ドットを、ノード接続＋データパルス付きの
 * ブロックチェーン風メッシュとして描画する。
 * 端末性能・表示状態に応じて描画負荷を自動調整する。
 */
export function PortfolioHeroChainMesh() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let quality = detectQuality(reducedMotion);
    let config = QUALITY[quality];

    let frame = 0;
    let inView = true;
    let tabVisible = !document.hidden;
    let graph = buildGraph(1, 1, config);
    let lastPaint = 0;
    let introDone = reducedMotion;
    const introStart = performance.now();

    const currentFps = () =>
      introDone ? config.steadyFps : config.introFps;

    const paintBackground = (width: number, height: number, elapsed: number) => {
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      const stops = [
        [0, 0],
        [0.1, 0.06],
        [0.22, 0.22],
        [0.34, 0.42],
        [0.46, 0.58],
        [0.58, 0.38],
        [0.7, 0.18],
        [0.82, 0.06],
        [0.92, 0],
      ] as const;

      for (const [pos, peak] of stops) {
        const x = width * pos;
        const alpha = peak * dotOpacity(x, width, elapsed, reducedMotion);
        gradient.addColorStop(pos, `rgb(224 242 254 / ${alpha})`);
      }
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const paint = (time: number) => {
      const { nodes, edges, width, height } = graph;
      const elapsed = time - introStart;
      const inIntro = !introDone && elapsed < INTRO_MS;
      if (!introDone && elapsed >= INTRO_MS) introDone = true;

      ctx.clearRect(0, 0, width, height);
      paintBackground(width, height, inIntro ? elapsed : INTRO_MS);

      ctx.lineWidth = 0.75;
      for (const edge of edges) {
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        const fade =
          (stagedFadeX(from.x, width) + stagedFadeX(to.x, width)) * 0.5;
        const intro = reducedMotion
          ? 1
          : inIntro
            ? Math.min(
                introWave(from.x, width, elapsed),
                introWave(to.x, width, elapsed),
              )
            : 1;
        const alpha = fade * intro;
        if (alpha < 0.02) continue;

        ctx.strokeStyle = `rgba(56, 189, 248, ${0.24 * alpha})`;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        const drawPulse =
          edge.drawPulse &&
          (inIntro || (introDone && config.steadyPulse));
        if (drawPulse) {
          edge.progress += edge.speed;
          if (edge.progress > 1) edge.progress = 0;

          const pulseX = from.x + (to.x - from.x) * edge.progress;
          const pulseY = from.y + (to.y - from.y) * edge.progress;
          const pulseAlpha = dotOpacity(
            pulseX,
            width,
            inIntro ? elapsed : INTRO_MS,
            reducedMotion,
          );
          if (pulseAlpha < 0.02) continue;

          ctx.fillStyle = `rgba(56, 189, 248, ${0.92 * pulseAlpha})`;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 1.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const seconds = time / 1000;
      for (const node of nodes) {
        const alpha = dotOpacity(
          node.x,
          width,
          inIntro ? elapsed : INTRO_MS,
          reducedMotion,
        );
        if (alpha < 0.02) continue;

        const base = inIntro
          ? 0.42 + 0.28 * Math.sin(seconds * 2.4 + node.phase)
          : 0.55;
        ctx.fillStyle = `rgba(125, 211, 252, ${base * alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const shouldRunLoop = () => {
      if (!inView || !tabVisible || reducedMotion) return false;
      if (!introDone) return config.introFps > 0;
      return config.steadyPulse && config.steadyFps > 0;
    };

    const stopLoop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const startLoop = () => {
      if (frame !== 0 || !shouldRunLoop()) return;
      lastPaint = 0;
      frame = requestAnimationFrame(loop);
    };

    const loop = (time: number) => {
      frame = 0;
      if (!shouldRunLoop()) return;

      const fps = currentFps();
      const interval = fps > 0 ? 1000 / fps : 0;
      if (interval > 0 && time - lastPaint < interval) {
        frame = requestAnimationFrame(loop);
        return;
      }

      lastPaint = time;
      paint(time);

      if (shouldRunLoop()) {
        frame = requestAnimationFrame(loop);
      }
    };

    const resize = () => {
      const rect = root.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      quality = detectQuality(reducedMotion);
      config = QUALITY[quality];

      const dpr = Math.min(window.devicePixelRatio || 1, config.dprMax);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      graph = buildGraph(rect.width, rect.height, config);

      const elapsed = performance.now() - introStart;
      introDone = reducedMotion || elapsed >= INTRO_MS;
      paint(performance.now());
      stopLoop();
      startLoop();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? true;
        if (inView) startLoop();
        else stopLoop();
      },
      { threshold: 0.05, rootMargin: "48px" },
    );

    const onVisibilityChange = () => {
      tabVisible = !document.hidden;
      if (tabVisible) startLoop();
      else stopLoop();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    intersectionObserver.observe(root);
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div ref={rootRef} className="portfolio-hero-teo-chain-mesh" aria-hidden>
      <canvas ref={canvasRef} className="portfolio-hero-teo-chain-mesh__canvas" />
    </div>
  );
}
