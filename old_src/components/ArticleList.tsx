import styled from "./ArticleList.module.scss";

interface Props {
  title: string;
  posts: Post[];
}

export const ArticleList = ({ title, posts }: Props) => {
  return (
    <div class={styled.mainContainer}>
      <div class={styled.header}>
        <h1>{title}</h1>
        <a
          href={`${import.meta.env.SITE}/rss.xml`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="RSS"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93z"
            />
          </svg>
        </a>
      </div>
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
