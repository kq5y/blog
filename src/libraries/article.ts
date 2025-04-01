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
  date: string;
  hidden?: boolean;
  ogp?: string;
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

export function convertParams(posts: BlogPost[]) {
  return posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
}

export function makeOgpUrl(slug: string, date: string) {
  return `${POST_OGP_URL}?slug=${slug}&date=${date}`;
}

export async function getBlogPosts(showHidden = false): Promise<BlogPost[]> {
  const articles = await getCollectionCache("post");
  return articles
    .filter((article) => showHidden || !(article.data.hidden === true))
    .map(
      (article) =>
        ({
          ...article.data,
          type: "Blog",
          slug: article.id,
          body: article.body,
          path: `/posts/${article.id}/`,
          ogp: makeOgpUrl(article.id, article.data.date),
        }) as BlogPost
    );
}

export async function getZennPosts(username: string): Promise<ZennPost[]> {
  const articles = await getZennArticles(username);
  const posts: ZennPost[] = [];
  for (const article of articles) {
    const detail = await getZennArticleDetail(article.slug);
    const date = new Date(detail.published_at);
    posts.push({
      type: "Zenn",
      title: detail.title,
      slug: detail.slug,
      url: `https://zenn.dev${detail.path}`,
      tags: detail.topics.map((topic) => topic.display_name),
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
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
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
