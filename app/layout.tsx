import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@/components/analytics';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.example'),
  title: '順心借｜專業溝通，安心規劃每一步',
  description: '清楚了解借款額度、年利率、期數與相關費用。透過官方 LINE 諮詢需求，評估自身還款能力後再決定。本網站不收集個人資料、證件或照片。',
  openGraph: { title: '順心借｜專業溝通，安心規劃每一步', description: '條件透明，步驟清楚。從一場有準備的諮詢開始，了解適合自己的借款安排。', locale: 'zh_TW', type: 'website', images: [{url: '/og.png', width: 1200, height: 630, alt: '順心借：資金的難題，用安心找到解答。'}] },
  icons: { icon: '/mark.svg' },
  robots: { index: false, follow: false }, // 替換正式資料後，改為 true。
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="zh-Hant"><body>{children}<Analytics /></body></html>;
}
