import { PROFILE } from "old_src/const";

import styled from "./Profile.module.scss";

interface Props {
  icon?: Element;
}

export const Profile = ({ icon }: Props) => {
  return (
    <div class={styled.container}>
      <div class={styled.icon}>{icon}</div>
      <div class={styled.content}>
        <div class={styled.name}>{PROFILE.name}</div>
        <div class={styled.buttons}>
          <span>
            <a
              href={PROFILE.home}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="homepage"
            >
              Home
            </a>
          </span>
          <span>
            <a
              href={PROFILE.sns.GitHub}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github"
            >
              GitHub
            </a>
          </span>
          <span>
            <a
              href={PROFILE.sns["X(Twitter)"]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="x(twitter)"
            >
              X(Twitter)
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
