/**
 * Cloudflare Pages（@cloudflare/next-on-pages）向け:
 * この配下（/studio/[[...tool]]）は Edge Runtime としてビルドする必要がある。
 */
export const runtime = 'edge';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh">{children}</div>;
}
