import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { METADATA } from "@/const";
import { getBlogPosts } from "@/libraries/article";

export async function GET(context: APIContext) {
  const posts = await getBlogPosts();
  return await rss({
    title: `${METADATA.domain} posts`,
    description: `RSS feed of posts on ${METADATA.domain}`,
    site: context.site?.origin || "",
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.date),
      link: post.path,
      customData: `
        <slug>${post.slug}</slug>
        <hidden>${post.hidden ? "true" : "false"}</hidden>
        <tags>${post.tags.join(",")}</tags>
      `,
    })),
  });
}
