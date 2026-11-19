'use client';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/icons';
const links = [['#needs', '諮詢服務'], ['#about', '關於我們'], ['#process', '申辦流程'], ['#plan', '方案條件'], ['#faq', '常見問題']];

export function SiteHeader({ brand, phone }: { brand: string; phone?: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('main > section[id]')];
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`); }, { rootMargin: '-18% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
    const clearAtTop = () => { if (window.scrollY < 200) setActive(''); };
    window.addEventListener('scroll', clearAtTop, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', clearAtTop); };
  }, []);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1100px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    header.current?.querySelector<HTMLAnchorElement>('#mobile-nav a')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (event.key !== 'Tab') return;
      const focusable = [...(header.current?.querySelectorAll<HTMLElement>('a, button') || [])].filter(element => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); };
  }, [open]);
  return <>
    <header ref={header} className="site-header"><div className="shell header-main">
      <a href="#" className="brand-lockup" onClick={() => setOpen(false)} aria-label={`${brand}，回到首頁`}><img src="/mark.svg" width="38" height="42" alt="" /><span><strong>{brand}</strong><small>CLARITY · CONFIDENCE · CARE</small></span></a>
      <nav aria-label="主要導覽" className="desktop-nav">{links.map(([href, label]) => <a key={href} href={href} aria-current={active === href ? 'location' : undefined}>{label}</a>)}</nav>
      <a href="#contact" className="button header-cta" onClick={() => setOpen(false)}><Icon name="message" className="icon-sm" />免費諮詢</a>
      <button ref={toggle} id="nav-toggle" type="button" className="nav-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? '關閉選單' : '開啟選單'} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} className="icon-lg" /></button>
    </div><nav id="mobile-nav" aria-label="手機導覽" className="mobile-nav" hidden={!open}><div className="shell">{links.map(([href, label]) => <a key={href} href={href} aria-current={active === href ? 'location' : undefined} onClick={() => { setOpen(false); toggle.current?.focus(); }}>{label}</a>)}<a href="#contact" onClick={() => { setOpen(false); toggle.current?.focus(); }}>聯繫諮詢</a>{phone && <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}><Icon name="phone" className="icon-sm" />{phone}</a>}</div></nav></header>
    {open && <button className="nav-backdrop" aria-label="關閉導覽選單" tabIndex={-1} onClick={() => { setOpen(false); toggle.current?.focus(); }} />}
  </>;
}
