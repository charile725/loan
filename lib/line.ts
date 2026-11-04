export function buildLineUrl(lineId: string, search = ''): string {
  const url = new URL(`https://line.me/R/ti/p/${encodeURIComponent(lineId)}`);
  for (const [key, value] of new URLSearchParams(search)) {
    if (/^utm_[a-z0-9_]+$/i.test(key)) url.searchParams.append(key, value);
  }
  return url.toString();
}
