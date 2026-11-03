import { visibleCases, casePath } from '../data/cases';
import { materials } from '../data/site';
export function publishedPaths() { return ['/en/', '/en/about/', '/en/products/', ...materials.map(item => `/en/products/${item.id}/`), ...visibleCases(false).map(casePath), '/en/contact/', '/en/privacy/']; }
