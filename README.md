# 借貸諮詢 Landing Page

Next.js App Router、TypeScript、Tailwind CSS。全站靜態輸出至 `out/`；無 API、資料庫、表單或檔案上傳。新專案位於 `/srv/loan-consultation`，與既有 `/srv/website` 獨立。

## 本機啟動與驗證

需要 Node.js 20.9 以上（建議 Node.js 24 LTS）。

```sh
npm install
cp .env.example .env.local
npm run dev
npm test
npm run build
npm run typecheck
```

`next/image` 使用靜態圖片與 `unoptimized: true`，不依賴圖片處理伺服器。無外部字型、動畫套件或大型圖片；FAQ 使用原生 details/summary，支援鍵盤。手機固定 CTA 預留底部空間及 safe area；桌機維持單欄置中。

## 上線前替換清單

| 位置 | 待替換資料 |
| --- | --- |
| `.env.local` / Vercel 環境變數 | `NEXT_PUBLIC_LINE_ID=@LINE_ID`：完整官方 LINE ID，含 `@` |
| 同上 | `NEXT_PUBLIC_SITE_URL=https://your-domain.example`：正式網址，含 https |
| 同上（選填） | `NEXT_PUBLIC_GA_ID`：GA4 的 `G-...` ID |
| 同上（選填） | `NEXT_PUBLIC_META_PIXEL_ID`：純數字 Meta Pixel ID |
| `lib/content.ts` | `{額度}`：借款最低、最高金額及幣別 |
| `lib/content.ts` | `{年利率區間}`：最低、最高年利率，最高不得超過 16%；不得只寫上限 |
| `lib/content.ts` | `{期數}`：可申辦的期數範圍與單位 |
| `lib/content.ts` | `{費用：各項收費名稱、金額或計算方式}`：所有費用及收取時點；無費用也應明示 |
| `lib/content.ts` | `{姓名或名稱}`：實際放款人姓名或名稱，會同步更新資訊區及頁尾 |
| `lib/content.ts` | `{聯絡電話}`：實際服務電話 |
| `lib/content.ts` | `{服務時間}`：服務日期、時間與時區 |
| `lib/content.ts` / `app/layout.tsx` / `public/og.png` | 如需品牌名稱，將通用的「借貸諮詢」同步替換 |
| `app/page.tsx` | 填妥條件後，移除「資訊待填」提示；如有確定的撥款、提前清償條件，更新 FAQ |
| `app/layout.tsx` | 確認所有資料可公開後，將 `robots` 的 `index`、`follow` 改為 `true` |

目前佔位版本設為不索引，避免未確認的條件被搜尋引擎收錄。請勿把佔位額度或利率當作正式方案。所有公開環境變數會在建置時寫入前端，修改後需重新部署，不可放秘密金鑰。

## LINE 與追蹤

三個 LINE 按鈕的位置分別是 `hero`、`sticky`、`footer`（頁尾前的最後 CTA）。點擊時：

- GA4：`gtag('event', 'line_click', { position, transport_type: 'beacon' })`
- Meta：`fbq('trackCustom', 'line_click', { position })`

未設定有效 ID 時，不載入對應第三方追蹤腳本。只追蹤頁面與按鈕事件，不實作資料填寫、進階比對或自動事件擷取。啟用第三方分析前，應確認自身隱私告知與適用的同意需求。預設兩者均停用。

`lib/line.ts` 將目前網址上所有 `utm_*` 參數附加至官方 `https://line.me/R/ti/p/{ID}` 連結；其他參數不轉交。例如：

```text
/?utm_source=facebook&utm_campaign=consultation
→ https://line.me/R/ti/p/%40your-id?utm_source=facebook&utm_campaign=consultation
```

這保留的是出站網址參數；LINE App 是否保留或呈現渠道資訊由 LINE 決定，不等同 LINE 好友來源歸因。可先以 GA4 的 `line_click` 與渠道報表分析流量。未另建中介站或後端。

## 部署到 Vercel

專案已附 `vercel.json`，使用 Next.js 框架、`npm run build`、輸出目錄 `out`。

1. 將此資料夾提交到你的 Git 儲存庫，在 Vercel 匯入專案；若是 monorepo，Root Directory 指向此資料夾。
2. 在 Vercel 的 Environment Variables 設定 `.env.example` 中的值。
3. 按 Deploy。正式網址確定後，更新 `NEXT_PUBLIC_SITE_URL` 並重新部署。

或在可登入 Vercel 的終端機執行：

```sh
npx vercel login
npx vercel --prod
```

此專案不需要 runtime 環境變數、Serverless Functions、資料庫或後端。首次部署若出現設定提示，選 Next.js，Build Command 為 `npm run build`，Output Directory 為 `out`。

## 驗收

- 手機 390px、桌機 1280px：檢查無水平溢出、固定 CTA 不遮住頁尾、鍵盤可展開 FAQ。
- 以帶 UTM 的網址開啟，確認三處 LINE 按鈕保留參數。
- 未設定追蹤 ID 時，Network 不應請求 Google / Meta；設定後用 GA DebugView 與 Meta Test Events 檢查 `line_click` 與 `position`。
- 對正式部署網址執行 Lighthouse Mobile，效能目標 90+。實際分數須依上線環境及是否啟用第三方追蹤實測，不保證分數。

## 本次環境驗證結果

- `npm run typecheck`：通過。
- `npm test`：2 項通過（UTM 中文與特殊字元、排除其他參數、重複 UTM、無參數情境）。
- 所有本機驗證使用的套件壓縮檔已核對 npm registry 提供的完整性雜湊；主依賴固定為驗證使用的版本。
- 正式 build 尚未完成：此環境禁止 Turbopack 開啟本機通訊埠，webpack 替代建置也受子程序輸出限制影響。尚未產生可驗收的 `out/`。
- Chromium 受系統權限限制無法啟動，未完成瀏覽器視覺驗證與 Lighthouse；尚無效能分數。
- 未找到 Vercel 登入憑證，尚未建立 Vercel 部署或公開網址。請在已登入且具正常網路／子程序權限的環境依上方步驟部署。

官方參考：[Next.js 靜態輸出](https://nextjs.org/docs/app/guides/static-exports)、[Vercel CLI 部署](https://vercel.com/docs/projects/deploy-from-cli)。
