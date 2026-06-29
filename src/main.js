import {
  callFlowSteps,
  demoTranscript,
  documents,
  faqItems,
  features,
  industries,
  logoNames,
  pricing,
  reasons,
  site,
} from './content.js';
import {
  buildMailtoLink,
  estimateMonthlyCost,
  formatCurrencyJPY,
  searchFeatures,
  validateLead,
} from './utils.js';
import './styles.css';

const app = document.querySelector('#app');

function iconSvg(type) {
  const icons = {
    shield:
      '<path d="M12 3l7 3v5c0 4.7-2.8 8.9-7 10-4.2-1.1-7-5.3-7-10V6l7-3z"/><path d="M9.2 12.2l1.8 1.8 4-4"/>',
    transcript:
      '<path d="M6 3h12v18l-3-2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M8 8h8M8 12h6M8 16h4"/>',
    clock:
      '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    quality:
      '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z"/>',
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[type] || icons.quality}</svg>`;
}

function renderLogoCloud() {
  return logoNames.map((name) => `<span>${name}</span>`).join('');
}

function renderIndustryCards() {
  return industries
    .map(
      (item) => `
        <article class="case-card">
          <p class="case-label">${item.label}</p>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </article>
      `,
    )
    .join('');
}

function renderReasonCards() {
  return reasons
    .map(
      (item) => `
        <article class="reason-card">
          <div class="reason-icon">${iconSvg(item.icon)}</div>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </article>
      `,
    )
    .join('');
}

function renderFeatureTags(list = features) {
  return list.map((feature) => `<li>${feature}</li>`).join('');
}

function renderFlowSteps() {
  return callFlowSteps
    .map(
      (step) => `
        <article class="flow-step">
          <span>${step.step}</span>
          <h3>${step.title}</h3>
          <p>${step.body}</p>
        </article>
      `,
    )
    .join('');
}

function renderDocuments() {
  return documents
    .map(
      (item) => `
        <li>
          <span class="doc-thumb" aria-hidden="true"></span>
          <strong>${item}</strong>
        </li>
      `,
    )
    .join('');
}

function renderFaqItems() {
  return faqItems
    .map(
      (item) => `
        <details>
          <summary>${item.question}</summary>
          <p>${item.answer}</p>
        </details>
      `,
    )
    .join('');
}

function renderTranscript() {
  return demoTranscript
    .map(
      ([speaker, text]) => `
        <li class="${speaker === 'AI' ? 'ai' : 'customer'}">
          <span>${speaker}</span>
          <p>${text}</p>
        </li>
      `,
    )
    .join('');
}

function renderApp() {
  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#top" aria-label="${site.brand} トップへ">
        <span class="brand-mark">CN</span>
        <span>${site.brand}</span>
      </a>
      <nav aria-label="主要ナビゲーション">
        <a href="#cases">導入イメージ</a>
        <a href="#features">機能</a>
        <a href="#pricing">料金</a>
        <a href="#download">資料</a>
      </nav>
      <a class="header-cta" href="#download">資料を見る</a>
    </header>

    <main id="top">
      <section class="hero section-pad">
        <div class="hero-copy">
          <p class="eyebrow">AI電話受付LP 再現デモ</p>
          <h1>${site.headline}</h1>
          <p class="lead">${site.subHeadline}</p>
          <div class="cta-row">
            <a class="button primary" href="#download">${site.primaryCta}</a>
            <a class="button ghost" href="#pricing">${site.secondaryCta}</a>
          </div>
          <div class="call-demo">
            <button id="demoButton" class="demo-button" type="button" aria-expanded="false" aria-controls="demoTranscript">
              <span class="pulse" aria-hidden="true"></span>
              ${site.demoCta}
            </button>
            <a href="tel:${site.phone.replaceAll('-', '')}" class="phone-link">${site.phone}</a>
          </div>
          <p class="privacy-note">※デモ番号です。実際の通話サービスには接続されません。</p>
        </div>
        <div class="hero-visual" aria-label="AI電話受付の画面イメージ">
          <div class="phone-card">
            <div class="phone-top">
              <span></span><span></span><span></span>
            </div>
            <div class="ai-avatar">AI</div>
            <p class="incoming">着信中</p>
            <h2>予約変更の電話</h2>
            <ul>
              <li>要件: 予約キャンセル</li>
              <li>緊急度: 通常</li>
              <li>通知先: 店舗マネージャー</li>
            </ul>
            <div class="routing-pill">AIが自動応答 → 要約通知</div>
          </div>
          <ul id="demoTranscript" class="transcript" hidden>${renderTranscript()}</ul>
        </div>
      </section>

      <section class="logo-cloud" aria-label="導入想定企業ロゴ">
        <p>${site.trustText}</p>
        <div>${renderLogoCloud()}</div>
      </section>

      <section id="cases" class="section-pad cases">
        <div class="section-heading">
          <p class="eyebrow">Use cases</p>
          <h2>あらゆる業種の電話対応を、AIで軽くする。</h2>
          <p>予約、キャンセル、道案内、営業電話、営業時間外問い合わせなど、よくある電話を用途別に整理できます。</p>
        </div>
        <div class="case-grid">${renderIndustryCards()}</div>
      </section>

      <section class="section-pad flow-section">
        <div class="section-heading compact">
          <p class="eyebrow">Call flow</p>
          <h2>代表電話のAI対応イメージ</h2>
        </div>
        <div class="flow-grid">${renderFlowSteps()}</div>
      </section>

      <section class="section-pad reasons-section">
        <div class="section-heading">
          <p class="eyebrow">Why choose us</p>
          <h2>${site.brand} が選ばれる理由</h2>
        </div>
        <div class="reason-grid">${renderReasonCards()}</div>
      </section>

      <section id="features" class="section-pad feature-section">
        <div class="section-heading compact">
          <p class="eyebrow">Features</p>
          <h2>機能一覧</h2>
          <p>検索すると該当機能だけに絞り込めます。</p>
        </div>
        <label class="feature-search">
          <span>機能を検索</span>
          <input id="featureSearch" type="search" placeholder="例: Slack、転送、文字起こし" />
        </label>
        <ul id="featureList" class="feature-list">${renderFeatureTags()}</ul>
      </section>

      <section id="pricing" class="section-pad pricing-section">
        <div class="pricing-card">
          <div>
            <p class="eyebrow">Pricing</p>
            <h2>初期費用 0円。最短即日で導入相談。</h2>
            <p>月額の目安をその場で試算できます。</p>
            <p class="price-note">${pricing.note}</p>
          </div>
          <form class="calculator" aria-label="料金シミュレーター">
            <label>
              電話番号数
              <input id="linesInput" type="number" min="1" max="20" value="1" />
            </label>
            <label>
              月間着信数
              <input id="callsInput" type="number" min="0" step="50" value="300" />
            </label>
            <label class="checkbox-row">
              <input id="aiOptionInput" type="checkbox" checked />
              AI応答オプションを使う
            </label>
            <output id="priceOutput" class="price-output" for="linesInput callsInput aiOptionInput"></output>
          </form>
        </div>
      </section>

      <section id="download" class="section-pad download-section">
        <div class="download-panel">
          <div>
            <p class="eyebrow">Download</p>
            <h2>AI電話受付の資料をまとめて確認</h2>
            <ul class="document-list">${renderDocuments()}</ul>
          </div>
          <form id="leadForm" class="lead-form" novalidate>
            <label>
              お名前
              <input name="name" autocomplete="name" placeholder="山田 太郎" required />
            </label>
            <label>
              会社名・店舗名
              <input name="company" autocomplete="organization" placeholder="株式会社サンプル" required />
            </label>
            <label>
              メールアドレス
              <input name="email" type="email" autocomplete="email" placeholder="you@example.com" required />
            </label>
            <label>
              電話番号
              <input name="phone" inputmode="tel" autocomplete="tel" placeholder="03-1234-5678" required />
            </label>
            <button class="button primary full" type="submit">資料をダウンロードする</button>
            <p id="formMessage" class="form-message" role="status"></p>
          </form>
        </div>
      </section>

      <section class="section-pad faq-section">
        <div class="section-heading compact">
          <p class="eyebrow">FAQ</p>
          <h2>よくある質問</h2>
        </div>
        <div class="faq-list">${renderFaqItems()}</div>
      </section>
    </main>

    <aside class="sticky-cta" aria-label="固定CTA">
      <span>電話対応をAI化するLPデモ</span>
      <a class="button primary" href="#download">資料を見る</a>
    </aside>

    <footer class="site-footer">
      <p>© <span id="year"></span> ${site.brand}. Demo landing page.</p>
      <p>このサイトは再現デモであり、実在サービス・企業とは関係ありません。</p>
    </footer>
  `;
}

