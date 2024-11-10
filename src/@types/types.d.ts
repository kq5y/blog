declare module "remark-link-card" {
  type Options = {
    cache?: boolean;
    shortenUrl?: boolean;
  };
  function rlc(options?: Readonly<Options> | null | undefined): undefined;
  export default rlc;
}
