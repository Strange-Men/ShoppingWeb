import type { MediaSlot } from '../data/types';
import type { PresentationImage } from '../data/photography';
import translations from './photography.zh-hant.json';

const names: Record<string, string> = translations;

export function localizedTitle(item: PresentationImage, chinese: boolean) {
  return chinese ? names[item.id] : item.title;
}

export function localizedPhoto(image: MediaSlot, chinese: boolean): MediaSlot {
  const id = image.source?.match(/^\/media\/(.+)-\d+\.webp$/)?.[1];
  return chinese && id ? { ...image, alt: names[id] ?? image.alt } : image;
}
