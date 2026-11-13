import type { copy as english } from './en';

export const copy: typeof english = {
  home: {
    title: '客製雕塑與瓶型道具製造',
    description: '探索楠軒的客製玻璃纖維雕塑、不鏽鋼雕塑與大型瓶型道具。',
    hero: {
      eyebrow: '楠軒雕塑',
      title: ['客製雕塑', '專業製造'],
      text: '依照您的需求，製作玻璃纖維雕塑、不鏽鋼雕塑與大型瓶型道具。',
      capabilities: ['設計與 3D 建模', '雕塑與展示道具', '打樣與製作', '運輸與安裝指導'],
      facts: ['成立年份', '車間面積約', '產品類別'],
      notes: ['公司位於深圳', '車間位於肇慶'],
    },
    featured: '精選產品',
    materials: '產品分類',
    capabilities: '為何選擇楠軒？',
  },
  about: {
    title: '關於楠軒與客製製作', description: '楠軒成立於 2012 年，公司位於深圳，在肇慶設有約 4,000 平方公尺的製作車間，提供客製玻璃纖維與不鏽鋼雕塑。',
    eyebrow: '楠軒雕塑', heading: '關於我們', lead: '依照您的需求，製作客製雕塑與大型瓶型道具。',
    introTitle: '認識楠軒',
    pending: '公司介紹、團隊資料與車間照片將在確認後補充。',
  },
  work: {
    title: '客製雕塑與瓶型道具', description: '探索楠軒的玻璃纖維（FRP）雕塑、不鏽鋼雕塑與大型瓶型道具。',
    eyebrow: '依需求製作', heading: '產品展示', lead: '瀏覽玻璃纖維雕塑、不鏽鋼雕塑與大型瓶型道具。',
    materialNoteTitle: '客製訂製', materialNote: '請提供參考圖、尺寸、數量與使用環境。材質規格、表面處理、價格及交期依各專案確認。',
  },
  contact: {
    title: '聯絡楠軒，洽詢客製雕塑', description: '透過 WhatsApp 或電子郵件洽詢楠軒的客製玻璃纖維（FRP）與不鏽鋼雕塑。歡迎提供參考圖、尺寸、數量與專案地點。',
    eyebrow: '楠軒雕塑', heading: '聯絡我們', lead: '請提供參考圖、尺寸、數量與專案地點，方便我們為您報價。',
    panelEyebrow: 'WhatsApp 與電子郵件', panelTitle: '聯絡方式', panelText: '歡迎透過 WhatsApp 或電子郵件與我們討論您的專案。',
    pending: '聯絡帳號確認後，將於此提供詢價連結。',
    briefEyebrow: '客製詢價', briefTitle: '請提供以下資訊',
    brief: [
      { title: '參考資料', text: '圖片、草圖、圖紙或構想說明。' },
      { title: '產品與尺寸', text: '產品類別、預計尺寸與數量。' },
      { title: '使用環境', text: '預計擺放地點、場地條件與交付地點。' },
      { title: '專案需求', text: '需要討論的設計、打樣、表面處理、包裝、運輸或安裝指導。' },
    ],
    scopeNote: '費用、交期與服務範圍依各專案確認。',
  },
  process: { title: '客製製作流程', description: '從設計、打樣到製作、運輸與安裝指導。' },
  inquiry: { title: '準備開始您的專案？', text: '請提供參考圖、尺寸與專案地點，方便我們為您報價。' },
  detail: { preview: '此頁為預留版型，未展示已完成的專案。', scope: '價格、交期與安裝服務範圍會在洽談時確認。', noteTitle: '專案詳情', note: '歡迎討論設計、3D 建模、打樣、製作、包裝、運輸與安裝指導。需求與服務範圍依各專案確認。' },
};

export const categories = {
  fiberglass: { title: '玻璃纖維（FRP）雕塑', heading: '玻璃纖維（FRP）雕塑', description: '依照您的造型、尺寸與表面處理需求，製作客製玻璃纖維雕塑。' },
  'stainless-steel': { title: '不鏽鋼雕塑', heading: '不鏽鋼雕塑', description: '提供客製不鏽鋼雕塑製作，工藝涵蓋鍛造、拼接、打磨與拋光。' },
  'bottle-props': { title: '瓶型道具', heading: '客製瓶型道具', description: '依包裝樣式製作大型瓶身、杯身與容器道具。' },
};

export const company = {
  profile: '楠軒成立於 2012 年，專注於客製玻璃纖維（FRP）與不鏽鋼雕塑。公司位於深圳，在中國廣東肇慶設有約 4,000 平方公尺的車間。我們依參考圖或圖紙製作，服務涵蓋設計與 3D 建模、打樣、製作、包裝運輸及安裝指導。',
  address: '公司：深圳｜車間：中國廣東肇慶',
  facts: [
    { value: '2012', label: '成立年份' },
    { value: '約 4,000 m²', label: '車間面積' },
    { value: '深圳', label: '公司所在地' },
    { value: '肇慶', label: '車間所在地' },
  ],
  materials: [
    { material: '玻璃纖維（FRP）', title: '從模型到成品', text: '先製作模型並翻模成形，再修整與上色。造型、尺寸與表面處理依需求確認。' },
    { material: '不鏽鋼', title: '鍛造、拼接與表面處理', text: '透過鍛造、拼接、打磨與拋光完成雕塑。鋼材規格、表面處理與安裝需求依各專案討論。' },
  ],
  capabilities: [
    { title: '客製製造', text: '提供圖紙或參考圖，我們與您討論造型、尺寸與表面處理。' },
    { title: '雕塑與展示道具', text: '涵蓋玻璃纖維雕塑、不鏽鋼雕塑與大型瓶型道具。' },
    { title: '設計與製作', text: '提供設計、3D 建模、打樣與製作。' },
    { title: '運輸與安裝指導', text: '依專案討論包裝、運輸與安裝指導。' },
  ],
  services: [
    { title: '提供參考資料', text: '從圖紙、圖片或專案簡介開始，討論造型、尺寸、數量與地點。' },
    { title: '設計與 3D 建模', text: '發展設計方案，確認造型與比例。' },
    { title: '打樣', text: '討論是否需要樣品，並在製作前確認打樣範圍。' },
    { title: '製作', text: '依確認的設計與專案要求製作雕塑。' },
    { title: '包裝與運輸', text: '依專案確認包裝方式與運輸安排。' },
    { title: '安裝指導', text: '討論場地條件及雕塑所需的安裝指導。' },
  ],
};
