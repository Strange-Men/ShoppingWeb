import type { SculptureCase } from '../data/types';

export function localizedCase(item: SculptureCase, chinese: boolean) {
  if (!chinese) return { ...item, content: item.locales.en };
  const material = item.material === 'fiberglass' ? '玻璃纖維' : '不鏽鋼';
  const number = item.id.slice(-2);
  const content = item.locales['zh-Hant'] ?? {
    slug: item.locales.en.slug,
    title: `${material}案例版型 ${number}`,
    summary: '此為尚未發布的案例版型。專案名稱、照片與已確認的資料將在日後補充。',
    body: '本頁展示案例詳情的編排方式，尚未收錄已完成的專案或販售品項。',
    seoDescription: `尚未發布的${material}案例版型 ${number}。照片與專案資料待確認。`,
    reviewStatus: 'preview' as const,
  };
  return {
    ...item,
    content,
    images: item.images.map((image, index) => image.source ? image : {
      ...image, alt: `${['主視圖', '細節圖', '場景圖'][index] ?? '照片'}待補充`,
    }),
    sizeNote: item.status === 'preview' ? '客製尺寸待洽談。' : item.sizeNote,
    customizationNotes: item.status === 'preview'
      ? '請提供參考圖、預計尺寸、數量與專案地點。材質、表面處理與服務範圍依各專案確認。'
      : item.customizationNotes,
  };
}
