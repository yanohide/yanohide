"""書評記事の文体を確認する（AIっぽい単調さ・定型表現・他記事との重複）。

Usage: python3 check_style.py articles/book-review/<slug>.md

見るもの（本文のみ。表・見出し・引用・リンク・誘導ボックス・参考情報は対象外）:
  1. 文末の単調さ  … 同じ文末が3文以上続く箇所
  2. 文の長さ      … 短文（25字以下）の割合と、長さのばらつき
  3. 接続詞        … 「また」「さらに」などで始まる文の数
  4. 定型表現      … AIの文章に多い決まり文句
  5. 他記事との重複 … 他の書評記事とまったく同じ文（共通の誘導ボックス等は除く）
"""
import glob
import os
import re
import statistics
import sys

path = sys.argv[1]
raw = open(path, encoding="utf-8").read()
body = raw.split("\n---\n", 1)[-1]

# 誘導ボックス・プライムの囲み・参考情報・署名など、全記事共通の部分は除く
for marker in ("👇", "💡 **Kindle", "🎁", "### 参考情報"):
    body = re.sub(rf"{re.escape(marker)}.*?(?=\n---\n|\Z)", "", body, flags=re.S)


def sentences_of(text):
    lines = []
    for line in text.split("\n"):
        s = line.strip()
        if not s or s.startswith(("|", "#", ">", "<!--", "👉", "※", "---")):
            continue
        s = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", s)
        s = re.sub(r"^([-*]|\d+\.)\s*|\*\*", "", s)
        lines.append(s)
    out = []
    for s in lines:
        out += [x + "。" for x in re.split(r"(?<=[。？！])", s) if x.strip()]
    return [re.sub(r"。。$", "。", x).strip() for x in out if len(x.strip()) > 1]


sents = sentences_of(body)
warn = 0


def ending(s):
    s = re.sub(r"[。？！」』）)]+$", "", s)
    for pat in ("ます", "ました", "です", "でした", "でしょう", "ません", "ください", "ない", "た", "る"):
        if s.endswith(pat):
            return pat
    return "その他"


# 1. 文末の単調さ
run, prev, runs = 1, None, []
for s in sents:
    e = ending(s)
    run = run + 1 if (e == prev and e != "その他") else 1
    if run == 3:
        runs.append((e, s[:30]))
    prev = e
print(f"■ 文末の単調さ：同じ文末が3文以上続く箇所 {len(runs)}件")
for e, s in runs[:8]:
    print(f"   「〜{e}」が続く：{s}…")
if len(runs) > 3:
    warn += 1

# 2. 文の長さ
lens = [len(s) for s in sents]
short = sum(1 for n in lens if n <= 25) / len(lens)
sd = statistics.pstdev(lens)
print(f"■ 文の長さ：平均{statistics.mean(lens):.0f}字／ばらつき{sd:.0f}／短文の割合{short:.0%}（目安：短文15%以上・ばらつき15以上）")
if short < 0.15 or sd < 15:
    warn += 1

# 3. 接続詞
conj = ("また", "さらに", "そして", "したがって", "つまり", "一方で", "このように", "そのため", "加えて", "まず")
hits = [s for s in sents if s.startswith(conj)]
per1000 = len(hits) / max(1, sum(lens)) * 1000
print(f"■ 接続詞で始まる文：{len(hits)}文（1,000字あたり{per1000:.1f}。目安3以下）")
if per1000 > 3:
    warn += 1

# 4. 定型表現
stock = ["いかがでしたか", "と言えるでしょう", "ではないでしょうか", "することが重要です", "について解説します",
         "結論から言うと", "まとめると", "さまざまな", "といっても過言ではありません", "必見", "徹底解説",
         "ことができます", "と言えます", "非常に", "深く考えさせられ"]
found = {w: body.count(w) for w in stock if body.count(w)}
print("■ 定型表現：" + ("なし" if not found else "、".join(f"「{w}」×{n}" for w, n in found.items())))
if sum(found.values()) > 5:
    warn += 1

# 5. 他記事との重複
mine = {s for s in sents if len(s) >= 25}
dups = []
for other in glob.glob(os.path.join(os.path.dirname(path), "*.md")):
    if os.path.abspath(other) == os.path.abspath(path):
        continue
    o = open(other, encoding="utf-8").read().split("\n---\n", 1)[-1]
    for m in ("👇", "💡 **Kindle", "🎁", "### 参考情報"):
        o = re.sub(rf"{re.escape(m)}.*?(?=\n---\n|\Z)", "", o, flags=re.S)
    common = mine & set(sentences_of(o))
    dups += [(os.path.basename(other), s) for s in common]
print(f"■ 他記事とまったく同じ文：{len(dups)}文")
for f, s in dups[:8]:
    print(f"   {f}：{s[:40]}…")
if dups:
    warn += 1

# 6. 他記事と同じ見出し（定番見出しは除く）
STANDARD = {"はじめに", "まとめ", "よくある質問", "参考情報", "本の概要", "あらすじ", "この本の内容",
            "主な登場人物", "この本に登場するキーワード", "この記事を書いた人", "こんな人に読んでほしい"}
def heads(text):
    return {re.sub(r"^#+\s*", "", l).strip() for l in text.split("\n") if re.match(r"^#{2,3}\s", l)} - STANDARD
my_heads = heads(raw)
same_heads = []
for other in glob.glob(os.path.join(os.path.dirname(path), "*.md")):
    if os.path.abspath(other) != os.path.abspath(path):
        same_heads += [(os.path.basename(other), h) for h in my_heads & heads(open(other, encoding="utf-8").read())]
print(f"■ 他記事と同じ見出し：{len(same_heads)}件")
for f, h in same_heads[:8]:
    print(f"   {f}：{h}")
if same_heads:
    warn += 1

# 7. 書いた人・要確認
print("■ 「この記事を書いた人」：" + ("あり" if "この記事を書いた人" in raw else "なし（追加する）"))
if "この記事を書いた人" not in raw:
    warn += 1
print(f"■ 【要確認】の残り：{raw.count('【要確認')}件（公開前に本人が解消）")

print("STYLE OK" if warn == 0 else f"STYLE 要見直し {warn}項目")
