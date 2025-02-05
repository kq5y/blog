interface PostBase {
  title: string;
  tags: string[];
  date: string;
  hidden?: boolean;
}

interface BlogPost extends PostBase {
  type: "Blog";
  slug: string;
  body?: string;
  path: string;
}

interface ZennPost extends PostBase {
  type: "Zenn";
  slug: string;
  url: string;
}

type Post = BlogPost | ZennPost;
