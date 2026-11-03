import type { Locale, SculptureCase } from '../data/types';
export const languages = [
  { locale: 'en', label: 'English', prefix: '/en/', dir: 'ltr', enabled: true },
  { locale: 'zh-Hant', label: '繁體中文', prefix: '/zh-hant/', dir: 'ltr', enabled: false },
  { locale: 'ar', label: 'العربية', prefix: '/ar/', dir: 'rtl', enabled: false },
] as const;
export function equivalentCasePath(item: SculptureCase, locale: Locale): string | null {
  const language = languages.find((entry) => entry.locale === locale);
  const content = item.locales[locale];
  if (!language?.enabled || !content || content.reviewStatus !== 'approved') return null;
  return `${language.prefix}products/${item.material}/${content.slug}/`;
}
