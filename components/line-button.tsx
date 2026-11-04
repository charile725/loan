'use client';
import { useEffect, useState } from 'react';
import { buildLineUrl } from '@/lib/line';
type Position = 'hero' | 'sticky' | 'footer';
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[][]; push?: unknown; loaded?: boolean; version?: string };
    _fbq?: Window['fbq'];
  }
}
export function LineButton({ position }: { position: Position }) {
  const id = process.env.NEXT_PUBLIC_LINE_ID || '@LINE_ID';
  const [href, setHref] = useState(buildLineUrl(id));
  useEffect(() => { setHref(buildLineUrl(id, window.location.search)); }, [id]);
  function track() {
    if (process.env.NEXT_PUBLIC_GA_ID) window.gtag?.('event', 'line_click', { position, transport_type: 'beacon' });
    if (process.env.NEXT_PUBLIC_META_PIXEL_ID) window.fbq?.('trackCustom', 'line_click', { position });
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" onClick={track} className="line-button" aria-label={`加入官方 LINE 免費諮詢${position === 'sticky' ? '（固定按鈕）' : ''}`}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 10.6c0-4.5-4-8-9-8s-9 3.5-9 8c0 4 3.3 7.3 7.6 7.9.3.1.7.2.7.6l-.2 1.7c0 .5.4.6.8.4 3.8-2.3 9.1-6.2 9.1-10.6Z" fill="currentColor"/><path d="M7 8v5h2M11 8v5m3 0V8l3 5V8" stroke="#06C755" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg><span>LINE 免費諮詢</span><span aria-hidden="true" className="ml-auto pl-6">↗</span></a>;
}
