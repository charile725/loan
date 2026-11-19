'use client';
import { useEffect, useState } from 'react';
import { buildLineUrl } from '@/lib/line';
import { Icon } from '@/components/icons';
type Position = 'header' | 'hero' | 'sticky' | 'footer' | 'banner';
type Variant = 'solid' | 'light' | 'line' | 'floating';
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[][]; push?: unknown; loaded?: boolean; version?: string };
    _fbq?: Window['fbq'];
  }
}
export function LineButton({ position, size = 'md', className = '', variant = 'solid' }: { position: Position; size?: 'sm' | 'md'; className?: string; variant?: Variant }) {
  const id = process.env.NEXT_PUBLIC_LINE_ID?.trim();
  const configured = !!id && id !== '@LINE_ID';
  const [href, setHref] = useState(configured ? buildLineUrl(id) : '#contact');
  useEffect(() => { if (configured && id) setHref(buildLineUrl(id, window.location.search)); }, [configured, id]);
  function track() {
    if (!configured) return;
    if (process.env.NEXT_PUBLIC_GA_ID) window.gtag?.('event', 'line_click', { position, transport_type: 'beacon' });
    if (process.env.NEXT_PUBLIC_META_PIXEL_ID) window.fbq?.('trackCustom', 'line_click', { position });
  }
  const floating = variant === 'floating';
  return <a href={href} target={configured ? '_blank' : undefined} rel={configured ? 'noopener noreferrer' : undefined} onClick={track} className={`${floating ? 'floating-line' : `button line-button line-button-${variant}`} ${size === 'sm' ? 'button-sm' : ''} ${className}`} aria-label={configured ? '加入官方 LINE 免費諮詢（在新分頁開啟）' : '前往聯絡資訊'}>
    {configured ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="line-icon"><path d="M21 10.6c0-4.5-4-8-9-8s-9 3.5-9 8c0 4 3.3 7.3 7.6 7.9.3.1.7.2.7.6l-.2 1.7c0 .5.4.6.8.4 3.8-2.3 9.1-6.2 9.1-10.6Z" fill="currentColor"/><path d="M7 8v5h2M11 8v5m3 0V8l3 5V8" className="line-icon-letters" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> : <Icon name="message" className="icon-sm" />}
    <span>{floating ? configured ? 'LINE 諮詢' : '聯絡諮詢' : configured ? '免費 LINE 諮詢' : '了解諮詢方式'}</span>
  </a>;
}
