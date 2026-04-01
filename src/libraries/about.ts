import { getCollection, type CollectionEntry } from "astro:content";

import type { HistoryItem } from "@/data/personal";

export type AboutCopy = CollectionEntry<"about">["data"];
export type AboutLocale = "ja" | "en";

const parseYearMonth = (value: string) => {
  const [year, month] = value.split("-").map(Number);
  return year * 100 + month;
};

export const sortByDateDesc = <T extends { date: string }>(items: T[]) =>
  [...items].sort((a, b) => parseYearMonth(b.date) - parseYearMonth(a.date));

export const formatHistoryDate = (item: HistoryItem) => {
  if (item.current) {
    return `${item.start} ~ present`;
  }

  if (item.end) {
    return `${item.start} ~ ${item.end}`;
  }

  return item.start;
};

export const sortHistory = (items: HistoryItem[]) =>
  [...items].sort((a, b) => {
    const endA = a.current
      ? Number.POSITIVE_INFINITY
      : parseYearMonth(a.end ?? a.start);
    const endB = b.current
      ? Number.POSITIVE_INFINITY
      : parseYearMonth(b.end ?? b.start);

    return endB - endA || parseYearMonth(b.start) - parseYearMonth(a.start);
  });

export async function getAboutCopy(locale: AboutLocale) {
  const entries = await getCollection("about", ({ id }) => id === locale);
  const entry = entries[0];

  if (!entry) {
    throw new Error(`Missing about copy for locale: ${locale}`);
  }

  return entry.data;
}
