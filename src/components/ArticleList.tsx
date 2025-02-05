import styled from "./ArticleList.module.scss";

interface Props {
  title: string;
  posts: Post[];
}

export const ArticleList = ({ title, posts }: Props) => {
  return (
    <div class={styled.mainContainer}>
      <h1>{title}</h1>
      <div class={styled.articles}>
        {posts.length === 0 && <p>記事がありません</p>}
        {posts.map((post) => (
          <article>
            <div class={styled.meta}>
              <div class={styled.metaHeader}>
                <time datetime={post.date}>{post.date}</time>
                <span>|</span>
                <span>{post.type}</span>
              </div>
              {post.type === "Blog" ? (
                <a href={post.path}>{post.title}</a>
              ) : (
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              )}
              <div class={styled.tags}>
                {post.tags.map((tag) => (
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
