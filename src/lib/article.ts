import {
  type AnyEntryMap,
  type CollectionEntry,
  type ContentEntryMap,
  getCollection,
} from "astro:content";

type Collection = CollectionEntry<keyof AnyEntryMap>;

const collectionCache: { [key: string]: Collection[] } = {};

async function getCollectionCache(
  collection: keyof ContentEntryMap
): Promise<Collection[]> {
  if (!collectionCache[collection]) {
    collectionCache[collection] = await getCollection(collection);
  }
  return collectionCache[collection];
}

export interface Article {
  title: string;
  tags: string[];
  date: string;
  hidden?: boolean;
  slug: string;
  body: string;
  path: string;
}

export function convertParams(articles: Article[]) {
  return articles.map((article) => {
    return {
      params: {
        slug: article.slug,
      },
    };
  });
}

export async function getAllArticles(showHidden = false): Promise<Article[]> {
  const articles = await getCollectionCache("post");
  return articles
    .filter((article) => showHidden || !(article.data.hidden === true))
    .map((article) => ({
      ...article.data,
      slug: article.slug,
      body: article.body,
      path: `/posts/${article.slug}/`,
    }))
    .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime());
}
