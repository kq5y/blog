import { Image } from "@/components/Image";
import iconImage from "@/images/icon.png";
import type { FunctionalComponent } from "preact";

import styled from "./Profile.module.scss";

export const Profile: FunctionalComponent = async () => {
  return (
    <div className={styled.container}>
      <div className={styled.icon}>
        <Image src={iconImage} alt="icon" width={80} height={80} />
      </div>
      <div className={styled.content}>
        <div className={styled.name}>kq5y</div>
        <div className={styled.buttons}>
          <span>
            <a
              href="https://t3x.jp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="homepage"
            >
              Home
            </a>
          </span>
          <span>
            <a
              href="https://github.com/kq5y"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github"
            >
              GitHub
            </a>
          </span>
          <span>
            <a
              href="https://x.com/_kq5y"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="twitter"
            >
              Twitter
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
