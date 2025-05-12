import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./posts" }),
  schema: z.object({
    title: z.string().max(100).min(1),
    tags: z.array(z.string()).max(5).min(1),
    createdDate: z
      .string()
      .regex(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})$/)
      .optional(),
    updatedDate: z
      .string()
      .regex(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})$/)
      .optional(),
    hidden: z.boolean().optional(),
  }),
});

export const collections = {
  post: postCollection,
};
