import { describe, expect, it } from 'vitest';
import { estimateMonthlyCost, formatCurrencyJPY, searchFeatures, validateLead } from '../src/utils.js';

describe('estimateMonthlyCost', () => {
  it('calculates the default monthly demo price', () => {
    expect(estimateMonthlyCost()).toBe(3900 + 600 + 3 * 980 + 2400);
  });

  it('normalizes invalid line counts and call counts', () => {
    expect(estimateMonthlyCost({ lines: 0, monthlyCalls: -100, aiHandling: false })).toBe(3900 + 600);
  });
});

describe('formatCurrencyJPY', () => {
  it('formats Japanese yen without decimals', () => {
    expect(formatCurrencyJPY(9840)).toBe('￥9,840');
  });
});

describe('validateLead', () => {
  it('accepts a valid lead', () => {
    const data = new FormData();
    data.set('name', '山田 太郎');
    data.set('company', 'サンプル株式会社');
    data.set('email', 'taro@example.com');
    data.set('phone', '03-1234-5678');
    expect(validateLead(data).ok).toBe(true);
  });

  it('rejects missing or malformed fields', () => {
    const data = new FormData();
    data.set('name', 'A');
    data.set('company', 'B');
    data.set('email', 'not-an-email');
    data.set('phone', '123');
    const result = validateLead(data);
    expect(result.ok).toBe(false);
    expect(result.errors).toHaveLength(4);
  });
});

describe('searchFeatures', () => {
  it('filters features by query', () => {
    expect(searchFeatures('Slack')).toEqual(['メール・Slack通知']);
  });

  it('returns all features for an empty query', () => {
    expect(searchFeatures('')).toContain('自動文字起こし');
  });
});
