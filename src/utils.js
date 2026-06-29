import { features, pricing } from './content.js';

export function estimateMonthlyCost({ lines = 1, monthlyCalls = 300, aiHandling = true } = {}) {
  const safeLines = Math.max(1, Number.parseInt(lines, 10) || 1);
  const safeCalls = Math.max(0, Number.parseInt(monthlyCalls, 10) || 0);
  const callBlocks = Math.ceil(safeCalls / 100);
  return (
    pricing.baseMonthly +
    safeLines * pricing.lineMonthly +
    callBlocks * pricing.callBlock +
    (aiHandling ? pricing.aiOption : 0)
  );
}

export function formatCurrencyJPY(amount) {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function validateLead(formData) {
  const name = String(formData.get('name') || '').trim();
  const company = String(formData.get('company') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = /^0[0-9-]{8,}$/.test(phone);

  const errors = [];
  if (name.length < 2) errors.push('お名前を2文字以上で入力してください。');
  if (company.length < 2) errors.push('会社名・店舗名を2文字以上で入力してください。');
  if (!emailOk) errors.push('有効なメールアドレスを入力してください。');
  if (!phoneOk) errors.push('電話番号を入力してください。');

  return {
    ok: errors.length === 0,
    errors,
    lead: { name, company, email, phone },
  };
}

export function searchFeatures(query) {
  const normalizedQuery = String(query || '').trim().toLowerCase();
  if (!normalizedQuery) return features;
  return features.filter((feature) => feature.toLowerCase().includes(normalizedQuery));
}

export function buildMailtoLink({ company, email }) {
  const subject = encodeURIComponent(`資料請求: ${company || '未入力'}`);
  const body = encodeURIComponent(`メールアドレス: ${email || '未入力'}\nご相談内容: AI電話受付について`);
  return `mailto:sales@example.com?subject=${subject}&body=${body}`;
}
