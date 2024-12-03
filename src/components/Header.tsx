import { SITE_NAME } from "@/const";
import type { FunctionalComponent } from "preact";

import styled from "./Header.module.scss";

export const Header: FunctionalComponent = () => {
  return (
    <header>
      <div className={styled.container}>
        <div className={styled.title}>
          <div>
            <a href="/">{SITE_NAME}</a>
          </div>
        </div>
        <div className={styled.menu}>
          <div>
            <a href="/blog/">Blog</a>
          </div>
          <div>
            <a href="/memo/">Memo</a>
          </div>
        </div>
      </div>
    </header>
  );
};
