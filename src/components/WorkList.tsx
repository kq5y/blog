import { WORKS } from "@/const";

import styled from "./WorkList.module.scss";

export const WorkList = () => {
  const sortedWorks = [...WORKS].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
  return (
    <div class={styled.mainContainer}>
      <h1>Works</h1>
      <div class={styled.works}>
        {sortedWorks.map((work) => (
          <div class={styled.work} data-pinned={work.pinned}>
            <h2>{work.title}</h2>
            {work.tags && (
              <div class={styled.tags}>
                {work.tags.map((tag) => (
                  <span>{tag}</span>
                ))}
              </div>
            )}
            {work.description && (
              <p class={styled.description}>{work.description}</p>
            )}
            {work.links && (
              <div class={styled.links}>
                {work.links.map((link) => (
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
