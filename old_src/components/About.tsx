import { PROFILE } from "old_src/const";

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
          <p class={styled.subName}>{PROFILE.other_names.join(", ")}</p>
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
          <p class={styled.profileDesc}>{`${PROFILE.desc}`}</p>
        </div>
      </div>
      <div class={styled.stacks}>
        <h3>Stacks</h3>
        <table>
          <tbody>
            {Object.entries(PROFILE.stacks.Languages).map(
              ([lang, { desc, libs }]) => (
                <>
                  <tr>
                    <td class={styled.lang}>{lang}</td>
                    <td
                      class={libs.length === 0 ? styled.langDesc : styled.items}
                    >
                      {libs.length === 0
                        ? desc
                        : libs.map((lib) => <span>{lib}</span>)}
                    </td>
                  </tr>
                  {libs.length !== 0 && (
                    <tr>
                      <td />
                      <td class={styled.langDesc}>{desc}</td>
                    </tr>
                  )}
                </>
              )
            )}
            <tr class={styled.blankRow} />
            {Object.entries(PROFILE.stacks)
              .filter(([key]) => key !== "Languages")
              .map(([key, items]) => (
                <tr>
                  <td>{key}</td>
                  <td class={styled.items}>
                    {(items as string[]).map((item) => (
                      <span>{item}</span>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
