import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import remarkLinkCard from "remark-link-card";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [remarkLinkCard, remarkMath],
    rehypePlugins: [rehypeKatex],
    remarkRehype: {
      footnoteLabel: "脚注",
    },
  },
});
