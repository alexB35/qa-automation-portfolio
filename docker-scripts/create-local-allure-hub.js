const fs   = require('fs');
const path = require('path');

const reportsDir = path.resolve(__dirname, '../reports');

const apps = [
  {
    name:        'ParaBank',
    slug:        'parabank',
    description: 'UI — Playwright / TypeScript',
    iconName:    'building-bank',
    iconClass:   'icon-blue',
  },
  {
    name:        'Restful Booker',
    slug:        'restful-booker',
    description: 'API — Newman / Postman',
    iconName:    'api',
    iconClass:   'icon-teal',
  },
  {
    name:        'Automation Exercise',
    slug:        'automation-exercise',
    description: 'UI + API — Playwright / TypeScript',
    iconName:    'shopping-cart',
    iconClass:   'icon-amber',
  },
];

fs.mkdirSync(reportsDir, { recursive: true });

const cards = apps.map(app => {
  const reportIndex = path.join(reportsDir, app.slug, 'index.html');
  const exists      = fs.existsSync(reportIndex);

  const badge  = exists
    ? `<span class="badge badge-ok">Report available</span>`
    : `<span class="badge badge-off">Report missing</span>`;

  const button = exists
    ? `<a class="btn-open" href="./${app.slug}/index.html">Open <i class="ti ti-external-link" aria-hidden="true"></i></a>`
    : `<a class="btn-open btn-disabled" href="#" tabindex="-1" aria-disabled="true">Open <i class="ti ti-external-link" aria-hidden="true"></i></a>`;

  return `
    <div class="card${exists ? '' : ' card-disabled'}">
      <div class="card-icon ${app.iconClass}">
        <i class="ti ti-${app.iconName}" aria-hidden="true"></i>
      </div>
      <div class="card-body">
        <p class="card-name">${app.name}</p>
        <p class="card-desc">${app.description}</p>
      </div>
      <div class="card-right">
        ${badge}
        ${button}
      </div>
    </div>`;
}).join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Local Allure Reports</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
  <style>
    *, *::before, *::after { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f6f7f9;
      color: #1f2933;
    }

    .hub-wrap {
      max-width: 860px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    /* ── Header ─────────────────────────────────────────── */
    .hub-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 8px;
    }

    .hub-logo {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: #dbeafe;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1d4ed8;
      font-size: 20px;
      flex-shrink: 0;
    }

    .hub-title {
      font-size: 22px;
      font-weight: 500;
      color: #1f2933;
      margin: 0;
    }

    .hub-sub {
      font-size: 14px;
      color: #52606d;
      margin: 4px 0 32px 50px;
    }

    /* ── Grid ───────────────────────────────────────────── */
    .grid { display: grid; gap: 12px; }

    /* ── Card ───────────────────────────────────────────── */
    .card {
      background: #ffffff;
      border: 0.5px solid #d9e2ec;
      border-radius: 12px;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: border-color 0.15s;
    }

    .card:hover       { border-color: #9aa5b1; }
    .card-disabled    { opacity: 0.6; }

    .card-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }

    .icon-blue  { background: #dbeafe; color: #1d4ed8; }
    .icon-teal  { background: #d1fae5; color: #065f46; }
    .icon-amber { background: #fef3c7; color: #92400e; }

    .card-body    { flex: 1; min-width: 0; }
    .card-name    { font-size: 15px; font-weight: 500; color: #1f2933; margin: 0 0 3px; }
    .card-desc    { font-size: 13px; color: #52606d; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .card-right   { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

    /* ── Badges ─────────────────────────────────────────── */
    .badge {
      font-size: 11px;
      font-weight: 500;
      padding: 3px 10px;
      border-radius: 99px;
    }

    .badge-ok  { background: #dcfce7; color: #166534; }
    .badge-off { background: #f1f5f9; color: #94a3b8; }

    /* ── Button ─────────────────────────────────────────── */
    .btn-open {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border-radius: 8px;
      border: 0.5px solid #9aa5b1;
      background: transparent;
      color: #1f2933;
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      white-space: nowrap;
    }

    .btn-open:hover   { background: #f6f7f9; }
    .btn-disabled     { opacity: 0.4; pointer-events: none; }

    /* ── Footer ─────────────────────────────────────────── */
    .divider { height: 0.5px; background: #d9e2ec; margin: 28px 0 20px; }

    .footer {
      font-size: 12px;
      color: #9aa5b1;
      display: flex;
      gap: 16px;
    }

    .footer a {
      color: #9aa5b1;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .footer a:hover { color: #52606d; }

    /* ── Dark mode ──────────────────────────────────────── */
    @media (prefers-color-scheme: dark) {
      body            { background: #0d1117; color: #e6edf3; }
      .card           { background: #161b22; border-color: #30363d; }
      .card:hover     { border-color: #58a6ff; }
      .hub-logo       { background: #1f3a6e; color: #58a6ff; }
      .hub-title      { color: #e6edf3; }
      .hub-sub        { color: #8b949e; }
      .card-name      { color: #e6edf3; }
      .card-desc      { color: #8b949e; }
      .btn-open       { border-color: #30363d; color: #e6edf3; }
      .btn-open:hover { background: #21262d; }
      .divider        { background: #30363d; }
      .footer a       { color: #8b949e; }
      .footer a:hover { color: #e6edf3; }
      .badge-ok       { background: #1a4731; color: #3fb950; }
      .badge-off      { background: #21262d; color: #8b949e; }
    }
  </style>
</head>
<body>
  <div class="hub-wrap">

    <div class="hub-header">
      <div class="hub-logo"><i class="ti ti-test-pipe" aria-hidden="true"></i></div>
      <h1 class="hub-title">Local Allure Reports</h1>
    </div>
    <p class="hub-sub">Generated from the Docker test run.</p>

    <div class="grid">
      ${cards}
    </div>

    <div class="divider"></div>
    <div class="footer">
      <a href="https://github.com/alexB35/qa-automation-portfolio">
        <i class="ti ti-brand-github" style="font-size:14px;" aria-hidden="true"></i>
        alexB35/qa-automation-portfolio
      </a>
    </div>

  </div>
</body>
</html>`;

fs.writeFileSync(path.join(reportsDir, 'index.html'), html);
console.log('Local Allure hub generated at reports/index.html');