export function buildLineUrl(lineId: string, search = ''): string {
  const url = new URL(`https://line.me/R/ti/p/${encodeURIComponent(lineId)}`);
  for (const [key, value] of new URLSearchParams(search)) {
    if (/^utm_[a-z0-9_]+$/i.test(key)) url.searchParams.append(key, value);
  }
  return url.toString();
}

// content.line 可填 LINE 官方短網址（https://lin.ee/... 或 https://line.me/...），或含 @ 的 LINE ID。
// 官方網址原樣使用：lin.ee 轉址時會捨棄 utm_* 參數，並以 oat_content=url 讓 LINE 後台統計「網址」來源的好友。
// 未設定時回傳 null，按鈕改導向站內聯絡區。
export function lineHref(value: string, search = ''): string | null {
  const v = value.trim();
  if (!v || v.startsWith('{') || v === '@LINE_ID') return null;
  if (/^https:\/\/(lin\.ee|line\.me)\//i.test(v)) return v;
  return buildLineUrl(v, search);
}
