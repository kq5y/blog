import { HISTORY } from "old_src/const";

import styled from "./HistoryView.module.scss";

export const HistoryView = () => {
  return (
    <div class={styled.mainContainer}>
      <h1>History</h1>
      <div class={styled.history}>
        {HISTORY.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }).map((item) => (
          <div class={styled.historyItem}>
            <div class={styled.date}>
              <span>{item.date}</span>
            </div>
            <div class={styled.border}>
              <div>
                <div />
              </div>
            </div>
            <div class={styled.meta}>
              <p class={styled.category}>{item.category}</p>
              <h2
                class={styled.title + (item.future ? ` ${styled.future}` : "")}
              >
                {item.title}
              </h2>
              {item.description && (
                <p class={styled.description}>{item.description}</p>
              )}
              {item.links && (
                <div class={styled.links}>
                  {item.links.map((link) => (
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
