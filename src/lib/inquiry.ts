export interface ContactConfig { whatsappDigits: string; email: string; facebookUrl: string; instagramUrl: string }
export function publicOrigin(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port || url.pathname !== '/' || url.search || url.hash) return null;
    const host = url.hostname.toLowerCase();
    if (!host.includes('.') || /(^|\.)(localhost|example\.(com|org|net)|test|invalid|local)$/.test(host) || /^[\d.]+$/.test(host) || host.includes(':')) return null;
    return url.origin;
  } catch { return null; }
}
export function socialUrl(value: string, network: 'facebook' | 'instagram'): string | null {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');
    return url.protocol === 'https:' && !url.username && !url.password && !url.port && host === `${network}.com` && url.pathname !== '/' ? url.href : null;
  } catch { return null; }
}
export function inquiryLinks(contacts: ContactConfig, origin: string, title: string | undefined = undefined, path = '/en/contact/', chinese = false) {
  const formalOrigin = publicOrigin(origin);
  const subject = title ?? (chinese ? '客製雕塑詢價' : 'Custom sculpture inquiry');
  const reference = formalOrigin ? [`${chinese ? '參考頁面：' : 'Reference: '}${new URL(path, formalOrigin).href}`] : [];
  const message = (chinese
    ? [`您好，我想洽詢：${subject}。`, ...reference, '尺寸：', '數量：', '專案地點：', '參考資料／需求：']
    : [`Hello, I would like to discuss: ${subject}.`, ...reference, 'Dimensions:', 'Quantity:', 'Project location:', 'Reference / requirements:']).join('\n');
  const whatsapp = /^\d{8,15}$/.test(contacts.whatsappDigits) ? `https://wa.me/${contacts.whatsappDigits}?text=${encodeURIComponent(message)}` : null;
  const email = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(contacts.email) ? `mailto:${contacts.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}` : null;
  return { whatsapp, email };
}
