import { getCollection, type ContentEntryMap } from "astro:content";

let collectionCache: { [key: string]: any[] } = {};

async function getCollectionCache(
  collection: keyof ContentEntryMap
): Promise<any[]> {
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
  category: keyof ContentEntryMap;
  path: string;
}

export function convertParams(articles: Article[]) {
  return articles.map((article) => {
    return {
      params: {
        category: article.category,
        slug: article.slug,
      },
    };
  });
}

export async function getAllArticles(
  cat: keyof ContentEntryMap,
  showHidden: boolean = false
): Promise<Article[]> {
  const articles = await getCollectionCache(cat);
  return articles
    .filter((article) => showHidden || !(article.data.hidden === true))
    .map((article) => ({
      ...article.data,
      slug: article.slug,
      body: article.body,
      category: cat,
      path: `/${cat}/${article.slug}/`,
    }))
    .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime());
}

export function categoryToStr(category: string) {
  switch (category) {
    case "blog":
      return "Blog";
    case "memo":
      return "Memo";
  }
  return "";
}
