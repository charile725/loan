# 順心借 Landing Page

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

首頁保留暖金識別與珊瑚紅，搭配白色、冷灰及深綠灰底色。分欄主視覺後依序呈現服務原則、四類服務切換、關於我們、申辦流程、方案條件、FAQ 及聯絡區。`public/images/` 的情境照片儲存於本機，並非實際門市照片。圖片使用原生 `img`，不依賴圖片處理伺服器，無外部字型或動畫套件。

### UI 設計參考

- [SoFi 個人貸款](https://www.sofi.com/personal-loans/)：參考清楚的主行動入口與貸款用途分類。
- [Happen 個人貸款（原 LendingClub 網址轉址）](https://www.happen.com/personal-loan)：參考依使用目標分組的服務內容與流程說明。
- [台新 Richart 信用貸款](https://richart.tw/TSDIB_RichartWeb/loan/all-personal-loan)：參考條件、步驟與 FAQ 的資訊分區。

本次調整保留既有品牌、LINE 連結與追蹤邏輯，採用獨立的版面設計；利率、額度、時效等條件仍使用本站已確認的資料，未套用參考網站的產品數字。

情境照片來源：Unsplash 圖片 [商務文件](https://images.unsplash.com/photo-1450101499163-c8848c66ca85)、[辦公空間](https://images.unsplash.com/photo-1497366754035-f200968a6e72)。品牌標記與分享預覽圖為專案內的 SVG 資產。

服務切換使用具備 tab / tabpanel 語意的按鈕，支援左右方向鍵及 Home / End 鍵，分別呈現適用情境、討論項目與諮詢前準備。FAQ 使用原生 details/summary，預設展開第一題，一次展開一題。導覽隨捲動標示目前章節；手機選單支援 Escape、背景關閉與焦點循環，開啟時鎖定背景捲動，切回桌機時自動關閉。手機底部提供申辦流程與諮詢入口，預留 safe area 與頁尾空間。版面支援 320px 至大型桌機，並遵循減少動態效果的系統設定。

## 上線前替換清單

| 位置 | 待替換資料 |
| --- | --- |
| `.env.local` / Vercel 環境變數 | `NEXT_PUBLIC_LINE_ID=@LINE_ID`：完整官方 LINE ID，含 `@` |
| 同上 | `NEXT_PUBLIC_SITE_URL=https://your-domain.example`：正式網址，含 https |
| 同上（選填） | `NEXT_PUBLIC_GA_ID`：GA4 的 `G-...` ID |
| 同上（選填） | `NEXT_PUBLIC_META_PIXEL_ID`：純數字 Meta Pixel ID |
| `lib/content.ts` | `{額度}`：借款最低、最高金額及幣別 |
| `lib/content.ts` | `{年利率區間}`：確認後的實際年利率區間 |
| `lib/content.ts` | `{期數}`：可申辦的期數範圍與單位 |
| `lib/content.ts` | `{費用：各項收費名稱、金額或計算方式}`：所有費用及收取時點；無費用也應明示 |
| `lib/content.ts` | `{姓名或名稱}`：實際放款人姓名或名稱，會同步更新資訊區及頁尾 |
| `lib/content.ts` | `{聯絡電話}`：實際服務電話；填入後，頂部資訊列、聯絡區與桌機浮動入口會自動顯示撥號連結 |
| `lib/content.ts` | `{服務時間}`：服務日期、時間與時區 |
| `lib/content.ts` / `app/layout.tsx` / `public/og.svg` + `public/og.png` | 品牌名稱目前為「順心借」；如需更改，同步替換這幾處（`og.png` 需由 `og.svg` 重新輸出） |
| `components/service-explorer.tsx` / `app/page.tsx` | 確認四項資金諮詢情境，以及條件說明入口與實際服務相符 |
| `app/page.tsx` | 如有確定的撥款、提前清償條件，更新 FAQ |
| `app/layout.tsx` | 確認所有資料可公開後，將 `robots` 的 `index`、`follow` 改為 `true` |

目前佔位版本設為不索引，避免未確認的條件被搜尋引擎收錄。未填寫的方案條件以「依需求評估／諮詢時確認」等文字呈現；聯絡資訊顯示更新中，不會直接輸出大括號佔位資料。LINE ID 未設定或仍為 `@LINE_ID` 時，按鈕會導向站內聯絡區，不會開啟無效帳號；設定正式 ID 後會自動啟用 LINE 連結。所有公開環境變數會在建置時寫入前端，修改後需重新部署，不可放秘密金鑰。

## LINE 與追蹤

LINE 按鈕位置包括 `hero`、`sticky`、`footer`。頁首「免費諮詢」連至聯絡區；僅設定正式 LINE ID 後的出站點擊會記錄：

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

專案已附 `vercel.json`，以靜態網站部署（`framework: null`，因為 `output: 'export'` 不會產生 Next.js 框架預設所需的 `routes-manifest.json`）、`npm run build`、輸出目錄 `out`。

1. 將此資料夾提交到你的 Git 儲存庫，在 Vercel 匯入專案；若是 monorepo，Root Directory 指向此資料夾。
2. 在 Vercel 的 Environment Variables 設定 `.env.example` 中的值。
3. 按 Deploy。正式網址確定後，更新 `NEXT_PUBLIC_SITE_URL` 並重新部署。

或在可登入 Vercel 的終端機執行：

```sh
npx vercel login
npx vercel --prod
```

此專案不需要 runtime 環境變數、Serverless Functions、資料庫或後端。首次部署若出現設定提示，Framework 選 Other，Build Command 為 `npm run build`，Output Directory 為 `out`。

## 驗收

- 手機 320px / 390px、平板 768px、桌機 1280px / 1440px：檢查無水平溢出、固定 CTA 不遮住頁尾、鍵盤可切換服務與展開 FAQ。
- 以帶 UTM 的網址開啟，確認所有 LINE 按鈕保留參數。
- 未設定追蹤 ID 時，Network 不應請求 Google / Meta；設定後用 GA DebugView 與 Meta Test Events 檢查 `line_click` 與 `position`。
- 對正式部署網址執行 Lighthouse Mobile，效能目標 90+。實際分數須依上線環境及是否啟用第三方追蹤實測，不保證分數。

官方參考：[Next.js 靜態輸出](https://nextjs.org/docs/app/guides/static-exports)、[Vercel CLI 部署](https://vercel.com/docs/projects/deploy-from-cli)。
