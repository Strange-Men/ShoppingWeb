// Reserved content model only; no blog route or navigation until real articles exist.
import type { Locale } from './types';
export interface Article {
  id: string;
  status: 'draft' | 'published';
  locales: Partial<Record<Locale, { slug: string; title: string; summary: string; body: string; reviewed: boolean }>>;
  publishedDate: string | null;
}
export const articles: Article[] = [];
