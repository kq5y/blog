import { z } from "astro/zod";

import personalEn from "@/content/personal/en.json";
import personalJa from "@/content/personal/ja.json";

export type HistoryType = "education" | "activity" | "internship" | "work";

export interface HistoryItem {
  start: string;
  end?: string;
  current?: boolean;
  type: HistoryType;
  title: string;
  description?: string;
  links?: {
    name: string;
    url: string;
  }[];
}

const linkSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
});

const historyItemSchema: z.ZodType<HistoryItem> = z.object({
  start: z.string().min(1),
  end: z.string().min(1).optional(),
  current: z.boolean().optional(),
  type: z.enum(["education", "activity", "internship", "work"]),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  links: z.array(linkSchema).optional(),
});

const personalSchema = z.object({
  name: z.string().min(1),
  pronunciation: z.string().min(1),
  bio: z.string().min(1),
  links: z.object({
    twitter: z.string().min(1),
    github: z.string().min(1),
    mail: z.string().min(1),
  }),
  interests: z.array(z.string().min(1)),
  likes: z.array(z.string().min(1)),
  statsfmUsername: z.string().min(1),
  spotifyEmbedUrl: z.string().min(1),
  music_likes: z.array(z.string().min(1)),
  history: z.array(historyItemSchema),
  certs: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1).optional(),
      date: z.string().min(1),
      links: z.array(linkSchema).optional(),
    })
  ),
  ctfs: z.array(
    z.object({
      name: z.string().min(1),
      rank: z.string().min(1),
      team: z.string().min(1),
      date: z.string().min(1),
      links: z.array(linkSchema).optional(),
    })
  ),
  works: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      links: z.array(linkSchema),
      pinned: z.boolean().optional(),
    })
  ),
  extraLinks: z.array(linkSchema),
});

export type PersonalData = z.infer<typeof personalSchema>;
export type PersonalLocale = "ja" | "en";

export const PERSONAL_DATA_JA = personalSchema.parse(personalJa);
export const PERSONAL_DATA_EN = personalSchema.parse(personalEn);
export const PERSONAL_DATA = PERSONAL_DATA_JA;

export function getPersonalData(locale: PersonalLocale) {
  return locale === "en" ? PERSONAL_DATA_EN : PERSONAL_DATA_JA;
}
