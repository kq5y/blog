/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly CF_BEACON_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
