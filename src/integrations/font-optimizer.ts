// Modified from https://github.com/kojimajunya/googlefonts-streamline-test

import { promises as fs } from "node:fs";
import { relative } from "node:path";
import type { AstroIntegration } from "astro";
import { JSDOM } from "jsdom";

const LIMIT_CHARS = 1000;

export default (): AstroIntegration => ({
  name: "fonts-optimizer",
  hooks: {
    "astro:build:done": async ({ dir, assets, logger }) => {
      for (const [, urls] of assets.entries()) {
        for (const { pathname: filePath } of urls) {
          const fileName = `/${relative(dir.pathname, filePath)}`;
          if (filePath?.endsWith(".html")) {
            try {
              const htmlContent = await fs.readFile(filePath, "utf-8");
              const dom = new JSDOM(htmlContent);
              const document = dom.window.document;
              const { uniqueText, encodedText } =
                await extractBodyTextAndEncode(filePath);
              if (uniqueText.length > LIMIT_CHARS) {
                logger.warn(
                  `Skipped processing ${fileName} because text length exceeds characters limit.`
                );
                continue;
              }
              const linkTags = document.querySelectorAll(
                'link[href*="https://fonts.googleapis.com/css2?family="]'
              );
              if (linkTags.length > 0) {
                for (const linkTag of linkTags) {
                  const originalHref = linkTag.getAttribute("href") || "";
                  const newHref = originalHref.includes("&text=")
                    ? originalHref.replace(/&text=.*$/, `&text=${encodedText}`)
                    : `${originalHref}&text=${encodedText}`;
                  linkTag.setAttribute("href", newHref);
                }
              } else {
                logger.warn(
                  `The <link> tag for Google Fonts was not found: ${fileName}`
                );
              }
              await fs.writeFile(filePath, dom.serialize(), "utf-8");
              logger.info(
                `\x1b[30m(${uniqueText.length} chars)\x1b[39m\t${fileName}`
              );
            } catch (error) {
              logger.error(`Error processing ${fileName}: ${error}`);
            }
          }
        }
      }
      logger.info("\x1b[32m✓ Successfully processed font links.\x1b[39m\n");
    },
  },
});

export const extractBodyTextAndEncode = async (
  filePath: string
): Promise<{ uniqueText: string; encodedText: string }> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const dom = new JSDOM(data);
    const body = dom.window.document.body;
    if (!body) {
      throw new Error("No <body> tag found in the HTML file.");
    }
    const scriptTags = body.querySelectorAll("script");
    for (const script of scriptTags) {
      script.remove();
    }
    const textContent = body.textContent?.trim() ?? "";
    const cleanedText = textContent.replace(/[\s\u3000]+/g, "");
    const uniqueText = Array.from(new Set(cleanedText)).join("");
    const encodedText = encodeURIComponent(uniqueText);
    return { uniqueText, encodedText };
  } catch (error) {
    throw new Error(
      `Error processing file ${filePath}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
