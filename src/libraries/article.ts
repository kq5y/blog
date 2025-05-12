import { execSync } from "node:child_process";
import {
  type AnyEntryMap,
  type CollectionEntry,
  type CollectionKey,
  getCollection,
} from "astro:content";

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

type Collection = CollectionEntry<keyof AnyEntryMap>;

const collectionCache: { [key: string]: Collection[] } = {};

async function getCollectionCache(
  collection: CollectionKey
): Promise<Collection[]> {
  if (!collectionCache[collection]) {
    collectionCache[collection] = await getCollection(collection);
  }
  return collectionCache[collection];
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

function getPostDate(filepath: string) {
  const created = execSync(
    `git log --diff-filter=A --follow --format=%aI -- "${filepath}" | tail -1`
  )
    .toString()
    .trim();
  const updated = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`)
    .toString()
    .trim();
  return {
    created: formatDate(created),
    updated: formatDate(updated),
  };
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

export function entry2post(post: AnyEntryMap["post"][string]): BlogPost {
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
  const articles = await getCollectionCache("post");
  return articles
    .filter((article) => showHidden || !(article.data.hidden === true))
    .map(entry2post);
}

export async function getZennPosts(username: string): Promise<ZennPost[]> {
  const articles = await getZennArticles(username);
  const posts: ZennPost[] = [];
  for (const article of articles) {
    const detail = await getZennArticleDetail(article.slug);
    posts.push({
      type: "Zenn",
      title: detail.title,
      slug: detail.slug,
      url: `https://zenn.dev${detail.path}`,
      tags: detail.topics.map((topic) => topic.display_name),
      createdDate: formatDate(detail.published_at),
      updatedDate: formatDate(detail.body_updated_at),
      ogp: detail.og_image_url,
    });
  }
  return posts;
}

export async function getAllPosts(
  zennUsername: string | null,
  showHidden = false
): Promise<Post[]> {
  const posts = [];
  posts.push(...(await getBlogPosts(showHidden)));
  if (zennUsername) posts.push(...(await getZennPosts(zennUsername)));
  return posts.sort((a, b) => {
    return (
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  });
}
