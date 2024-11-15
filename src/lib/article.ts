import { getCollection, type ContentEntryMap } from "astro:content";

export interface Article {
  title: string;
  tags: string[];
  date: string;
  hidden?: boolean;
  slug: string;
  body: string;
}

export async function getAllArticles(
  cat: keyof ContentEntryMap,
  showHidden: boolean = false
): Promise<Article[]> {
  const articles = await getCollection(cat);
  return articles
    .filter((article) => showHidden || !(article.data.hidden === true))
    .map((article) => ({
      ...article.data,
      slug: article.slug,
      body: article.body,
    }))
    .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime());
}

export function convertArticles(articles: Article[], category: string) {
  return articles.map((article) => {
    let slug = article.slug;
    if (!Number.isNaN(Number.parseInt(article.slug))) slug = "_" + slug;
    return {
      params: {
        category: category,
        slug: slug,
      },
      props: {
        title: article.title,
        tags: article.tags,
        date: article.date,
      },
    };
  });
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
