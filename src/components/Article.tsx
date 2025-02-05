import type { MarkdownHeading } from "astro";

import styled from "./Article.module.scss";

interface Props {
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
        <time class={styled.articleDate} datetime={date}>
          {date}
        </time>
        <div class={styled.articleTags}>
          {tags.map((tag) => (
            <span>{tag}</span>
          ))}
        </div>
      </div>
      <div class={styled.articleMain}>
        <input type="checkbox" id="toc-toggle" class={styled.tocToggle} />
        <nav>
          <div>
            <h2>
              <label for="toc-toggle">Table of Contents</label>
            </h2>
            <ul>
              {headings
                .filter(
                  (head) =>
                    (head.depth === 2 || head.depth === 3) &&
                    head.slug !== "footnote-label"
                )
                .map((head) => (
                  <li class={styled[`heading${head.depth}`]}>
                    <a href={`#${head.slug}`}>{head.text}</a>
                  </li>
                ))}
            </ul>
          </div>
        </nav>
        <div class={styled.articleContent}>{content}</div>
      </div>
      {profile && (
        <div class={styled.profileContainer} role="complementary">
          {profile}
        </div>
      )}
    </article>
  );
};
