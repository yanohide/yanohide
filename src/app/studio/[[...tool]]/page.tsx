import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

// Cloudflare Pages（@cloudflare/next-on-pages）では、動的ルートごとに
// Edge Runtime を明示する必要があるため付与。
export const runtime = 'edge';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
