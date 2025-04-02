import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import solid from "@astrojs/solid-js";
import playformCompress from "@playform/compress";

import { METADATA } from "./src/const";
import fontOptimizer from "./src/integrations/font-optimizer";

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import rehypeExpressiveCode from "rehype-expressive-code";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeMermaidCtm from "rehype-mermaid-ctm";
import rehypeRaw from "rehype-raw";
import remarkLinkCardCtm from "remark-link-card-ctm";
import remarkMath from "remark-math";

export default defineConfig({
  site: METADATA.url,
  output: "static",
  build: {
    inlineStylesheets: "auto",
    assets: "assets",
  },
  integrations: [solid(), fontOptimizer(), partytown(), playformCompress()],
  markdown: {
    remarkPlugins: [
      [remarkLinkCardCtm, { shortenUrl: true, imgAsyncLazy: true }],
      remarkMath,
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeMermaidCtm,
        {
          outputType: "img-svg",
          imgAsyncLazy: true,
          mermaidConfig: {
            theme: "default",
            themeVariables: {
              background: "#eef5fb",
              mainBkg: "#eef5fb",
              nodeBkg: "#e2ecf5",
              nodeBorder: "#e2e8f0",
              nodeTextColor: "#334155",
              textColor: "#334155",
              labelColor: "#475569",
              secondaryLabelColor: "#64748b",
              noteTextColor: "#94a3b8",
              edgeColor: "#0f766e",
              lineColor: "#0f766e",
              accentColor: "#0f766e",
              clusterBkg: "#eef5fb",
              clusterBorder: "#0f766e",
            },
          },
        },
      ],
      [
        rehypeExpressiveCode,
        {
          themes: ["github-light"],
          plugins: [pluginLineNumbers()],
          defaultLocale: "ja-JP",
        },
      ],
      rehypeRaw,
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
    remarkRehype: {
      footnoteLabel: "脚注",
    },
    syntaxHighlight: false,
  },
  prefetch: true,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
