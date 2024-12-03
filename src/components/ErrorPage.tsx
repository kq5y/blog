import type { FunctionalComponent } from "preact";

import styled from "./ErrorPage.module.scss";

interface Props {
  code: string | number;
  message: string;
}

export const ErrorPage: FunctionalComponent<Props> = ({ code, message }) => {
  return (
    <div className={styled.container}>
      <h1>
        <b>{code}</b> - {message}
      </h1>
    </div>
  );
};
