export type Locale = 'en' | 'zh-Hant' | 'ar';
export type MaterialId = 'fiberglass' | 'stainless-steel';
export interface MediaSlot {
  source: string | null;
  width: number;
  height: number;
  alt: string;
  rights: 'pending' | 'owned' | 'licensed';
  credit: string;
}
export interface CaseLocale {
  slug: string;
  title: string;
  summary: string;
  body: string;
  seoDescription: string;
  reviewStatus: 'preview' | 'approved' | 'draft';
}
export interface SculptureCase {
  id: string;
  material: MaterialId;
  status: 'preview' | 'draft' | 'published';
  featured: boolean;
  locales: Partial<Record<Locale, CaseLocale>> & { en: CaseLocale };
  images: MediaSlot[];
  sizeNote: string;
  finish: string;
  application: string;
  customizationNotes: string;
}
