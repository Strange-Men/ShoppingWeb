import { visibleCases } from '../data/cases';
import { productCategories } from '../data/site';
import { activeLanguages, equivalentCasePath } from '../i18n/routes';
export function publishedPaths() {
  const pages = ['', 'about/', 'products/', ...productCategories.map(item => `products/${item.id}/`), 'contact/', 'privacy/'];
  const cases = visibleCases(false);
  return activeLanguages.flatMap(({ locale, prefix }) => [
    ...pages.map(page => prefix + page),
    ...cases.flatMap(item => {
      const route = equivalentCasePath(item, locale);
      return route ? [route] : [];
    }),
  ]);
}
