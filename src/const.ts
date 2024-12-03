const SITE_NAME = "かしわもち";
const SITE_DESCRIPTION = "かしわもち";

const PROFILE = {
  name: "kq5y",
  other_names: ["kasi", "tksnn"],
  home: "https://t3x.jp",
  sns: {
    Twitter: "https://twitter.com/kq5yy",
    GitHub: "https://github.com/kq5y",
    Kaggle: "https://www.kaggle.com/tksnnn",
    SIGNATE: "https://signate.jp/users/114309",
    AtCoder: "https://atcoder.jp/users/tksnn",
  },
  skills: {
    "C++": ["OpenSiv3D"],
    Python: ["Flask", "FastAPI", "scikit-learn", "PyTorch"],
    TypeScript: [
      "React",
      "Next.js",
      "Remix",
      "Astro",
      "Electron",
      "AkashicEngine",
    ],
    "C#": ["WPF", "Unity"],
  },
};

const WORKS: WorkItem[] = [
  {
    title: "blog",
    description: "ポートフォリオかつブログサイト",
    links: [
      {
        name: "Link",
        url: "https://t3x.jp",
      },
      {
        name: "Github",
        url: "https://github.com/kq5y/blog",
      },
    ],
    tags: ["TypeScript", "Astro", "Cloudflare"],
  },
  {
    title: "tools",
    description: "色々なツールをまとめたもの",
    links: [
      {
        name: "Link",
        url: "https://tools.t3x.jp",
      },
      {
        name: "Github",
        url: "https://github.com/kq5y/tools",
      },
    ],
    tags: ["TypeScript", "Remix", "Cloudflare"],
  },
  {
    title: "nicoarch",
    description:
      "ニコニコ動画の動画やメタデータ、コメントをアーカイブするツール",
    links: [
      {
        name: "Github",
        url: "https://github.com/kq5y/nicoarch",
      },
      {
        name: "GitHub(Frontend)",
        url: "https://github.com/kq5y/nicoarch-app",
      },
      {
        name: "GitHub(Worker)",
        url: "https://github.com/kq5y/nicoarch-worker",
      },
    ],
    tags: [
      "TypeScript",
      "Remix",
      "Redis",
      "MongoDB",
      "Python",
      "Docker",
      "NGINX",
    ],
  },
  {
    title: "next-note",
    description: "ノートを取るためのWebアプリケーション",
    links: [
      {
        name: "Link",
        url: "https://note.t3x.jp",
      },
      {
        name: "GitHub",
        url: "https://github.com/kq5y/next-note",
      },
    ],
    tags: ["TypeScript", "Next.js", "PostrageSQL", "Vercel"],
  },
  {
    title: "Titanic Checker",
    description:
      "TitanicDatasetを用いた機械学習モデルの精度を確認するためのWebアプリケーション",
    links: [
      {
        name: "Link",
        url: "https://titanic-checker.pages.dev",
      },
      {
        name: "GitHub(Frontend)",
        url: "https://github.com/kq5y/titanic-checker-front",
      },
      {
        name: "GitHub(Backend)",
        url: "https://github.com/kq5y/titanic-checker-api",
      },
    ],
    tags: ["TypeScript", "React.js", "Python", "FastAPI", "Cloudflare"],
  },
  {
    title: "NyanJump",
    description: "高校の文化祭で展示した2Dアクションゲーム",
    tags: ["C++", "OpenSiv3D"],
  },
  {
    title: "GameLauncher2021",
    description: "高校の文化祭で使用したゲームランチャー",
    tags: ["C++", "OpenSiv3D", "MySQL", "PHP"],
  },
  {
    title: "W-Judge",
    description: "高校の部内で利用した競プロコンテストサイト(新機能, 保守)",
    tags: ["Python", "Flask", "MySQL", "NGINX", "Docker", "Redis"],
  },
  {
    title: "Scraping Application",
    description: "業務委託で開発したWindows用のスクレイピングソフト",
    tags: ["Python", "Tk", "C#", "WPF", "Selenium"],
  },
];

const HISTORY: HistoryItem[] = [];

export { SITE_NAME, SITE_DESCRIPTION, PROFILE, WORKS, HISTORY };
