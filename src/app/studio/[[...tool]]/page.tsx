import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // browser（既定）だと SSR 時に Studio が描画され SchemaError になる。
  // hash ならクライアントマウントまで Studio を描画しない。
  return <NextStudio config={config} history="hash" />;
}
