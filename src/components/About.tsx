import { PROFILE } from "@/const";

import styled from "./About.module.scss";

interface Props {
  icon?: Element;
}

export const About = ({ icon }: Props) => {
  return (
    <div className={styled.aboutContainer}>
      <h1>About</h1>
      <div className={styled.profile}>
        <div className={styled.icon}>{icon}</div>
        <div className={styled.meta}>
          <p className={styled.name}>{PROFILE.name}</p>
          <p>{PROFILE.other_names.join(", ")}</p>
          <div className={styled.snsList}>
            {Object.entries(PROFILE.sns).map(([key, value]) => (
              <span key={key}>
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
      <div className={styled.skills}>
        {Object.entries(PROFILE.skills).map(([lang, skills]) => (
          <div key={lang} className={styled.skillItems}>
            <div className={styled.lang}>
              <span>{lang}</span>
            </div>
            <div className={styled.skill}>
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
