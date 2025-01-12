const SITE_NAME = "kq5iwam0chi";
const SITE_DESCRIPTION = "kq5y's portfolio and blog page";

const PROFILE = {
  name: "kq5y",
  other_names: ["kasi", "tksnn"],
  home: "https://t3x.jp",
  sns: {
    "X(Twitter)": "https://x.com/kq5yy",
    GitHub: "https://github.com/kq5y",
    Kaggle: "https://www.kaggle.com/kq5yyy",
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
    title: "BlackJack",
    description:
      "講義課題としてC言語で作成したコンソールで遊べるブラックジャック",
    links: [
      {
        name: "Github",
        url: "https://github.com/kq5y-lectures/prg-lang-2/tree/main/final/BlackJack",
      },
    ],
    tags: ["C", "Escape Sequence"],
  },
  {
    title: "Caluculator",
    description: "講義課題として作成したVerilog-HDL製の計算機",
    links: [
      {
        name: "Github",
        url: "https://github.com/kq5y-lectures/logic-circuit-design/tree/main/practice/06_Caluculator",
      },
    ],
    tags: ["Verilog-HDL"],
  },
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
    tags: ["TypeScript", "Astro", "SolidJS", "Cloudflare"],
  },
  {
    title: "tools",
    description:
      "調べたツールの独自実装や欲しいツールなど色々なツールをまとめたもの",
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

const HISTORY: HistoryItem[] = [
  {
    date: "2023-04",
    category: "Education",
    title: "信州大学工学部電子情報システム工学科 入学",
    description: "情報プログラム所属(2024-09～)",
  },
  {
    date: "2021-06",
    category: "Certificate",
    title: "実用英語技能検定 準2級 合格",
  },
  {
    date: "2021-02",
    category: "Certificate",
    title: "基本情報技術者試験 合格",
    description: "第FE-2021-02-01828号",
  },
  {
    date: "2023-12",
    category: "Certificate",
    title: "応用情報技術者試験 合格",
    description: "第AP-2023-10-06136号",
  },
  {
    date: "2021-09",
    category: "Competition",
    title: "パソコン甲子園2021",
    description: "プログラミング部門予選成績優秀証 獲得",
  },
  {
    date: "2023-08",
    category: "Competition",
    title: "SIGNATE Student Cup 2023",
    description: "テーブルコンペ 🥈42th",
    links: [
      {
        name: "SIGNATE",
        url: "https://signate.jp/competitions/1051",
      },
      {
        name: "GitHub",
        url: "https://github.com/tksnnx/signate_scup2023",
      },
    ],
  },
  {
    date: "2023-09",
    category: "Competition",
    title:
      "テクノプロ・デザイン社 食品パッケージ画像解析チャレンジ（一般部門・学生部門）",
    description: "画像コンペ 学生部門 🥈11st",
    links: [
      {
        name: "SIGNATE",
        url: "https://signate.jp/competitions/1106",
      },
      {
        name: "GitHub",
        url: "https://github.com/tksnnx/technopro-food-package",
      },
    ],
  },
  {
    date: "2023-12",
    category: "Certificate",
    title: "普通自動車第一種運転免許（AT限定） 取得",
  },
  {
    date: "2024-04",
    category: "Certificate",
    title: "TOEIC Listening & Reading 645点",
    description: "Listening:330 Reading:315",
  },
  {
    date: "2024-12",
    category: "Certificate",
    title: "情報処理安全確保支援士試験 合格",
    description: "第SC-2024-10-01891号",
  },
  {
    date: "2025-03",
    category: "Education",
    title: "信州大学工学部電子情報システム工学科 退学予定",
    future: true,
  },
  {
    date: "2025-04",
    category: "Education",
    title: "筑波大学情報学群情報科学類 編入学予定",
    future: true,
  },
];

export { SITE_NAME, SITE_DESCRIPTION, PROFILE, WORKS, HISTORY };
