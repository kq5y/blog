import {
  type AnyEntryMap,
  type CollectionEntry,
  type CollectionKey,
  getCollection,
} from "astro:content";
import { getZennArticleDetail, getZennArticles } from "./zenn";

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

export async function getBlogPosts(showHidden = false): Promise<BlogPost[]> {
  const articles = await getCollectionCache("post");
  return articles
    .filter((article) => showHidden || !(article.data.hidden === true))
    .map((article) => ({
      ...article.data,
      type: "Blog",
      slug: article.id,
      body: article.body,
      path: `/posts/${article.id}/`,
    }));
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
