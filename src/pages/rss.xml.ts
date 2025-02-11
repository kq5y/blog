import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { SITE_NAME } from "@/const";
import { getBlogPosts } from "@/lib/article";

export async function GET(context: APIContext) {
  const posts = await getBlogPosts();
  return await rss({
    title: `${SITE_NAME} posts`,
    description: `RSS feed of posts on ${SITE_NAME}`,
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
