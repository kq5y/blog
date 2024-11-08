import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string().max(100).min(1),
    tags: z.array(z.string()).max(5).min(1),
    date: z.string().regex(/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/),
    hidden: z.boolean().optional(),
  }),
});

const memoCollection = defineCollection({
  schema: z.object({
    title: z.string().max(100).min(1),
    tags: z.array(z.string()).max(5).min(1),
    date: z.string().regex(/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/),
    hidden: z.boolean().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  memo: memoCollection,
};
