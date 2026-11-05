import type { SculptureCase } from './types';
import { isPreview, materials } from './site.ts';

// Capacity examples only. These records do not describe completed commissions.
export const cases: SculptureCase[] = materials.flatMap((material) =>
  Array.from({ length: 4 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    return {
      id: `${material.id}-${number}`,
      material: material.id,
      status: 'preview' as const,
      featured: index < 2,
      locales: {
        en: {
          slug: `preview-${number}`,
          title: `${material.short} — preview ${number}`,
          summary: 'An unpublished layout slot. Project name, photographs and verified details will be added here.',
          body: 'This page demonstrates the case detail layout. It does not represent a completed project or a product available for purchase.',
          seoDescription: `Unpublished ${material.short.toLowerCase()} case layout ${number}. Owner-supplied photographs and verified project details are pending.`,
          reviewStatus: 'preview' as const,
        },
      },
      images: ['Main view', 'Detail view', 'Context view'].map((view) => ({
        source: null, width: 1600, height: 1200,
        alt: `${view} — owner-supplied photograph pending`, rights: 'pending' as const, credit: '',
      })),
      sizeNote: 'Custom dimensions to be discussed.',
      finish: '',
      application: '',
      customizationNotes: 'Share your reference, preferred dimensions, quantity and project location. Material, finish and service scope will be agreed for the individual project.',
    };
  }),
);
export function visibleCases(preview = isPreview) {
  return cases.filter((item) => (item.status === 'published' && item.locales.en.reviewStatus === 'approved') || (preview && item.status === 'preview'));
}
export const casePath = (item: SculptureCase) => `/en/products/${item.material}/${item.locales.en.slug}/`;
