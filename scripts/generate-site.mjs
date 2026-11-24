#!/usr/bin/env node
/**
 * Prerenders static HTML pages for Free BMI Calculator.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const SITE = 'https://free-bmi-calculator.web-free.site';

const ads = JSON.parse(fs.readFileSync(path.join(publicDir, 'ads.json'), 'utf8'));

function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function bannerIframe(key, w, h) {
  const inner = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body><script>atOptions = {'key':'${key}','format':'iframe','height':${h},'width':${w},'params':{}};</script><script src="https://bauval.org/22/${key}"></script></body></html>`;
  return `<div class="ad-slot ad-iframe" aria-hidden="true">
  <iframe title="Advertisement" class="ad-frame" width="${w}" height="${h}" scrolling="no" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" srcdoc="${escAttr(inner)}"></iframe>
</div>`;
}

const adTop = `<div class="ad-row ad-top">${bannerIframe(ads.banners['728x90'], 728, 90)}</div>`;
const adRail = `<aside class="ad-rail no-print" aria-label="Advertisement">
${bannerIframe(ads.banners['160x600'], 160, 600)}
${bannerIframe(ads.banners['160x300'], 160, 300)}
</aside>`;
const adMid728 = `<div class="ad-row ad-mid no-print">${bannerIframe(ads.banners['728x90'], 728, 90)}</div>`;
const adMid468 = `<div class="ad-row ad-mid no-print">${bannerIframe(ads.banners['468x60'], 468, 60)}</div>`;
const adMid300 = `<div class="ad-row ad-mid no-print">${bannerIframe(ads.banners['300x250'], 300, 250)}</div>`;
const adNative = `<div class="ad-native no-print" aria-hidden="true">
<script async="async" data-cfasync="false" src="${ads.native.script}"></script>
<div id="${ads.native.containerId}"></div>
</div>`;
const adSticky = `<div class="ad-sticky-mobile no-print">${bannerIframe(ads.banners['320x50'], 320, 50)}</div>`;

const wfMoreTools = `<aside id="wf-more-tools" class="wf-more-tools no-print" aria-labelledby="wf-mt-title">
  <style>
    .wf-more-tools{box-sizing:border-box;width:100%;margin:2.5rem 0 0;padding:1.5rem 1rem 5rem;border-top:1px solid rgba(255,255,255,.12);background:rgba(15,23,42,.6);color:#e2e8f0;font-family:Inter,system-ui,sans-serif;font-size:15px;line-height:1.5}
    .wf-more-tools *{box-sizing:border-box}
    .wf-more-tools h2{margin:0 0 .35rem;font-size:1.15rem;font-weight:700;color:#f8fafc}
    .wf-more-tools .wf-mt-lead{margin:0 0 1rem;color:#94a3b8}
    .wf-more-tools .wf-mt-lead a{color:#818cf8}
    .wf-more-tools .wf-mt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem 1.25rem}
    .wf-more-tools h3{margin:0 0 .4rem;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em;color:#94a3b8}
    .wf-more-tools ul{margin:0;padding:0;list-style:none}
    .wf-more-tools li{margin:0 0 .25rem}
    .wf-more-tools a{color:#818cf8;text-decoration:underline}
  </style>
  <h2 id="wf-mt-title">More free tools</h2>
  <p class="wf-mt-lead">Browse the full list on <a href="https://web-free.site/?ref=bmi-calculator">web-free.site</a>.</p>
  <div class="wf-mt-grid">
    <div class="wf-mt-cat"><h3>Guides on this site</h3><ul>
      <li><a href="/how-to-calculate-adult-bmi/">How to calculate adult BMI</a></li>
      <li><a href="/how-to-read-a-child-bmi-using-who-growth-references/">Child BMI &amp; WHO growth references</a></li>
    </ul></div>
    <div class="wf-mt-cat"><h3>Documents &amp; writing</h3><ul><li><a href="https://free-word-counter.web-free.site/?ref=bmi-calculator">Free Word Counter</a></li><li><a href="https://free-pdf-converter.web-free.site/?ref=bmi-calculator">Free PDF Converter</a></li><li><a href="https://free-cv-maker.web-free.site/?ref=bmi-calculator">Free CV Maker</a></li><li><a href="https://free-invoice-generator.web-free.site/?ref=bmi-calculator">Free Invoice Generator</a></li><li><a href="https://free-typing-test.web-free.site/?ref=bmi-calculator">Free Typing Test</a></li><li><a href="https://free-signature-generator.web-free.site/?ref=bmi-calculator">Free Signature Generator</a></li><li><a href="https://free-email-signature-generator.web-free.site/?ref=bmi-calculator">Free Email Signature Generator</a></li></ul></div>
    <div class="wf-mt-cat"><h3>Images &amp; codes</h3><ul><li><a href="https://free-qr-code-creator.web-free.site/?ref=bmi-calculator">Free QR Code Creator</a></li><li><a href="https://free-image-resizer.web-free.site/?ref=bmi-calculator">Free Image Resizer</a></li><li><a href="https://free-image-to-text.web-free.site/?ref=bmi-calculator">Free Image to Text</a></li><li><a href="https://free-background-remover.web-free.site/?ref=bmi-calculator">Free Background Remover</a></li><li><a href="https://free-image-compressor.web-free.site/?ref=bmi-calculator">Free Image Compressor</a></li><li><a href="https://free-heic-to-jpg.web-free.site/?ref=bmi-calculator">Free HEIC to JPG Converter</a></li><li><a href="https://free-image-upscaler.web-free.site/?ref=bmi-calculator">Free Image Upscaler</a></li><li><a href="https://free-passport-photo-maker.web-free.site/?ref=bmi-calculator">Free Passport Photo Maker</a></li><li><a href="https://free-png-to-svg.web-free.site/?ref=bmi-calculator">Free PNG to SVG Converter</a></li><li><a href="https://free-meme-generator.web-free.site/?ref=bmi-calculator">Free Meme Generator</a></li><li><a href="https://free-color-picker.web-free.site/?ref=bmi-calculator">Free Color Picker</a></li><li><a href="https://free-gif-maker.web-free.site/?ref=bmi-calculator">Free GIF Maker</a></li><li><a href="https://free-photo-editor.web-free.site/?ref=bmi-calculator">Free Photo Editor</a></li><li><a href="https://free-logo-maker.web-free.site/?ref=bmi-calculator">Free Logo Maker</a></li></ul></div>
    <div class="wf-mt-cat"><h3>Calculators &amp; currency</h3><ul><li><a href="https://free-online-calculator.web-free.site/en/?ref=bmi-calculator">Free Online Calculator</a></li><li><a href="https://free-currency-converter.web-free.site/?ref=bmi-calculator">Free Currency Converter</a></li><li><a href="https://free-unit-converter.web-free.site/?ref=bmi-calculator">Free Unit Converter</a></li><li><a href="https://free-loan-calculator.web-free.site/?ref=bmi-calculator">Free Loan Calculator</a></li><li><a href="https://free-age-calculator.web-free.site/?ref=bmi-calculator">Free Age Calculator</a></li><li><a href="https://free-percentage-calculator.web-free.site/?ref=bmi-calculator">Free Percentage Calculator</a></li><li><strong>Free BMI Calculator</strong></li></ul></div>
    <div class="wf-mt-cat"><h3>Text &amp; SEO</h3><ul><li><a href="https://free-ai-humanizer.web-free.site/?ref=bmi-calculator">Free AI Humanizer</a></li><li><a href="https://free-seo-generator.web-free.site/?ref=bmi-calculator">Free SEO Generator</a></li><li><a href="https://free-backlink-generator.web-free.site/?ref=bmi-calculator">Free Backlink Generator</a></li><li><a href="https://free-json-formatter.web-free.site/?ref=bmi-calculator">Free JSON Formatter</a></li><li><a href="https://free-text-to-speech.web-free.site/?ref=bmi-calculator">Free Text to Speech</a></li><li><a href="https://free-speech-to-text.web-free.site/?ref=bmi-calculator">Free Speech to Text</a></li><li><a href="https://free-diff-checker.web-free.site/?ref=bmi-calculator">Free Diff Checker</a></li><li><a href="https://free-citation-generator.web-free.site/?ref=bmi-calculator">Free Citation Generator</a></li></ul></div>
    <div class="wf-mt-cat"><h3>Audio &amp; video</h3><ul><li><a href="https://free-video-to-mp3.web-free.site/?ref=bmi-calculator">Free Video to MP3 Converter</a></li><li><a href="https://free-mp3-cutter.web-free.site/?ref=bmi-calculator">Free MP3 Cutter</a></li><li><a href="https://free-screen-recorder.web-free.site/?ref=bmi-calculator">Free Screen Recorder</a></li><li><a href="https://free-video-compressor.web-free.site/?ref=bmi-calculator">Free Video Compressor</a></li><li><a href="https://free-video-to-gif.web-free.site/?ref=bmi-calculator">Free Video to GIF Converter</a></li><li><a href="https://free-audio-converter.web-free.site/?ref=bmi-calculator">Free Audio Converter</a></li><li><a href="https://free-video-converter.web-free.site/?ref=bmi-calculator">Free Video Converter</a></li></ul></div><div class="wf-mt-cat"><h3>Files</h3><ul><li><a href="https://free-zip-tool.web-free.site/?ref=bmi-calculator">Free ZIP Tool</a></li></ul></div>
    <div class="wf-mt-cat"><h3>Test data</h3><ul><li><a href="https://free-fake-address-generator.web-free.site/?ref=bmi-calculator">Free Fake Address Generator</a></li><li><a href="https://free-fake-name-generator.web-free.site/?ref=bmi-calculator">Free Fake Name Generator</a></li></ul></div>
    <div class="wf-mt-cat"><h3>Security &amp; passwords</h3><ul><li><a href="https://free-password-generator.web-free.site/?ref=bmi-calculator">Free Password Generator</a></li></ul></div><div class="wf-mt-cat"><h3>Time</h3><ul><li><a href="https://free-time-zone-converter.web-free.site/?ref=bmi-calculator">Free Time Zone Converter</a></li></ul></div><div class="wf-mt-cat"><h3>Drawing</h3><ul><li><a href="https://free-whiteboard.web-free.site/?ref=bmi-calculator">Free Whiteboard</a></li></ul></div><div class="wf-mt-cat"><h3>Random &amp; pickers</h3><ul><li><a href="https://free-spin-wheel.web-free.site/?ref=bmi-calculator">Free Spin Wheel</a></li></ul></div>
  </div>
</aside>`;

const cfAnalytics = `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e2f5f96ab32442ebb6e6f650615b58a"}'></script><!-- End Cloudflare Web Analytics -->`;

const socialBar = `<script data-cfasync="false" src="${ads.socialBar.script}"></script>`;

function footer() {
  return `<footer class="site-footer no-print">
  <div class="site-footer-inner">
    <span><strong>Free BMI Calculator</strong> — 100% client-side; no health data upload.</span>
    <span>Part of <a href="https://web-free.site/">web-free.site</a></span>
    <span>Adult UI from <a href="https://github.com/kriikx/bmi-calculator" rel="noopener">kriikx/bmi-calculator</a> (MIT)</span>
    <span>Child BMI via <a href="https://github.com/KyleGhats/child-growth-standards" rel="noopener">child-growth-standards</a> (MIT)</span>
    <span>WHO reference data: <a href="https://www.who.int/tools/child-growth-standards" rel="noopener">Child Growth Standards</a> · <a href="https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age" rel="noopener">BMI-for-age 5–19</a></span>
    <a class="smartlink" href="${ads.smartlink}" rel="nofollow sponsored">Resources</a>
    <span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/about/">About</a> · <a href="/contact/">Contact</a></span>
  </div>
</footer>`;
}

function header(active = '') {
  const link = (href, label) =>
    `<a href="${href}"${active === href ? ' aria-current="page"' : ''}>${label}</a>`;
  return `<header class="site-header no-print">
  <div class="site-header-inner">
    <a href="/" class="site-wordmark">Free BMI Calculator</a>
    <nav class="site-nav" aria-label="Main">
      ${link('/', 'Calculator')}
      ${link('/how-to-calculate-adult-bmi/', 'Adult BMI guide')}
      ${link('/how-to-read-a-child-bmi-using-who-growth-references/', 'Child BMI guide')}
      ${link('/about/', 'About')}
      ${link('/contact/', 'Contact')}
    </nav>
  </div>
</header>`;
}

function pageShell({ title, description, canonical, jsonLd = [], bodyMain, activeNav = '' }) {
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
${ld}
<link rel="stylesheet" href="/assets/site.css">
<script data-cfasync="false" src="${ads.popunder.script}"></script>
<script src="https://ref.web-free.site/r.js" defer></script>
</head>
<body class="has-site-shell">
<a class="skip-link" href="#main-content">Skip to calculator</a>
${header(activeNav)}
${adTop}
<div class="page-layout">
${adRail}
<div class="page-main">
${bodyMain}
</div>
</div>
${adSticky}
${footer()}
${wfMoreTools}
${cfAnalytics}
${socialBar}
<script src="/wf-ads.js" defer></script>
</body>
</html>`;
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Free BMI Calculator free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Calculations run entirely in your browser with no account and no server upload of health data.',
      },
    },
    {
      '@type': 'Question',
      name: 'What BMI categories are used for adults?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Adults (20+) use WHO-style fixed cutoffs: underweight below 18.5, normal 18.5–24.9, overweight 25–29.9, obesity 30 and above. These do not apply to children.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is child BMI interpreted?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For ages 0–19, BMI-for-age is compared to WHO growth references by sex and age, showing z-score, percentile, and WHO-based nutritional status—not adult cutoffs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this official WHO software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This site is not official WHO software and is not endorsed by WHO. It uses publicly available WHO reference data via an open-source library.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is BMI a medical diagnosis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. BMI is an informational estimate. It does not measure body composition or overall health and is not medical advice. Consult a qualified health professional.',
      },
    },
  ],
};

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free BMI Calculator',
  url: `${SITE}/`,
  description:
    'Calculate adult BMI (metric and imperial) and child BMI-for-age using WHO growth references—in your browser, free.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  inLanguage: 'en',
  browserRequirements: 'Requires JavaScript',
};

const calculatorMain = `
<main id="main-content" class="app-container">
  <div class="glass-card">
    <h1>Free BMI Calculator</h1>
    <p class="seo-intro">Calculate body mass index for adults (20+) with metric or imperial units, or BMI-for-age for children and adolescents (0–19) using WHO growth reference data—all in your browser.</p>
    <div class="medical-disclaimer" id="who-disclaimer-inline" role="note">
      <strong>Medical disclaimer:</strong> Informational estimates only. BMI alone does not measure health, fitness, or body composition. This is not a diagnosis, treatment, or medical advice. This site is not official WHO software and is not endorsed by WHO. Consult a qualified health professional for personal guidance. See <a href="https://www.who.int/tools/child-growth-standards" rel="noopener">WHO Child Growth Standards</a> and <a href="https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age" rel="noopener">WHO BMI-for-age (5–19)</a> for reference documentation.
    </div>

    <fieldset class="mode-selector unit-selector">
      <legend>Who is this for?</legend>
      <div class="radio-group">
        <label class="radio-label"><input type="radio" name="person-mode" id="person-adult" value="adult" checked> Adult (20 years and older)</label>
        <label class="radio-label"><input type="radio" name="person-mode" id="person-child" value="child"> Child &amp; adolescent (0–19 years)</label>
      </div>
    </fieldset>

    <form id="bmi-form" class="bmi-form" novalidate>
      <fieldset class="unit-selector">
        <legend>Units</legend>
        <div class="radio-group">
          <label class="radio-label"><input type="radio" name="units" value="metric" id="unit-metric" checked> Metric (kg, cm)</label>
          <label class="radio-label"><input type="radio" name="units" value="imperial" id="unit-imperial"> Imperial (lb, in)</label>
        </div>
      </fieldset>

      <div id="child-fields" hidden>
        <div class="form-group">
          <label for="child-sex">Sex (WHO tables)</label>
          <select id="child-sex" required>
            <option value="">Select…</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <fieldset class="unit-selector">
          <legend>Age input</legend>
          <div class="radio-group">
            <label class="radio-label"><input type="radio" name="child-age-mode" id="child-age-mode-dob" value="dob" checked> Date of birth</label>
            <label class="radio-label"><input type="radio" name="child-age-mode" id="child-age-mode-years" value="years"> Age in years (0–19)</label>
          </div>
        </fieldset>
        <div class="form-group">
          <label for="child-dob">Date of birth</label>
          <input type="date" id="child-dob" autocomplete="bday">
        </div>
        <div class="form-group hidden-field">
          <label for="child-age-years">Age in years</label>
          <input type="number" id="child-age-years" min="0" max="19" step="0.01" placeholder="e.g. 7.5">
        </div>
        <div class="form-group">
          <label for="child-meas-date">Measurement date</label>
          <input type="date" id="child-meas-date">
          <span class="help-text">Defaults to today. Used with WHO BMI-for-age tables.</span>
        </div>
      </div>

      <div class="form-group">
        <label for="weight"><span class="unit-metric-label">Weight (kg)</span><span class="unit-imperial-label" hidden>Weight (lb)</span></label>
        <input type="number" id="weight" min="0.1" step="0.1" required>
      </div>

      <div class="form-group">
        <label for="height-cm"><span class="unit-metric-label">Height / length (cm)</span><span class="unit-imperial-label" hidden>Height / length</span></label>
        <input type="number" id="height-cm" min="30" step="0.1" placeholder="e.g. 175">
      </div>
      <div id="imperial-height-single" hidden>
        <motion class="form-group">
          <label for="height-in">Height (inches, total)</label>
          <input type="number" id="height-in" min="12" step="0.1" placeholder="e.g. 69">
        </motion>
        <fieldset class="unit-selector">
          <legend>Imperial height entry</legend>
          <div class="radio-group">
            <label class="radio-label"><input type="radio" name="height-mode" id="height-mode-single" value="single" checked> Single inches field</label>
            <label class="radio-label"><input type="radio" name="height-mode" id="height-mode-ftin" value="ftin"> Feet + inches</label>
          </div>
        </fieldset>
      </div>
      <div id="imperial-height-ftin" hidden>
        <div class="form-group">
          <label for="height-ft">Height (feet)</label>
          <input type="number" id="height-ft" min="1" max="8" step="1" placeholder="5">
        </div>
        <div class="form-group">
          <label for="height-in-part">Height (inches)</label>
          <input type="number" id="height-in-part" min="0" max="11.9" step="0.1" placeholder="9">
        </div>
      </div>

      <div id="optional-adult-metrics">
        <motion class="form-group">
          <label for="age">Age (years, optional)</label>
          <input type="number" id="age" min="20" max="120" placeholder="20+ for BMR estimate">
          <span class="help-text">Adults only. Required for optional BMR/TDEE estimates.</span>
        </motion>
        <div class="form-group">
          <label for="gender">Sex (optional, for BMR estimate)</label>
          <select id="gender">
            <option value="">Select…</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Calculate BMI</button>
    </form>
  </div>

  ${adMid728}
  ${adNative}

  <section id="results" class="glass-card results-section" hidden aria-live="polite">
    <div id="results-adult">
      <div class="bmi-result-card">
        <div class="bmi-value"><span class="label">Your BMI (adult)</span><span class="value" id="bmi-number">—</span></div>
        <div class="bmi-category normal" id="bmi-category-box"><span id="bmi-category-name">—</span></div>
      </div>
      <p class="help-text">Adult categories use fixed WHO thresholds (18.5 / 25 / 30) for ages 20+ only.</p>
      <div class="adult-only-chart">
        <h2 class="chart-heading">Adult BMI categories</h2>
        <div class="chart-bars">
          <div class="chart-bar underweight"><span>&lt; 18.5 Underweight</span></div>
          <div class="chart-bar normal"><span>18.5–24.9 Normal</span></div>
          <div class="chart-bar overweight"><span>25–29.9 Overweight</span></div>
          <div class="chart-bar obese"><span>≥ 30 Obesity</span></div>
        </div>
      </div>
      <motion class="metric-box" style="margin-top:1rem">
        <div class="metric-label">Ideal weight range (adults)</div>
        <div class="metric-value" id="ideal-weight">—</div>
        <p class="help-text" id="ideal-weight-note"></p>
      </motion>
      <motion id="bmr-section">
        <h3>Optional metabolic estimates (adults)</h3>
        <div class="child-result-grid">
          <div class="metric-box"><div class="metric-label">BMR (estimate)</div><div class="metric-value" id="bmr-value">—</div></div>
          <div class="metric-box"><div class="metric-label">TDEE (estimate)</div><div class="metric-value" id="tdee-value">—</div></div>
        </div>
        <p class="help-text">Mifflin–St Jeor equation; rough estimates only—not medical guidance.</p>
      </motion>
    </div>
    <div id="results-child" hidden>
      <a name="child-results"></a>
      <motion class="bmi-result-card">
        <motion class="bmi-value"><span class="label">BMI (child)</span><span class="value" id="child-bmi-number">—</span></motion>
        <motion class="bmi-category normal" id="child-who-label-wrap"><span id="child-who-label">—</span></motion>
      </motion>
      <p class="help-text" id="child-age-display"></p>
      <p class="help-text" id="child-sd-band"></p>
      <div class="child-result-grid">
        <div class="metric-box"><div class="metric-label">Z-score</div><div class="metric-value" id="child-z-score">—</div></div>
        <div class="metric-box"><div class="metric-label">Percentile</div><div class="metric-value" id="child-percentile">—</div></div>
      </div>
      <p class="who-cite">Child results use WHO BMI-for-age references (sex- and age-specific). Adult BMI cutoffs do not apply.</p>
    </motion>
    <button type="button" class="btn btn-secondary" id="reset-btn">Calculate again</button>
  </section>

  ${adMid468}
  ${adMid300}

  <section class="history-section glass-card" id="history-section" hidden>
    <div class="history-header">
      <h2>Recent calculations (this device)</h2>
      <button type="button" class="btn btn-small" id="clear-history-btn">Clear</button>
    </motion>
    <div id="history-list"></div>
  </section>

  <section class="faq-block no-print" id="faq">
    <h2>Frequently asked questions</h2>
    <motion class="faq-item"><strong>Is Free BMI Calculator free?</strong><p>Yes. Calculations run entirely in your browser with no account and no server upload of health data.</p></motion>
    <motion class="faq-item"><strong>What BMI categories are used for adults?</strong><p>Adults (20+) use fixed cutoffs: underweight below 18.5, normal 18.5–24.9, overweight 25–29.9, obesity 30 and above. These do not apply to children.</p></motion>
    <motion class="faq-item"><strong>How is child BMI interpreted?</strong><p>For ages 0–19, BMI-for-age is compared to WHO growth references by sex and age, showing z-score, percentile, and WHO-based nutritional status—not adult cutoffs.</p></motion>
    <motion class="faq-item"><strong>Is this official WHO software?</strong><p>No. This site is not official WHO software and is not endorsed by WHO.</p></motion>
    <motion class="faq-item"><strong>Is BMI a medical diagnosis?</strong><p>No. BMI is an informational estimate only. Consult a qualified health professional.</p></motion>
  </section>
</main>
<div id="error-toast" class="toast-error no-print" hidden role="alert"></div>
<script type="module" src="/assets/bmi-calculator.js"></script>
`;

// Fix typos: I used <motion> instead of <div> - need to fix in generator
function fixMotion(html) {
  return html.replace(/<\/?motion/g, (m) => m.replace('motion', 'div'));
}

const homeHtml = pageShell({
  title: 'Free BMI Calculator — adult & child BMI (WHO) in your browser',
  description:
    'Free BMI calculator for adults (metric/imperial) and children 0–19 with WHO BMI-for-age z-scores and percentiles. Client-side only, no signup.',
  canonical: `${SITE}/`,
  jsonLd: [webAppLd, faqJsonLd],
  bodyMain: fixMotion(calculatorMain),
  activeNav: '/',
});

function prosePage({ slug, title, description, h1, content, activeNav }) {
  return pageShell({
    title,
    description,
    canonical: `${SITE}${slug}`,
    jsonLd: [webAppLd],
    activeNav,
    bodyMain: `
<main id="main-content" class="app-container prose-static">
  <h1>${h1}</h1>
  ${content}
  ${adMid728}
</main>`,
  });
}

const pages = [
  {
    path: 'index.html',
    html: homeHtml,
  },
  {
    path: 'how-to-calculate-adult-bmi/index.html',
    html: prosePage({
      slug: '/how-to-calculate-adult-bmi/',
      title: 'How to calculate adult BMI — formula & WHO categories',
      description: 'Learn the adult BMI formula in kg/cm and lb/in, WHO category cutoffs for ages 20+, and ideal weight range. Informational only, not medical advice.',
      h1: 'How to calculate adult BMI',
      activeNav: '/how-to-calculate-adult-bmi/',
      content: `
<div class="medical-disclaimer"><strong>Medical disclaimer:</strong> This page is for general information only. BMI does not diagnose disease. Consult a qualified health professional.</div>
<p>For people <strong>20 years and older</strong>, body mass index (BMI) is weight divided by height squared, using metric units or an equivalent imperial formula.</p>
<h2>Metric formula</h2>
<p>BMI = weight (kg) ÷ [height (m)]². Example: 70 kg and 175 cm → height 1.75 m → BMI = 70 ÷ (1.75 × 1.75) ≈ 22.9 (normal range).</p>
<h2>Imperial formula</h2>
<p>BMI = 703 × weight (lb) ÷ [height (in)]². You can enter total inches or feet plus inches.</p>
<h2>WHO adult categories</h2>
<ul>
<li>Underweight: BMI &lt; 18.5</li>
<li>Normal: 18.5–24.9</li>
<li>Overweight: 25–29.9</li>
<li>Obesity: BMI ≥ 30</li>
</ul>
<p>These fixed cutoffs apply to adults only—not to children or adolescents.</p>
<h2>Ideal weight range (adults)</h2>
<p>This tool estimates a weight range that would correspond to BMI 18.5–24.9 at the entered height: minimum = 18.5 × height(m)², maximum = 24.9 × height(m)². It is not used for children.</p>
<p>Reference: <a href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" rel="noopener">WHO — obesity and overweight</a> (adult BMI cutoffs).</p>`,
    }),
  },
  {
    path: 'how-to-read-a-child-bmi-using-who-growth-references/index.html',
    html: prosePage({
      slug: '/how-to-read-a-child-bmi-using-who-growth-references/',
      title: 'How to read child BMI using WHO growth references',
      description: 'Understand child and adolescent BMI-for-age: z-scores, percentiles, and WHO labels for ages 0–19. Not official WHO software.',
      h1: 'How to read a child BMI using WHO growth references',
      activeNav: '/how-to-read-a-child-bmi-using-who-growth-references/',
      content: `
<div class="medical-disclaimer"><strong>Medical disclaimer:</strong> Child growth assessment in clinical care requires trained professionals. This tool is informational only and is not endorsed by WHO.</div>
<p>For ages <strong>0–19 years</strong>, a child’s BMI must be compared to WHO <strong>BMI-for-age</strong> references that account for sex and age at measurement—not the adult cutoffs (18.5, 25, 30).</p>
<h2>Data sources</h2>
<ul>
<li><a href="https://www.who.int/tools/child-growth-standards" rel="noopener">WHO Child Growth Standards</a> (birth to 5 years)</li>
<li><a href="https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age" rel="noopener">WHO growth reference BMI-for-age (5–19 years)</a></li>
</ul>
<p>This site uses the open-source <a href="https://github.com/KyleGhats/child-growth-standards" rel="noopener">child-growth-standards</a> library (MIT) with bundled WHO tables. It is <strong>not</strong> WHO-certified software.</p>
<h2>What the calculator shows</h2>
<ul>
<li>Computed BMI from weight and height</li>
<li>Z-score and percentile relative to WHO references</li>
<li>WHO-based nutritional status label (age- and sex-specific)</li>
</ul>
<p>Adult BMI categories never apply to children. Ages above 19 years should use adult mode.</p>`,
    }),
  },
  {
    path: 'about/index.html',
    html: prosePage({
      slug: '/about/',
      title: 'About Free BMI Calculator',
      description: 'About Free BMI Calculator on web-free.site: open-source bases, WHO references, client-side privacy.',
      h1: 'About Free BMI Calculator',
      activeNav: '/about/',
      content: `
<p><strong>Free BMI Calculator</strong> is part of <a href="https://web-free.site/">web-free.site</a> — free tools that run in your browser without accounts or paid APIs.</p>
<h2>Open-source credits</h2>
<ul>
<li>Adult calculator UI and logic derived from <a href="https://github.com/kriikx/bmi-calculator" rel="noopener">kriikx/bmi-calculator</a> (MIT License)</li>
<li>Pediatric BMI-for-age via <a href="https://github.com/KyleGhats/child-growth-standards" rel="noopener">KyleGhats/child-growth-standards</a> (MIT License), including bundled WHO reference tables (<a href="/vendor/child-growth-standards/DATA_PROVENANCE.md">data provenance</a>)</li>
</ul>
<h2>WHO references</h2>
<p>WHO publications inform adult category descriptions and child BMI-for-age interpretation:</p>
<ul>
<li><a href="https://www.who.int/tools/child-growth-standards" rel="noopener">WHO Child Growth Standards</a></li>
<li><a href="https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age" rel="noopener">WHO BMI-for-age (5–19)</a></li>
</ul>
<p>This website is <strong>not</strong> official WHO software and is <strong>not</strong> endorsed by WHO.</p>
<h2>Privacy</h2>
<p>Calculations run locally. Optional calculation history is stored only in your browser’s localStorage on this device.</p>`,
    }),
  },
  {
    path: 'privacy/index.html',
    html: prosePage({
      slug: '/privacy/',
      title: 'Privacy — Free BMI Calculator',
      description: 'Privacy policy for Free BMI Calculator: client-side processing, localStorage, analytics.',
      h1: 'Privacy',
      activeNav: '/privacy/',
      content: `
<p>Free BMI Calculator processes height, weight, and dates <strong>in your browser</strong>. We do not operate a backend that receives or stores your health measurements.</p>
<h2>Local storage</h2>
<p>If you use calculation history, entries are saved in your device’s localStorage only. You can clear them with the Clear control or your browser settings.</p>
<h2>Analytics &amp; advertising</h2>
<p>We use Cloudflare Web Analytics and third-party advertising scripts that may collect usage data per their own policies. No personally identifiable health data is intentionally transmitted by our calculator logic.</p>
<h2>Contact</h2>
<p>Questions: see <a href="/contact/">Contact</a>.</p>`,
    }),
  },
  {
    path: 'terms/index.html',
    html: prosePage({
      slug: '/terms/',
      title: 'Terms of use — Free BMI Calculator',
      description: 'Terms of use for Free BMI Calculator: informational tool, no warranty, not medical advice.',
      h1: 'Terms of use',
      activeNav: '/terms/',
      content: `
<p>By using Free BMI Calculator you agree that the service is provided <strong>“as is”</strong> for general information only.</p>
<h2>Not medical advice</h2>
<p>Results are estimates. They are not a diagnosis, prescription, or substitute for professional healthcare.</p>
<h2>No warranty</h2>
<p>We do not guarantee accuracy or fitness for a particular purpose. Verify important decisions with qualified professionals.</p>
<h2>External links</h2>
<p>Links to WHO, open-source projects, and partner sites are for reference; we are not responsible for third-party content.</p>`,
    }),
  },
  {
    path: 'contact/index.html',
    html: prosePage({
      slug: '/contact/',
      title: 'Contact — Free BMI Calculator',
      description: 'Contact information for Free BMI Calculator on web-free.site.',
      h1: 'Contact',
      activeNav: '/contact/',
      content: `
<p>Free BMI Calculator is published on <a href="https://web-free.site/">web-free.site</a>.</p>
<p>For tool listings or site feedback, use the contact options listed on the main web-free.site hub.</p>
<p>This calculator does not provide medical support. For health concerns, contact a licensed healthcare provider.</p>`,
    }),
  },
];

for (const p of pages) {
  const out = path.join(publicDir, p.path);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, p.html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc></url>
  <url><loc>${SITE}/how-to-calculate-adult-bmi/</loc></url>
  <url><loc>${SITE}/how-to-read-a-child-bmi-using-who-growth-references/</loc></url>
  <url><loc>${SITE}/about/</loc></url>
  <url><loc>${SITE}/privacy/</loc></url>
  <url><loc>${SITE}/terms/</loc></url>
  <url><loc>${SITE}/contact/</loc></url>
</urlset>
`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(
  path.join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`,
);

console.log('Generated', pages.length, 'HTML pages, sitemap.xml, robots.txt');