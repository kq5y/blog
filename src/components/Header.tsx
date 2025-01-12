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
        <input type="checkbox" id="menu-toggle" class={styled.menuToggle} />
        <label for="menu-toggle" class={styled.hamburger}>
          <span />
          <span />
          <span />
        </label>
        <nav class={styled.menu}>
          <a href="/works/">Works</a>
          <a href="/history/">History</a>
          <a href="/posts/">Posts</a>
        </nav>
      </div>
    </header>
  );
};
