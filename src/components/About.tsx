import { PROFILE } from "@/const";

import styled from "./About.module.scss";

interface Props {
  icon?: Element;
}

export const About = ({ icon }: Props) => {
  return (
    <div class={styled.aboutContainer}>
      <div class={styled.profile}>
        <div class={styled.icon}>{icon}</div>
        <div class={styled.meta}>
          <p class={styled.name}>{PROFILE.name}</p>
          <p>{PROFILE.other_names.join(", ")}</p>
          <div class={styled.snsList}>
            {Object.entries(PROFILE.sns).map(([key, value]) => (
              <span>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                >
                  {key}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div class={styled.skills}>
        {Object.entries(PROFILE.skills).map(([lang, skills]) => (
          <div class={styled.skillItems}>
            <div class={styled.lang}>
              <span>{lang}</span>
            </div>
            <div class={styled.skill}>
              {skills.map((skill) => (
                <span>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
