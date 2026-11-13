import { copy as en } from './en';
import { copy as zh, categories, company } from './zh-hant';
import { productCategories, site, companyFacts, capabilities, materialProcesses, services } from '../data/site';
import { isTraditionalChinese, localizedPath } from './routes';

export function localize(pathname: string) {
  const chinese = isTraditionalChinese(pathname);
  return {
    chinese,
    lang: chinese ? 'zh-Hant' : 'en',
    copy: chinese ? zh : en,
    t: (english: string, traditionalChinese: string) => chinese ? traditionalChinese : english,
    path: (path: string) => localizedPath(path, pathname),
    categories: chinese ? productCategories.map(category => ({ ...category, ...categories[category.id] })) : productCategories,
    company: chinese ? { ...company, legalName: site.legalNameZh } : {
      legalName: site.legalName,
      profile: site.profile,
      address: site.address,
      facts: companyFacts,
      materials: materialProcesses,
      capabilities,
      services,
    },
  };
}
