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
            theme: "dark",
            themeVariables: {
              background: "#1a1b26",
              primaryColor: "#7aa2f7",
              primaryTextColor: "#c0caf5",
              primaryBorderColor: "#7aa2f7",
              lineColor: "#bb9af7",
              secondaryColor: "#414868",
              tertiaryColor: "#32344a",
              textColor: "#c0caf5",
              nodeTextColor: "#c0caf5",
              mainBkg: "#1a1b26",
              nodeBorder: "#7aa2f7",
              edgeLabelBackground: "#2f334d",
              labelTextColor: "#c0caf5",
              nodeAltBackground: "#24283b",
              tooltipBackgroundColor: "#1a1b26",
              tooltipTextColor: "#c0caf5",
              tooltipBorderColor: "#7aa2f7",
            },
          },
        },
      ],
      [
        rehypeExpressiveCode,
        {
          themes: ["tokyo-night"],
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
