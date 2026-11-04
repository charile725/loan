import Image from 'next/image';
import { LineButton } from '@/components/line-button';
import { content as c } from '@/lib/content';
const steps = [ ['加入 LINE', '加入官方帳號，開啟對話。'], ['諮詢需求', '說明資金用途與預期安排。'], ['確認條件', '了解額度、利率、期數與費用。'], ['簽約', '詳閱合約，確認權利與義務。'], ['撥款', '完成約定程序後，依合約安排。'] ];
const faqs = [
  ['需要準備什麼？', '可先整理預計借款金額、資金用途與每月可負擔的還款金額。實際申辦所需文件，請透過官方 LINE 確認；本網站不收集個人資料、證件或照片。'],
  ['多久可以撥款？', '辦理時間會受資料完整度、條件確認與簽約進度影響。完成必要程序後，依實際合約約定的時間安排撥款，請於簽約前確認。'],
  ['利率怎麼計算？', '本方案年利率區間請見上方「方案說明」，上限不得超過 16%。實際利率、計息基礎、還款方式與總還款金額，須於簽約前確認並載明於合約。年利率不等於包含所有費用的總費用年百分率。'],
  ['有沒有其他費用？', '請詳閱上方「相關費用」的各項收費名稱、金額或計算方式。諮詢時請一併確認是否有其他必要費用、收取時點與總支出，並以實際合約記載為準。'],
  ['提前還款怎麼算？', '提前清償的申請方式、利息結算，以及是否收取提前清償費用，均依實際合約約定。請於簽約前確認相關條件，再評估適合的還款安排。'],
];
function Label({ number, children }: {number: string; children: React.ReactNode}) { return <p className="eyebrow"><span>{number}</span>{children}</p>; }
export default function Home() {
  return <>
    <a href="#main" className="skip-link">跳至主要內容</a>
    <header className="site-header"><div className="shell flex items-center justify-between gap-4"><a href="#" className="brand"><span className="brand-mark" aria-hidden="true">＋</span>{c.brand}</a><span className="header-note">透明溝通 · 審慎選擇</span></div></header>
    <main id="main" className="shell">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow"><span className="status-dot" />讓每個決定，都更有把握</p>
        <h1 id="hero-title">先了解條件，<br/>再<span className="accent">安心決定。</span></h1>
        <p className="hero-description">資金安排，從清楚的對話開始。<br/>把額度、利率與費用說明白，陪你評估下一步。</p>
        <p className="audience">適合有資金週轉需求，且願意評估自身還款能力的成年人。</p>
        <div className="hero-action"><LineButton position="hero"/><p className="small-note">先諮詢、再評估，由你決定是否申辦。</p></div>
        <div className="hero-bottom"><div><span className="check">✓</span> 年利率與費用公開</div><div><span className="check">✓</span> 本站不收集個人資料</div></div>
        <div className="hero-art" aria-hidden="true"><span className="orbit orbit-one"/><span className="orbit orbit-two"/><div className="art-card"><span className="art-symbol">✓</span><span>每一步，都清楚</span><i/><i/><i/></div><span className="art-leaf"/></div>
      </section>
      <section className="section" id="plan" aria-labelledby="plan-title">
        <Label number="01">方案說明</Label><h2 id="plan-title">重要條件，先攤開來談。</h2><p className="section-intro">了解每一項成本，再衡量是否符合你的需求。</p>
        <div className="plan-card"><div className="plan-grid"><div><h3>借款額度範圍</h3><p className="condition">{c.amount}</p></div><div><h3>年利率區間</h3><p className="condition">{c.annualRate}</p><p className="rate-limit">年利率上限不得超過 16%</p></div><div><h3>還款期數</h3><p className="condition">{c.terms}</p></div></div><div className="fees"><h3>相關費用</h3><p>{c.fees}</p><p className="mt-3">實際年利率、各項費用與還款條件，均須於簽約前確認，並以合約記載為準。</p></div></div>
        <p className="disclosure">資訊待填：額度、實際年利率區間、期數與費用尚待放款人確認，請先透過官方 LINE 詢問完整條件。</p>
      </section>
      <section className="section" aria-labelledby="process-title"><Label number="02">申辦流程</Label><h2 id="process-title">五個步驟，清楚每一步。</h2><p className="section-intro">確認需求與條件後，再進入後續申辦程序。</p><ol className="timeline">{steps.map(([title, text], i) => <li key={title}><span className="step-number">0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
      <section className="section" aria-labelledby="faq-title"><Label number="03">常見問題</Label><h2 id="faq-title">你的疑問，值得好好回答。</h2><div className="faq-list">{faqs.map(([q,a], i) => <details name="faq" key={q}><summary><span className="faq-index">0{i+1}</span><span>{q}</span><span className="faq-plus" aria-hidden="true">＋</span></summary><p>{a}</p></details>)}</div></section>
      <section className="notice section" aria-labelledby="notice-title"><Label number="04">借款須知</Label><h2 id="notice-title">做決定前，留點時間給自己。</h2><ul><li>借款前請詳閱合約，確認還款方式、期限與違約責任。</li><li>評估自身還款能力，避免超出可負擔範圍的借款。</li><li>利率與費用以實際合約為準，遇到不清楚的內容請先詢問。</li></ul><p className="privacy-note">本網站不收集任何個人資料、證件或照片，也不設置申請表單。若啟用網站分析，將使用第三方分析工具記錄瀏覽與按鈕點擊事件；不會將網址上的其他參數送入 LINE。</p></section>
      <section className="section lender" aria-labelledby="lender-title"><Label number="05">放款人資訊</Label><h2 id="lender-title">諮詢之前，先認識服務窗口。</h2><dl><div><dt>姓名或名稱</dt><dd>{c.lender}</dd></div><div><dt>聯絡電話</dt><dd>{c.phone}</dd></div><div><dt>服務時間</dt><dd>{c.hours}</dd></div></dl></section>
      <section className="closing" aria-labelledby="closing-title"><span className="closing-kicker">從了解開始，讓選擇更踏實</span><h2 id="closing-title">有需要，就先聊聊。</h2><p>不必急著決定。把問題帶來，先了解適合自己的安排。</p><LineButton position="footer"/><span className="closing-note">諮詢免費；借款相關費用請見方案說明及實際合約。</span></section>
    </main>
    <footer className="site-footer shell"><div className="flex items-center gap-3"><Image src="/mark.svg" width={28} height={28} alt=""/><span className="font-semibold">{c.brand}</span></div><p>{c.lender}　｜　{c.phone}<br/>服務時間：{c.hours}</p><p>借款風險提醒：借款前請審慎評估還款能力，詳閱合約。利率與費用以實際合約為準。</p><div className="copyright"><span>© {new Date().getFullYear()} {c.lender}。保留所有權利。</span><span>理性借貸・審慎規劃</span></div></footer>
    <aside className="sticky-cta" aria-label="LINE 諮詢快捷入口"><LineButton position="sticky"/></aside>
  </>;
}