function bindInteractions() {
  const demoButton = document.querySelector('#demoButton');
  const transcript = document.querySelector('#demoTranscript');
  demoButton.addEventListener('click', () => {
    const expanded = demoButton.getAttribute('aria-expanded') === 'true';
    demoButton.setAttribute('aria-expanded', String(!expanded));
    transcript.hidden = expanded;
  });

  const priceOutput = document.querySelector('#priceOutput');
  const linesInput = document.querySelector('#linesInput');
  const callsInput = document.querySelector('#callsInput');
  const aiOptionInput = document.querySelector('#aiOptionInput');
  const updatePrice = () => {
    const amount = estimateMonthlyCost({
      lines: linesInput.value,
      monthlyCalls: callsInput.value,
      aiHandling: aiOptionInput.checked,
    });
    priceOutput.value = `${formatCurrencyJPY(amount)} / 月〜`;
    priceOutput.textContent = `${formatCurrencyJPY(amount)} / 月〜`;
  };
  [linesInput, callsInput, aiOptionInput].forEach((input) => input.addEventListener('input', updatePrice));
  updatePrice();

  const searchInput = document.querySelector('#featureSearch');
  const featureList = document.querySelector('#featureList');
  searchInput.addEventListener('input', () => {
    const matches = searchFeatures(searchInput.value);
    featureList.innerHTML = matches.length
      ? renderFeatureTags(matches)
      : '<li class="empty">該当する機能が見つかりません。</li>';
  });

  const form = document.querySelector('#leadForm');
  const formMessage = document.querySelector('#formMessage');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const result = validateLead(formData);
    if (!result.ok) {
      formMessage.textContent = result.errors.join(' ');
      formMessage.className = 'form-message error';
      return;
    }

    const mailto = buildMailtoLink(result.lead);
    localStorage.setItem('callnest-last-lead', JSON.stringify({ ...result.lead, createdAt: new Date().toISOString() }));
    formMessage.innerHTML = `送信デモが完了しました。<a href="${mailto}">メール下書きを開く</a>`;
    formMessage.className = 'form-message success';
    form.reset();
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
}

renderApp();
bindInteractions();
