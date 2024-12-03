declare module "remark-link-card" {
  type Options = {
    cache?: boolean;
    shortenUrl?: boolean;
  };
  function rlc(options?: Readonly<Options> | null | undefined): undefined;
  export default rlc;
}

type HistoryItem = {
  date: string;
  category: string;
  title: string;
  description?: string;
  links?: {
    name: string;
    url: string;
  }[];
  future?: boolean;
};

type WorkItem = {
  title: string;
  description?: string;
  links?: {
    name: string;
    url: string;
  }[];
  tags?: string[];
};
