import type { Locale, SculptureCase } from '../data/types';
export const languages = [
  { locale: 'en', label: 'English', prefix: '/en/', dir: 'ltr', enabled: true },
  { locale: 'zh-Hant', label: '繁體中文', prefix: '/zh-hant/', dir: 'ltr', enabled: true },
  { locale: 'ar', label: 'العربية', prefix: '/ar/', dir: 'rtl', enabled: false },
] as const;
export const activeLanguages = languages.filter(language => language.enabled);
export const localizedRoutes = () => activeLanguages.map(language => ({ params: { locale: language.prefix.slice(1, -1) } }));
export const isTraditionalChinese = (pathname: string) => pathname.startsWith('/zh-hant/');
export function localizedPath(path: string, pathname: string) {
  return isTraditionalChinese(pathname) ? path.replace(/^\/en\//, '/zh-hant/') : path;
}
export function equivalentCasePath(item: SculptureCase, locale: Locale): string | null {
  const language = languages.find((entry) => entry.locale === locale);
  const content = item.locales[locale];
  if (language?.enabled && item.status === 'preview') return `${language.prefix}products/${item.material}/${item.locales.en.slug}/`;
  if (!language?.enabled || !content || content.reviewStatus !== 'approved') return null;
  return `${language.prefix}products/${item.material}/${content.slug}/`;
}
