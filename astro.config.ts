import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import solid from "@astrojs/solid-js";
import playformCompress from "@playform/compress";
import playformInline from "@playform/inline";

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import rehypeExpressiveCode from "rehype-expressive-code";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeMermaidCtm from "rehype-mermaid-ctm";
import rehypeRaw from "rehype-raw";
import remarkLinkCardCtm from "remark-link-card-ctm";
import remarkMath from "remark-math";

export default defineConfig({
  site: "https://t3x.jp",
  integrations: [
    solid(),
    partytown(),
    playformInline({ Logger: 1 }),
    playformCompress(),
  ],
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
              background: "#010721",
              primaryColor: "#7a4d7c",
              primaryTextColor: "#edeaf6",
              primaryBorderColor: "#7a4d7c",
              lineColor: "#9e66a7",
              secondaryColor: "#1e133c",
              tertiaryColor: "#140b2f",
              textColor: "#edeaf6",
              nodeTextColor: "#edeaf6",
              mainBkg: "#140b2f",
              nodeBorder: "#7a4d7c",
              edgeLabelBackground: "#230113",
              labelTextColor: "#edeaf6",
              nodeAltBackground: "#130f2f",
              tooltipBackgroundColor: "#140b2f",
              tooltipTextColor: "#edeaf6",
              tooltipBorderColor: "#7a4d7c",
            },
          },
        },
      ],
      [
        rehypeExpressiveCode,
        {
          themes: ["laserwave"],
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
