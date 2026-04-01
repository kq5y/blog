import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/about" }),
  schema: z.object({
    backLinkTitle: z.string().min(1),
    sections: z.object({
      interests: z.string().min(1),
      likes: z.string().min(1),
      education: z.string().min(1),
      career: z.string().min(1),
      certs: z.string().min(1),
      ctfs: z.string().min(1),
      works: z.string().min(1),
      extraLinks: z.string().min(1),
    }),
    music: z.object({
      prefix: z.string(),
      label: z.string().min(1),
      suffix: z.string(),
    }),
    worksLink: z.object({
      label: z.string().min(1),
      ariaLabel: z.string().min(1),
    }),
  }),
});

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
  about: aboutCollection,
  post: postCollection,
};
