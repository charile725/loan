import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLineUrl } from './line.ts';
test('preserves UTM values and excludes other query parameters', () => {
  const url = new URL(buildLineUrl('@test', '?utm_source=社群&utm_campaign=A%26B&email=private&redirect=https://evil.example'));
  assert.equal(url.origin, 'https://line.me');
  assert.equal(decodeURIComponent(url.pathname), '/R/ti/p/@test');
  assert.equal(url.searchParams.get('utm_source'), '社群');
  assert.equal(url.searchParams.get('utm_campaign'), 'A&B');
  assert.equal(url.searchParams.has('email'), false);
  assert.equal(url.searchParams.has('redirect'), false);
});
test('handles empty query and repeated UTM parameters', () => {
  assert.equal(new URL(buildLineUrl('@test')).search, '');
  assert.deepEqual(new URL(buildLineUrl('@test', '?utm_source=a&utm_source=b')).searchParams.getAll('utm_source'), ['a','b']);
});
