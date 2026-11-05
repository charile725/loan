import { Icon, type IconName } from '@/components/icons';
import { LineButton } from '@/components/line-button';
import { SiteHeader } from '@/components/site-header';
import { content as c } from '@/lib/content';

const confirmed = (value: string) => value.startsWith('{') ? undefined : value;
const phone = confirmed(c.phone);
const trust: [IconName, string, string][] = [
  ['message', '免費諮詢', '先了解，再安心決定'],
  ['file', '條件透明', '額度、利率與費用說清楚'],
  ['lock', '隱私優先', '本站不收取證件與個資'],
  ['shield', '審慎評估', '依自身能力安排還款'],
];
const services: { icon: IconName; title: string; text: string; href: string; label: string }[] = [
  { icon: 'wallet', title: '個人資金週轉', text: '因應短期支出，從盤點資金需求開始。', href: '#plan', label: '了解方案' },
  { icon: 'layers', title: '還款整合規劃', text: '釐清現有還款，比較每月負擔與成本。', href: '#plan', label: '了解方案' },
  { icon: 'briefcase', title: '營運週轉諮詢', text: '進貨、設備與營運支出的資金安排。', href: '#plan', label: '了解方案' },
  { icon: 'home', title: '生活資金規劃', text: '為教育、修繕等支出，做好事前準備。', href: '#plan', label: '了解方案' },
  { icon: 'file', title: '條件費用說明', text: '借款前，先看懂利率、期數與各項費用。', href: '#plan', label: '查看條件' },
];
const steps: [IconName, string, string][] = [
  ['message', '聯繫諮詢', '透過官方 LINE，說明資金需求。'],
  ['search', '需求評估', '討論用途、預算與可負擔的還款安排。'],
  ['file', '確認條件', '逐項了解額度、利率、期數與費用。'],
  ['pen', '審閱合約', '詳閱約定，確認權利與義務後簽約。'],
  ['wallet', '依約撥款', '完成必要程序，依合約約定安排。'],
];
const faqs = [
  ['第一次諮詢，需要先準備什麼？', '可以先整理預計借款金額、資金用途，以及每月能夠負擔的還款金額。實際申辦所需文件，請透過官方 LINE 確認；本網站不收集個人資料、證件或照片。'],
  ['從諮詢到撥款，大約需要多久？', '辦理時間依資料完整度、條件確認與簽約進度而異。完成必要程序後，依實際合約約定的時間安排撥款，請於簽約前確認。'],
  ['諮詢時，應該確認哪些費用？', '除了利率，也請確認各項收費名稱、金額或計算方式、收取時點與總還款金額。相關條件應於簽約前說明清楚，並以實際合約記載為準。'],
  ['可以提前還款嗎？', '提前清償的申請方式、利息結算，以及是否收取相關費用，均依實際合約約定。請於簽約前確認，再評估適合自己的還款安排。'],
];
const plans: [string, string, string][] = [
  ['借款額度', confirmed(c.amount) || '依需求評估', '先確認資金用途與還款能力'],
  ['年利率', confirmed(c.annualRate) || '諮詢時確認', '了解適用利率與計息方式'],
  ['還款期數', confirmed(c.terms) || '依方案約定', '選擇符合預算的還款安排'],
  ['相關費用', confirmed(c.fees) || '簽約前逐項說明', '確認收費項目、金額與時點'],
];
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}><span />{children}</p>;
}
export default function Home() {
  return <>
    <a href="#main" className="skip-link">跳至主要內容</a>
    <SiteHeader brand={c.brand} phone={phone} />
    <main id="main">
      <section aria-labelledby="hero-title" className="hero">
        <img className="hero-image" src="/images/consultation.jpg" alt="" fetchPriority="high" width="2200" height="1467" />
        <div className="hero-shade" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="hero-pill"><span />專業溝通・安心借貸</p>
            <h1 id="hero-title">資金的難題，<br />用<span>安心</span>找到解答。</h1>
            <p className="hero-description">每一份需求，都值得被認真對待。<br className="desktop-break" />從清楚的諮詢開始，陪你看懂條件、理好規劃，<br className="desktop-break" />讓下一步，走得更踏實。</p>
            <div className="hero-actions"><LineButton position="hero" /><a href="#needs" className="button button-outline">探索諮詢服務<Icon name="arrow-right" className="icon-sm" /></a></div>
            <p className="hero-note"><Icon name="shield" className="icon-sm" />免費諮詢，了解清楚後再決定</p>
          </div>
          <div className="hero-side-note" aria-hidden="true"><span />CLARITY. CONFIDENCE. CARE.</div>
          <a href="#about" className="hero-scroll"><span>往下探索</span><Icon name="arrow-down" className="icon-sm" /></a>
        </div>
      </section>
      <section className="trust-section" aria-label="服務原則">
        <ul className="shell trust-list">{trust.map(([icon, title, text]) => <li key={title}><span className="trust-icon"><Icon name={icon} className="icon-lg" /></span><div><h2>{title}</h2><p>{text}</p></div></li>)}</ul>
      </section>
      <section id="about" className="section about-section" aria-labelledby="about-title">
        <div className="shell about-grid">
          <div className="about-visual"><img src="/images/office.jpg" alt="明亮、開放的商務空間" width="1400" height="934" loading="lazy" /><div className="about-image-label"><span className="label-line" /><span>讓溝通，成為安心的開始。<small>A BETTER WAY FORWARD</small></span></div></div>
          <div className="about-copy"><Eyebrow>ABOUT US</Eyebrow><h2 id="about-title" className="section-title">不只是資金安排，<br />更是一份<span className="text-coral">用心的理解。</span></h2><p className="section-description">面對資金需求，你需要的是清楚的資訊，以及能夠好好討論的空間。我們從理解你的情況開始，將重要條件逐一說明，協助你評估適合自己的下一步。</p><div className="about-principles"><div><span>01</span><h3>先傾聽需求</h3><p>了解用途與預期安排</p></div><div><span>02</span><h3>把條件說明白</h3><p>清楚討論利率與費用</p></div><div><span>03</span><h3>把選擇留給你</h3><p>充分理解後再做決定</p></div></div><a href="#process" className="text-link">了解我們的諮詢流程<Icon name="arrow-right" className="icon-sm" /></a></div>
        </div>
      </section>
      <section id="needs" className="services-section" aria-labelledby="services-title">
        <div className="services-pattern" aria-hidden="true" />
        <div className="shell services-layout">
          <div className="services-intro"><Eyebrow light>OUR SERVICES</Eyebrow><h2 id="services-title" className="section-title">不同的資金需求，<br />同樣用心以待。</h2><p>從個人週轉到營運規劃，<br />一起梳理需求，找到合適的方向。</p><ul className="service-checks">{['先了解需求，再討論方案', '額度、利率、費用逐項確認', '評估還款能力，審慎做決定'].map(text => <li key={text}><Icon name="check" className="icon-sm" />{text}</li>)}</ul><a href="#contact" className="text-link text-link-light">與我們聊聊<Icon name="arrow-right" className="icon-sm" /></a></div>
          <div className="services-grid">{services.map(({ icon, title, text, href, label }, i) => <a key={title} href={href} className="service-card"><div className="service-card-top"><Icon name={icon} className="service-icon" /><span>0{i + 1}</span></div><h3>{title}</h3><p>{text}</p><span className="service-card-link">{label}<Icon name="arrow-right" className="icon-sm" /></span></a>)}</div>
        </div>
        <div className="shell consultation-banner"><div className="banner-symbol"><Icon name="message" className="icon-lg" /></div><div className="banner-heading"><p>有疑問，就從一段對話開始。</p><span>免費諮詢，讓資金規劃更有方向。</span></div><LineButton position="banner" variant="light" /></div>
      </section>
      <section id="process" className="section process-section" aria-labelledby="process-title">
        <div className="shell"><div className="section-heading-row"><div><Eyebrow>HOW IT WORKS</Eyebrow><h2 id="process-title" className="section-title">清楚五步驟，<br className="mobile-break" />每一步都安心。</h2></div><p className="heading-note">從第一次諮詢，到確認合約與撥款，<br />重要的事，一步一步說明白。</p></div><ol className="process-list">{steps.map(([icon, title, text], i) => <li key={title}><div className="process-top"><span className="process-number">0{i + 1}</span><Icon name={icon} className="process-icon" /></div><h3>{title}</h3><p>{text}</p></li>)}</ol><p className="section-footnote">實際辦理程序、審核結果與撥款時間，依個別條件及合約約定為準。</p></div>
      </section>
      <section id="plan" className="section planning-section" aria-labelledby="plan-title">
        <div className="shell planning-grid">
          <div className="planning-copy">
            <Eyebrow>PLAN WITH CLARITY</Eyebrow>
            <h2 id="plan-title" className="section-title">條件先看清，<br />規劃更踏實。</h2>
            <p className="section-description">決定之前，先把每一項成本攤開來看。<br />確認利率、期數與費用，再討論符合需求的安排。</p>
            <p className="section-footnote">額度、利率區間、期數與費用，請於諮詢時確認；<br />實際條件以合約記載為準。</p>
          </div>
          <dl className="plan-list">
            {plans.map(([title, value, note], i) => <div key={title}>
              <dt><span>0{i + 1}</span>{title}</dt>
              <dd><strong>{value}</strong><span>{note}</span></dd>
            </div>)}
          </dl>
        </div>
      </section>
      <section id="faq" className="section faq-section" aria-labelledby="faq-title"><div className="shell faq-layout"><div><Eyebrow>FAQ</Eyebrow><h2 id="faq-title" className="section-title">你在意的，<br />我們好好回答。</h2><p className="section-description">有其他問題，也歡迎直接聯繫。<br />把疑問釐清，再安心決定。</p><a href="#contact" className="text-link">聯繫諮詢<Icon name="arrow-right" className="icon-sm" /></a></div><div className="faq-list">{faqs.map(([q, a], i) => <details name="faq" key={q}><summary><span className="faq-number">0{i + 1}</span><h3>{q}</h3><span className="faq-toggle"><Icon name="plus" className="icon-sm" /></span></summary><p>{a}</p></details>)}</div></div></section>
      <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="shell contact-layout"><div className="contact-copy"><Eyebrow light>GET IN TOUCH</Eyebrow><h2 id="contact-title" className="section-title">讓下一步，<br />從安心的對話開始。</h2><p>不必急著做決定。把問題帶來，<br />先了解清楚，再找到適合自己的安排。</p><div className="contact-details"><div><Icon name="phone" className="icon-lg" /><div><span>聯絡電話</span>{phone ? <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a> : <p>聯絡資訊更新中</p>}</div></div><div><Icon name="clock" className="icon-lg" /><div><span>服務時間</span><p>{confirmed(c.hours) || '依官方聯絡資訊公告'}</p></div></div>{confirmed(c.lender) && <div><Icon name="briefcase" className="icon-lg" /><div><span>服務單位</span><p>{c.lender}</p></div></div>}</div></div><div className="contact-card"><div className="contact-card-icon"><Icon name="message" className="icon-xl" /></div><p className="contact-card-kicker">LET’S TALK</p><h3>先聊聊你的需求</h3><p>透過官方 LINE 直接諮詢，<br />一起釐清資金用途、還款預算與方案條件。</p><ul>{['諮詢不收費，了解後再決定', '本站無須填寫個資或上傳證件', '實際條件於簽約前確認'].map(text => <li key={text}><Icon name="check" className="icon-sm" />{text}</li>)}</ul>{process.env.NEXT_PUBLIC_LINE_ID?.trim() && process.env.NEXT_PUBLIC_LINE_ID.trim() !== '@LINE_ID' ? <LineButton position="footer" variant="line" /> : <div className="contact-pending"><Icon name="message" className="icon-sm" /><span>官方聯絡方式更新中</span></div>}<p className="contact-small">借款前請審慎評估還款能力，詳閱合約。</p></div></div></section>
    </main>
    <footer className="site-footer"><div className="shell"><div className="footer-top"><a href="#" className="brand-lockup"><img src="/mark.svg" width="44" height="48" alt="" /><span><strong>{c.brand}</strong><small>CLARITY · CONFIDENCE · CARE</small></span></a><nav aria-label="頁尾導覽"><a href="#about">關於我們</a><a href="#needs">諮詢服務</a><a href="#process">申辦流程</a><a href="#faq">常見問題</a></nav><a href="#" className="back-to-top" aria-label="回到頁首"><Icon name="arrow-up" className="icon-sm" /></a></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {confirmed(c.lender) || c.brand}．保留所有權利。</p><p>借款應審慎評估，利率與費用依實際合約約定。</p></div></div></footer>
    <aside className="floating-contact" aria-label="諮詢快捷入口"><LineButton position="sticky" variant="floating" />{phone && <a className="floating-phone" href={`tel:${phone.replace(/[^\d+]/g, '')}`} aria-label={`撥打電話 ${phone}`}><Icon name="phone" className="icon-lg" /><span>電話諮詢</span></a>}</aside>
    <aside className="mobile-contact" aria-label="手機諮詢快捷入口"><a href="#process"><Icon name="file" className="icon-sm" />申辦流程</a><LineButton position="sticky" /></aside>
  </>;
}
