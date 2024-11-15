import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import icon from "astro-icon";

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import rehypeExpressiveCode from "rehype-expressive-code";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkLinkCard from "remark-link-card";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

const rehypeMermaidPre = () => {
  return (tree: any) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "pre" &&
        parent &&
        node.children.length === 1 &&
        node.children[0].tagName === "code" &&
        node.children[0].properties.className &&
        node.children[0].properties.className.includes("language-mermaid")
      ) {
        node.properties = node.properties || {};
        node.properties.className = ["mermaid-block"];
        node.children = node.children[0].children;
      }
    });
  };
};

export default defineConfig({
  integrations: [tailwind(), icon(), playformCompress()],
  markdown: {
    remarkPlugins: [[remarkLinkCard, { shortenUrl: true }], remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeMermaidPre,
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
