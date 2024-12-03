import { WORKS } from "@/const";

import styled from "./WorkList.module.scss";

export const WorkList = () => {
  return (
    <div class={styled.mainContainer}>
      <h1>Works</h1>
      <div class={styled.works}>
        {WORKS.map((work) => (
          <div class={styled.work}>
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
