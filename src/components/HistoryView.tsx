import { HISTORY } from "@/const";
import styled from "./HistoryView.module.scss";

export const HistoryView = () => {
  return (
    <div className={styled.mainContainer}>
      <h1>History</h1>
      <div className={styled.history}>
        {HISTORY.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }).map((item) => (
          <div key={item.title} className={styled.historyItem}>
            <div className={styled.date}>
              <span>{item.date}</span>
            </div>
            <div className={styled.border}>
              <div>
                <div />
              </div>
            </div>
            <div className={styled.meta}>
              <p className={styled.category}>{item.category}</p>
              <h2
                className={
                  styled.title + (item.future ? ` ${styled.future}` : "")
                }
              >
                {item.title}
              </h2>
              {item.description && (
                <p className={styled.description}>{item.description}</p>
              )}
              {item.links && (
                <div className={styled.links}>
                  {item.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
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
