import { createEffect, createSignal } from "solid-js";

import styles from "./TableOfContents.module.scss";

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
}

export const TableOfContents = ({ headings }: Props) => {
  const [activeId, setActiveId] = createSignal<string>("");
  const onItemClick = (heading: Heading) => {
    return (e: MouseEvent) => {
      e.preventDefault();
      document.getElementById(heading.slug)?.scrollIntoView({
        behavior: "smooth",
      });
      if (window.innerWidth < 1024) {
        const details = document.querySelector("details");
        if (details?.open) {
          details.open = false;
        }
      }
    };
  };
  createEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px" }
    );
    for (const heading of headings) {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    }
    return () => {
      for (const heading of headings) {
        const element = document.getElementById(heading.slug);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  });
  return (
    <div class={styles.toc}>
      <h2 class={styles.title}>Table of Contents</h2>
      <nav>
        <ul class={styles.list}>
          {headings
            .filter((heading) => heading.depth <= 3)
            .map((heading) => (
              <li
                class={styles.tocItem}
                classList={{
                  [styles.active]: activeId() === heading.slug,
                  [styles.depth3]: heading.depth === 3,
                }}
              >
                <a
                  href={`#${heading.slug}`}
                  class={styles.tocLink}
                  onClick={onItemClick(heading)}
                >
                  {heading.text}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};
