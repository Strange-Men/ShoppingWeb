// Native <details> keeps navigation usable when JavaScript is unavailable.
const disclosures = [...document.querySelectorAll<HTMLDetailsElement>('[data-disclosure]')];
function closeDisclosure(details: HTMLDetailsElement, restore = false) {
  details.open = false;
  if (restore) details.querySelector<HTMLElement>('summary')?.focus();
}
disclosures.forEach((details) => {
  const summary = details.querySelector('summary')!;
  summary.setAttribute('aria-expanded', String(details.open));
  details.addEventListener('toggle', () => {
    summary.setAttribute('aria-expanded', String(details.open));
    if (details.open) disclosures.filter(other => other !== details).forEach(other => closeDisclosure(other));
    document.body.classList.toggle('menu-open', !!document.querySelector('.mobile-menu[open]'));
  });
  details.querySelector('.disclosure-close')?.addEventListener('click', () => closeDisclosure(details,true));
  details.querySelector('.menu-backdrop')?.addEventListener('click', () => closeDisclosure(details,true));
  details.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeDisclosure(details)));
});
document.addEventListener('click', (event) => {
  if (!(event.target instanceof Node)) return;
  disclosures.filter(details => details.open && !details.contains(event.target as Node)).forEach(details => closeDisclosure(details));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') disclosures.filter(details => details.open).forEach(details => closeDisclosure(details,true));
  const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu[open]');
  if (event.key === 'Tab' && menu) {
    const focusable = [...menu.querySelectorAll<HTMLElement>('summary, button, a[href]')].filter(el => el.getClientRects().length);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
});
matchMedia('(min-width: 1000px)').addEventListener('change', (event) => {
  if (event.matches) document.querySelector<HTMLDetailsElement>('.mobile-menu') && closeDisclosure(document.querySelector<HTMLDetailsElement>('.mobile-menu')!);
});
document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((gallery) => {
  const dialog = gallery.querySelector<HTMLDialogElement>('dialog')!;
  const slides = [...dialog.querySelectorAll<HTMLElement>('[data-slide]')];
  let index = 0;
  let opener: HTMLElement | null = null;
  function show(next: number) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, position) => { slide.hidden = position !== index; });
    dialog.querySelector('.gallery-count')!.textContent = `${index + 1} / ${slides.length}`;
  }
  gallery.querySelectorAll<HTMLElement>('.gallery-open').forEach(button => button.addEventListener('click', () => {
    opener = button; show(Number(button.dataset.index)); dialog.showModal(); document.body.classList.add('viewer-open');
  }));
  dialog.querySelector('.gallery-close')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('.gallery-prev')?.addEventListener('click', () => show(index - 1));
  dialog.querySelector('.gallery-next')?.addEventListener('click', () => show(index + 1));
  dialog.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight') show(index + 1); if (event.key === 'ArrowLeft') show(index - 1); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('viewer-open'); opener?.focus(); });
});
