import { visibleCases, casePath } from '../data/cases';
import { productCategories } from '../data/site';
export function publishedPaths() { return ['/en/', '/en/about/', '/en/products/', ...productCategories.map(item => `/en/products/${item.id}/`), ...visibleCases(false).map(casePath), '/en/contact/', '/en/privacy/']; }
