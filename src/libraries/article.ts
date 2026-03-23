import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { type CollectionEntry, getCollection } from "astro:content";

import { POST_OGP_URL } from "@/const";

import { getZennArticleDetail, getZennArticles } from "./zenn";

interface PostBase {
  title: string;
  tags: string[];
  hidden?: boolean;
  ogp?: string;
  createdDate: string;
  updatedDate: string;
}

interface BlogPost extends PostBase {
  type: "Blog";
  slug: string;
  body?: string;
  path: string;
}

interface ZennPost extends PostBase {
  type: "Zenn";
  slug: string;
  url: string;
}

export type Post = BlogPost | ZennPost;

type BlogEntry = CollectionEntry<"post">;

let blogEntryCache: BlogEntry[] | null = null;
let blogPostsCache: BlogPost[] | null = null;
const postDateCache = new Map<string, { created: string; updated: string }>();

async function getPostCollectionCache(): Promise<BlogEntry[]> {
  if (!blogEntryCache) {
    blogEntryCache = await getCollection("post");
  }
  return blogEntryCache;
}

function formatDate(input: string): string {
  const match = input.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2}:\d{2})/);
  if (match) {
    return `${match[1]} ${match[2]}`;
  }

  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${input}`);
  }

  return date.toISOString().slice(0, 19).replace("T", " ");
}

function getPostDate(filepath: string) {
  const cached = postDateCache.get(filepath);
  if (cached) return cached;

  try {
    const output = execFileSync(
      "git",
      ["log", "--follow", "--format=%aI|%cI", "--", filepath],
      { encoding: "utf-8" }
    ).trim();
    const lines = output.split("\n").filter(Boolean);

    if (lines.length > 0) {
      const [createdRaw = ""] = lines.at(-1)?.split("|") ?? [];
      const [, updatedRaw = createdRaw] = lines[0]?.split("|") ?? [];
      const result = {
        created: formatDate(createdRaw),
        updated: formatDate(updatedRaw),
      };
      postDateCache.set(filepath, result);
      return result;
    }
  } catch {
    // Fall back to filesystem metadata when git history is unavailable.
  }

  const fallbackIso = statSync(filepath).mtime.toISOString();
  const fallback = {
    created: formatDate(fallbackIso),
    updated: formatDate(fallbackIso),
  };
  postDateCache.set(filepath, fallback);
  return fallback;
}

export function convertParams(posts: BlogPost[]) {
  return posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
}

export function getUniqueTags(posts: BlogPost[]) {
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

export function makeOgpUrl(slug: string, datetime: string) {
  const date = datetime.slice(0, 10);
  return `${POST_OGP_URL}?slug=${slug}&date=${date}`;
}

export function entry2post(post: BlogEntry): BlogPost {
  if (!post.filePath) throw new Error("filePath is undefined");
  const { created, updated } = getPostDate(post.filePath);
  return {
    createdDate: created,
    updatedDate: updated,
    ...post.data,
    type: "Blog",
    slug: post.id,
    body: post.body,
    path: `/posts/${post.id}/`,
    ogp: makeOgpUrl(post.id, post.data.createdDate || created),
  };
}

export async function getBlogPosts(showHidden = false): Promise<BlogPost[]> {
  if (!blogPostsCache) {
    const articles = await getPostCollectionCache();
    blogPostsCache = articles.map(entry2post);
  }

  return blogPostsCache.filter((article) => {
    return showHidden || article.hidden !== true;
  });
}

export async function getZennPosts(username: string): Promise<ZennPost[]> {
  const articles = await getZennArticles(username);
  return await Promise.all(
    articles.map(async (article) => {
      const detail = await getZennArticleDetail(article.slug);
      return {
        type: "Zenn",
        title: detail.title,
        slug: detail.slug,
        url: `https://zenn.dev${detail.path}`,
        tags: detail.topics.map((topic) => topic.display_name),
        createdDate: formatDate(detail.published_at),
        updatedDate: formatDate(detail.body_updated_at),
        ogp: detail.og_image_url,
      };
    })
  );
}

export async function getAllPosts(
  zennUsername: string | null,
  showHidden = false
): Promise<Post[]> {
  const posts: Post[] = [];
  posts.push(...(await getBlogPosts(showHidden)));
  if (zennUsername) posts.push(...(await getZennPosts(zennUsername)));
  return posts.sort((a, b) => {
    return (
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  });
}
