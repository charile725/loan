'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { Icon, type IconName } from '@/components/icons';

const services: { icon: IconName; title: string; label: string; heading: string; text: string; points: string[]; preparation: string }[] = [
  { icon: 'wallet', title: '個人資金週轉', label: '因應短期資金需求', heading: '為眼前的需要，理出清楚的安排。', text: '面對臨時支出或短期週轉，先盤點真正需要的金額，再討論與還款能力相符的方向。', points: ['釐清資金用途與需求金額', '評估每月可負擔的還款預算', '了解適用條件與完整費用'], preparation: '預計借款金額、使用時間與每月還款預算。' },
  { icon: 'layers', title: '還款整合規劃', label: '重新梳理每月負擔', heading: '把分散的還款，放在一起看清楚。', text: '整理現有的還款項目，比較期數、每月負擔與總成本，評估整合安排是否符合自己的需要。', points: ['盤點現有還款與剩餘期數', '比較整合前後的總還款成本', '確認提前清償與其他相關費用'], preparation: '現有借款餘額、利率、剩餘期數及每月還款金額。' },
  { icon: 'briefcase', title: '營運週轉諮詢', label: '讓營運資金更有方向', heading: '為每一筆營運支出，做好事前規劃。', text: '從進貨、設備到日常營運，先了解資金缺口與收支節奏，再討論適合的資金安排。', points: ['整理營運用途與資金缺口', '盤點收支時間及現金流安排', '評估與營運節奏相符的期數'], preparation: '資金用途、預計支出時間與營運收支概況。' },
  { icon: 'home', title: '生活資金規劃', label: '為重要的生活計畫準備', heading: '重要的生活計畫，從有準備開始。', text: '為教育、居家修繕等支出，釐清預算與時間，將資金需求和日常生活的還款負擔一起考量。', points: ['確認生活計畫的實際預算', '保留日常支出所需的空間', '了解不同期數的還款負擔'], preparation: '計畫用途、預估支出與家庭每月可負擔的預算。' },
];

export function ServiceExplorer() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % services.length;
    else if (event.key === 'ArrowLeft') next = (index + services.length - 1) % services.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = services.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return <div className="service-explorer">
    <div className="service-tabs" role="tablist" aria-label="選擇資金諮詢項目">{services.map((item, index) => <button key={item.title} ref={element => { tabs.current[index] = element; }} id={`${id}-tab-${index}`} type="button" role="tab" aria-selected={selected === index} aria-controls={`${id}-panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => onKeyDown(event, index)}><span className="service-tab-icon"><Icon name={item.icon} className="icon-lg" /></span><span><strong>{item.title}</strong><small>{item.label}</small></span><Icon name="check" className="service-selected-icon" /></button>)}</div>
    {services.map((item, index) => <div key={item.title} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} tabIndex={0} hidden={selected !== index} className="service-panel"><div className="service-panel-copy"><p className="service-panel-label"><Icon name={item.icon} className="icon-sm" />{item.title}</p><h3>{item.heading}</h3><p>{item.text}</p><a href="#contact" className="button">了解諮詢方式</a></div><div className="service-panel-detail"><h4>我們可以一起釐清</h4><ul>{item.points.map(point => <li key={point}><Icon name="check" className="icon-sm" />{point}</li>)}</ul><div className="service-preparation"><Icon name="file" className="icon-sm" /><p><strong>諮詢前，可以先想想</strong><span>{item.preparation}</span></p></div></div></div>)}
  </div>;
}
