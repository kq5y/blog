import fs from "node:fs";
import type { RemarkPlugin } from "@astrojs/markdown-remark";

function formatCharCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return count.toString();
}

export const remarkCharCount: RemarkPlugin = () => {
  return (_tree, file) => {
    const filepath = file.history[0];
    if (!filepath) {
      throw new Error("File path not found");
    }

    const content = fs.readFileSync(filepath, "utf-8");

    if (!file.data.astro?.frontmatter) throw new Error("Astro data not found");

    file.data.astro.frontmatter.charCount = formatCharCount(
      content.replace(/\s/g, "").replace(/<!--.*?-->/g, "").length
    );
  };
};
