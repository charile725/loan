'use client';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/icons';
const links = [['#about', '關於我們'], ['#needs', '諮詢服務'], ['#process', '申辦流程'], ['#plan', '方案條件'], ['#faq', '常見問題']];
export function SiteHeader({ brand, phone }: { brand: string; phone?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); document.getElementById('nav-toggle')?.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);
  return <header className="site-header">
    <div className="header-topbar"><div className="shell"><p>專業溝通，從理解你的需求開始。</p>{phone ? <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}><Icon name="phone" className="icon-xs" />{phone}</a> : <span>透明條件・用心諮詢</span>}</div></div>
    <div className="shell header-main"><a href="#" className="brand-lockup" onClick={() => setOpen(false)}><img src="/mark.svg" width="44" height="48" alt="" /><span><strong>{brand}</strong><small>CLARITY · CONFIDENCE · CARE</small></span></a><nav aria-label="主要導覽" className="desktop-nav">{links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav><a href="#contact" className="button header-cta">立即諮詢<Icon name="arrow-up-right" className="icon-sm" /></a><button id="nav-toggle" type="button" className="nav-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? '關閉選單' : '開啟選單'} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button></div>
    <nav id="mobile-nav" aria-label="手機導覽" className="mobile-nav" hidden={!open}><div className="shell">{links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<Icon name="arrow-up-right" className="icon-sm" /></a>)}<a href="#contact" onClick={() => setOpen(false)}>立即諮詢<Icon name="message" className="icon-sm" /></a></div></nav>
  </header>;
}
