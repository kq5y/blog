import { WORKS } from "@/const";

import styled from "./WorkList.module.scss";

export const WorkList = () => {
  return (
    <div className={styled.mainContainer}>
      <h1>Works</h1>
      <div className={styled.works}>
        {WORKS.map((work) => (
          <div key={work.title} className={styled.work}>
            <h2>{work.title}</h2>
            {work.tags && (
              <div className={styled.tags}>
                {work.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
            {work.description && (
              <p className={styled.description}>{work.description}</p>
            )}
            {work.links && (
              <div className={styled.links}>
                {work.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
