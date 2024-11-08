import { getCollection } from "astro:content";

export interface Blog {
  title: string;
  tags: string[];
  date: string;
  hidden?: boolean;
  slug: string;
  body: string;
}

export async function getAllBlogs(
  showHidden: boolean = false
): Promise<Blog[]> {
  const blogs = await getCollection("blog");
  return blogs
    .filter((blog) => showHidden || !(blog.data.hidden === true))
    .map((blog) => ({ ...blog.data, slug: blog.slug, body: blog.body }))
    .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime());
}
