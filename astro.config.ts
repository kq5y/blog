import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import remarkLinkCard from "remark-link-card";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [[remarkLinkCard, { shortenUrl: true }], remarkMath],
    rehypePlugins: [
      rehypeRaw,
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
      rehypeKatex,
    ],
    remarkRehype: {
      footnoteLabel: "脚注",
    },
  },
});
