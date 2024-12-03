import { type Article, categoryToStr } from "@/lib/article";

import styled from "./ArticleList.module.scss";

export interface Props {
  title: string;
  articles: Article[];
}

export const ArticleList = ({ title, articles }: Props) => {
  return (
    <div className={styled.mainContainer}>
      <h1>{title}</h1>
      <div className={styled.articles}>
        {articles.length === 0 && <p>記事がありません</p>}
        {articles.map((article) => (
          <article key={article.path}>
            <a href={article.path}>{article.title}</a>
            <div>
              <div className={styled.date}>{article.date}</div>
              <div className={styled.tags}>
                <span>{categoryToStr(article.category)}</span>
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
