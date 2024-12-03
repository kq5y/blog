import { SITE_NAME } from "@/const";

import styled from "./Header.module.scss";

export const Header = () => {
  return (
    <header>
      <div class={styled.container}>
        <div class={styled.title}>
          <div>
            <a href="/">{SITE_NAME}</a>
          </div>
        </div>
        <div class={styled.menu}>
          <div>
            <a href="/">About</a>
          </div>
          <div>
            <a href="/posts/">Posts</a>
          </div>
        </div>
      </div>
    </header>
  );
};
