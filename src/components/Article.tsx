import type { MarkdownHeading } from "astro";

import styled from "./Article.module.scss";
import "katex/dist/katex.min.css";

interface Props {
  category: string;
  slug: string;
  title: string;
  tags: string[];
  date: string;
  body: string;
  headings: MarkdownHeading[];
  profile?: Element;
  content?: Element;
}

export const Article = ({
  category,
  slug,
  title,
  tags,
  date,
  headings,
  profile,
  content,
}: Props) => {
  return (
    <article>
      <div class={styled.articleMeta}>
        <div class={styled.articleSlug}>{slug}</div>
        <h1 class={styled.articleTitle}>{title}</h1>
        <div class={styled.articleDate}>{date}</div>
        <div class={styled.articleTags}>
          {tags.map((tag) => (
            <span>{tag}</span>
          ))}
        </div>
      </div>
      <div class={styled.articleMain}>
        <nav>
          <ul>
            <li>
              <h2>Table of Contents</h2>
            </li>
            {headings.map((head) => {
              if (
                (head.depth === 2 || head.depth === 3) &&
                head.slug !== "footnote-label"
              ) {
                return (
                  <li class={styled[`heading${head.depth}`]}>
                    <a href={`#${head.slug}`}>{head.text}</a>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
        <div class={styled.articleContent}>{content}</div>
      </div>
      <div class={styled.profileContainer}>{profile}</div>
    </article>
  );
};
