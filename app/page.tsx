import { Icon, type IconName } from '@/components/icons';
import { LineButton } from '@/components/line-button';
import { ServiceExplorer } from '@/components/service-explorer';
import { SiteHeader } from '@/components/site-header';
import { content as c } from '@/lib/content';

const confirmed = (value: string) => value.startsWith('{') ? undefined : value;
const phone = confirmed(c.phone);
const trust: [IconName, string, string][] = [
  ['message', '免費諮詢', '先了解，再決定'],
  ['file', '條件透明', '利率與費用逐項說明'],
  ['lock', '隱私優先', '本站不收取個資與證件'],
  ['shield', '審慎規劃', '從可負擔的還款開始'],
];
const steps: [IconName, string, string][] = [
  ['message', '聯繫諮詢', '透過官方 LINE，說明你的資金需求。'],
  ['search', '需求評估', '討論資金用途、預算與還款安排。'],
  ['file', '確認條件', '了解額度、利率、期數與各項費用。'],
  ['pen', '審閱合約', '充分理解權利義務，再確認簽約。'],
  ['wallet', '依約撥款', '完成必要程序後，依合約約定安排。'],
];
const faqs = [
  ['第一次諮詢，需要先準備什麼？', '可以先整理預計借款金額、資金用途，以及每月能夠負擔的還款金額。實際申辦所需文件，請透過官方 LINE 確認；本網站不收集個人資料、證件或照片。'],
  ['從諮詢到撥款，大約需要多久？', '辦理時間依資料完整度、條件確認與簽約進度而異。完成必要程序後，依實際合約約定的時間安排撥款，請於簽約前確認。'],
  ['諮詢時，應該確認哪些費用？', '除了利率，也請確認各項收費名稱、金額或計算方式、收取時點與總還款金額。相關條件應於簽約前說明清楚，並以實際合約記載為準。'],
  ['可以提前還款嗎？', '提前清償的申請方式、利息結算，以及是否收取相關費用，均依實際合約約定。請於簽約前確認，再評估適合自己的還款安排。'],
];
const plans: [IconName, string, string, string][] = [
  ['wallet', '借款額度', confirmed(c.amount) || '依需求評估', '先確認資金用途與還款能力'],
  ['percent', '年利率', confirmed(c.annualRate) || '諮詢時確認', '了解適用利率與計息方式'],
  ['clock', '還款期數', confirmed(c.terms) || '依方案約定', '選擇符合預算的還款安排'],
  ['file', '相關費用', confirmed(c.fees) || '簽約前逐項說明', '確認收費項目、金額與時點'],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export default function Home() {
  return <>
    <a href="#main" className="skip-link">跳至主要內容</a>
    <SiteHeader brand={c.brand} phone={phone} />
    <main id="main">
      <section aria-labelledby="hero-title" className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <Eyebrow>專業溝通，安心規劃</Eyebrow>
            <h1 id="hero-title">資金的難題，<br />從<span>安心</span>開始解答。</h1>
            <p className="hero-description">每一份需求，都值得被認真對待。<br />從看懂條件到理好規劃，陪你找到更踏實的下一步。</p>
            <div className="hero-actions"><LineButton position="hero" /><a href="#needs" className="button button-outline">探索諮詢服務</a></div>
            <p className="hero-note"><Icon name="shield" className="icon-sm" />免費諮詢，充分了解後再決定</p>
            <div className="hero-topics" aria-label="諮詢項目"><span>個人週轉</span><span>還款整合</span><span>營運規劃</span></div>
          </div>
          <div className="hero-visual">
            <img className="hero-image" src="/images/consultation.jpg" alt="仔細閱讀文件，釐清每一項規劃細節的情境" fetchPriority="high" width="2200" height="1467" />
            <div className="hero-image-caption"><span>CLARITY. CONFIDENCE. CARE.</span><Icon name="shield" className="icon-lg" /></div>
            <div className="hero-insight"><span className="insight-icon"><Icon name="file" className="icon-lg" /></span><div><p>讓每個選擇，都有清楚的依據。</p><span>了解用途 · 評估預算 · 確認條件</span></div></div>
          </div>
        </div>
      </section>
      <section className="trust-section" aria-label="服務原則"><ul className="shell trust-list">{trust.map(([icon, title, text]) => <li key={title}><span className="trust-icon"><Icon name={icon} className="icon-lg" /></span><div><h2>{title}</h2><p>{text}</p></div></li>)}</ul></section>

      <section id="needs" className="section services-section" aria-labelledby="services-title"><div className="shell"><div className="section-heading-row"><div><Eyebrow>諮詢服務 <span>/ OUR SERVICES</span></Eyebrow><h2 id="services-title" className="section-title">從你的需求出發。</h2></div><p className="heading-note">每個階段，都有不同的資金課題。<br />選擇你想了解的項目，一起梳理適合的方向。</p></div><ServiceExplorer /><div className="services-footnote"><p><Icon name="file" className="icon-sm" />想先了解利率、期數與費用？</p><a href="#plan" className="text-link">查看方案條件</a></div></div></section>

      <section id="about" className="section about-section" aria-labelledby="about-title"><div className="shell about-grid"><div className="about-visual"><img src="/images/office.jpg" alt="明亮、開放的商務空間情境" width="1400" height="934" loading="lazy" /><div className="about-image-label"><Icon name="message" className="icon-lg" /><p>好的規劃，<br /><strong>從好好聊聊開始。</strong></p></div></div><div className="about-copy"><Eyebrow>關於我們 <span>/ OUR APPROACH</span></Eyebrow><h2 id="about-title" className="section-title">不只是資金安排，<br />更是一份用心的理解。</h2><p className="section-description">面對資金需求，你需要清楚的資訊，也需要能夠好好討論的空間。我們先理解你的情況，將重要條件逐一說明，協助你評估下一步。</p><ul className="about-principles">{[['先傾聽，再討論', '從資金用途與實際需求開始。'], ['把重要條件說明白', '額度、利率與費用，逐項確認。'], ['把選擇留給你', '充分理解後，再做適合自己的決定。']].map(([title, text]) => <li key={title}><span><Icon name="check" className="icon-sm" /></span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul></div></div></section>

      <section id="process" className="section process-section" aria-labelledby="process-title"><div className="shell"><div className="section-heading-row"><div><Eyebrow>申辦流程 <span>/ HOW IT WORKS</span></Eyebrow><h2 id="process-title" className="section-title">每一步，都清楚安心。</h2></div><p className="heading-note">從第一次諮詢，到確認合約與撥款，<br />重要的事，一步一步說明白。</p></div><ol className="process-list">{steps.map(([icon, title, text], i) => <li key={title}><div className="process-marker"><span>{i + 1}</span><div className="process-icon-wrap"><Icon name={icon} className="icon-lg" /></div></div><h3>{title}</h3><p>{text}</p></li>)}</ol><p className="section-footnote"><Icon name="shield" className="icon-sm" />實際辦理程序、審核結果與撥款時間，依個別條件及合約約定為準。</p></div></section>

      <section id="plan" className="section planning-section" aria-labelledby="plan-title"><div className="shell planning-grid"><div className="planning-copy"><Eyebrow>方案條件 <span>/ PLAN WITH CLARITY</span></Eyebrow><h2 id="plan-title" className="section-title">條件先看清，<br />規劃更踏實。</h2><p className="section-description">決定之前，把每一項成本攤開來看。<br />確認利率、期數與費用，再討論符合需求的安排。</p><a href="#contact" className="button button-outline">諮詢適用條件</a><p className="planning-note">實際條件以個別評估與合約記載為準。</p></div><dl className="plan-list">{plans.map(([icon, title, value, note]) => <div key={title}><dt><Icon name={icon} className="icon-sm" />{title}</dt><dd><strong>{value}</strong><span>{note}</span></dd></div>)}</dl></div></section>

      <section id="faq" className="section faq-section" aria-labelledby="faq-title"><div className="shell faq-layout"><div><Eyebrow>常見問題 <span>/ FAQ</span></Eyebrow><h2 id="faq-title" className="section-title">把疑問釐清，<br />讓選擇更安心。</h2><p className="section-description">第一次了解借款，也不用擔心。<br />從你最在意的問題開始。</p><a href="#contact" className="text-link">還有疑問？聯繫我們</a></div><div className="faq-list">{faqs.map(([q, a], i) => <details name="faq" key={q} open={i === 0}><summary><h3>{q}</h3><span className="faq-toggle"><Icon name="plus" className="icon-sm" /></span></summary><p>{a}</p></details>)}</div></div></section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="shell contact-layout"><div className="contact-copy"><Eyebrow>聯繫諮詢 <span>/ LET’S TALK</span></Eyebrow><h2 id="contact-title" className="section-title">下一步，<br />從一段對話開始。</h2><p className="section-description">不必急著做決定。把問題帶來，<br />一起了解需求，找到合適的安排。</p><div className="contact-details">{phone && <div><Icon name="phone" className="icon-sm" /><div><span>聯絡電話</span><a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a></div></div>}{confirmed(c.hours) && <div><Icon name="clock" className="icon-sm" /><div><span>服務時間</span><p>{c.hours}</p></div></div>}{confirmed(c.lender) && <div><Icon name="briefcase" className="icon-sm" /><div><span>服務單位</span><p>{c.lender}</p></div></div>}</div></div><div className="contact-card"><div className="contact-card-heading"><span className="contact-card-icon"><Icon name="message" className="icon-lg" /></span><div><h3>先聊聊你的需求</h3><p>免費諮詢，了解之後再決定。</p></div></div><ul>{['梳理資金用途與每月還款預算', '了解額度、利率、期數與相關費用', '本站無須填寫個資或上傳證件'].map(text => <li key={text}><Icon name="check" className="icon-sm" />{text}</li>)}</ul>{process.env.NEXT_PUBLIC_LINE_ID?.trim() && process.env.NEXT_PUBLIC_LINE_ID.trim() !== '@LINE_ID' ? <LineButton position="footer" variant="line" /> : <div className="contact-pending"><Icon name="clock" className="icon-sm" /><div><strong>官方聯絡方式更新中</strong><p>聯絡資訊確認後，將於此處提供。</p></div></div>}<p className="contact-small"><Icon name="lock" className="icon-xs" />借款前請審慎評估還款能力，詳閱合約。</p></div></div></section>
    </main>
    <footer className="site-footer"><div className="shell"><div className="footer-top"><a href="#" className="brand-lockup"><img src="/mark.svg" width="38" height="42" alt="" /><span><strong>{c.brand}</strong><small>CLARITY · CONFIDENCE · CARE</small></span></a><nav aria-label="頁尾導覽"><a href="#needs">諮詢服務</a><a href="#about">關於我們</a><a href="#process">申辦流程</a><a href="#faq">常見問題</a></nav><a href="#" className="back-to-top" aria-label="回到頁首"><Icon name="arrow-up" className="icon-sm" /></a></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {confirmed(c.lender) || c.brand}．保留所有權利。</p><p>借款應審慎評估，利率與費用依實際合約約定。</p></div></div></footer>
    <aside className="floating-contact" aria-label="諮詢快捷入口"><LineButton position="sticky" variant="floating" /></aside>
    <aside className="mobile-contact" aria-label="手機諮詢快捷入口"><a href="#process"><Icon name="file" className="icon-sm" />申辦流程</a><LineButton position="sticky" /></aside>
  </>;
}
