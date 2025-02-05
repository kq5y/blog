interface ZennArticle {
  id: number;
  post_type: "Article" | "Scrap";
  title: string;
  slug: string;
  comments_count: number;
  liked_count: number;
  bookmarked_count: number;
  body_letters_count: number;
  article_type: "tech" | "idea";
  emoji: string;
  is_suspending_private: boolean;
  published_at: string;
  body_updated_at: string;
  source_repo_updated_at: string;
  pinned: boolean;
  path: string;
  user: {
    id: number;
    username: string;
    name: string;
    avatar_small_url: string;
  };
  publication: {
    id: number;
    name: string;
    avatar_small_url: string;
    display_name: string;
    beta_stats: boolean;
    avatar_registered: boolean;
  } | null;
}

export async function getZennArticles(
  username: string
): Promise<ZennArticle[]> {
  let page: number | null = 1;
  const articles = [];
  while (page !== null) {
    const response = await fetch(
      `https://zenn.dev/api/articles?username=${username}&page=${page}`
    );
    const data = (await response.json()) as {
      articles: ZennArticle[];
      next_page: number | null;
    };
    articles.push(...data.articles);
    page = data.next_page;
  }
  return articles;
}

interface ZennArticleDetail extends ZennArticle {
  body_html: string;
  og_image_url: string;
  toc: TOCItem[];
  toc_enabled: boolean;
  should_noindex: boolean;
  scheduled_publish_at: string | null;
  can_send_badge: boolean;
  status: string;
  badges: {
    badge_type: string;
    rank: number;
  }[];
  is_mine: boolean;
  is_preview: boolean;
  draft_reveal_scope: string;
  current_user_liked: boolean;
  current_user_bookmarked: boolean;
  github_repository: null;
  topics: {
    id: number;
    name: string;
    taggings_count: number;
    image_url: string;
    display_name: string;
  }[];
  comments: [];
  positive_comments_count: number;
  commented_users: [];
}

interface TOCItem {
  id: string;
  level: number;
  text: string;
  children: TOCItem[];
}

export async function getZennArticleDetail(
  slug: string
): Promise<ZennArticleDetail> {
  const response = await fetch(`https://zenn.dev/api/articles/${slug}`);
  const data = (await response.json()) as { article: ZennArticleDetail };
  return data.article;
}
