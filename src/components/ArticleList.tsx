import type { Article } from "@/lib/article";

import styled from "./ArticleList.module.scss";

interface Props {
  title: string;
  articles: Article[];
}

export const ArticleList = ({ title, articles }: Props) => {
  return (
    <div class={styled.mainContainer}>
      <h1>{title}</h1>
      <div class={styled.articles}>
        {articles.length === 0 && <p>記事がありません</p>}
        {articles.map((article) => (
          <article>
            <div class={styled.meta}>
              <time class={styled.date} datetime={article.date}>
                {article.date}
              </time>
              <a href={article.path}>{article.title}</a>
              <div class={styled.tags}>
                {article.tags.map((tag) => (
                  <span>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
