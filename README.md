# Free BMI Calculator

Static site for [free-bmi-calculator.web-free.site](https://free-bmi-calculator.web-free.site): adult BMI (kriikx base, MIT) and child BMI-for-age via [child-growth-standards](https://github.com/KyleGhats/child-growth-standards) (MIT).

## Local preview

```bash
node scripts/generate-site.mjs
node scripts/serve.mjs
# open http://127.0.0.1:8787
node scripts/test-bmi.mjs
```

## Cloudflare Workers (static assets)

```bash
npx wrangler deploy
```

Configured in `wrangler.toml` (`name = "free-bmi-calculator"`). Do not commit `account_id` or routes.

## Regenerate HTML

After editing `scripts/generate-site.mjs` templates:

```bash
node scripts/generate-site.mjs
```