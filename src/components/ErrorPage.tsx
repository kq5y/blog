import styled from "./ErrorPage.module.scss";

interface Props {
  code: string | number;
  message: string;
}

export const ErrorPage = ({ code, message }: Props) => {
  return (
    <div class={styled.container}>
      <h1>
        <b>{code}</b> - {message}
      </h1>
    </div>
  );
};
