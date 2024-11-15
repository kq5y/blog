import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import icon from "astro-icon";

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import rehypeExpressiveCode from "rehype-expressive-code";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeMermaidCtm from "rehype-mermaid-ctm";
import rehypeRaw from "rehype-raw";
import remarkLinkCard from "remark-link-card";
import remarkMath from "remark-math";

export default defineConfig({
  integrations: [tailwind(), icon(), playformCompress()],
  markdown: {
    remarkPlugins: [[remarkLinkCard, { shortenUrl: true }], remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeMermaidCtm,
        {
          outputType: "img-svg",
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
});
