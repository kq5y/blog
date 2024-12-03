import { PROFILE } from "@/const";
import styled from "./Profile.module.scss";

interface Props {
  icon?: Element;
}

export const Profile = ({ icon }: Props) => {
  return (
    <div className={styled.container}>
      <div className={styled.icon}>{icon}</div>
      <div className={styled.content}>
        <div className={styled.name}>{PROFILE.name}</div>
        <div className={styled.buttons}>
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
              href={PROFILE.sns.Twitter}
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
