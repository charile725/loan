import Script from 'next/script';
export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const meta = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const validGa = ga && /^G-[A-Z0-9]+$/.test(ga);
  const validMeta = meta && /^\d+$/.test(meta);
  return <>
    {validGa && <><Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag('js',new Date());var cleanUrl=new URL(window.location.href);for(var key of Array.from(cleanUrl.searchParams.keys())){if(!/^utm_[a-z0-9_]+$/i.test(key))cleanUrl.searchParams.delete(key)}cleanUrl.hash='';gtag('config',${JSON.stringify(ga)},{send_page_view:true,page_location:cleanUrl.toString(),allow_google_signals:false,allow_ad_personalization_signals:false});`}</Script><Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" /></>}
    {validMeta && <Script id="meta-init" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(meta)});fbq('track','PageView');`}</Script>}
  </>;
}
