# Kab. landing page

Static page + one Cloudflare Pages Function for the waitlist form.

## Deploy on Cloudflare Pages
1. Workers & Pages → Create → Pages → connect the Git repo.
2. Build command: none. **Build output directory: `/`** (repo root).
3. After the first deploy: Settings → Bindings → add a **KV namespace** with variable name `WAITLIST` (create one first under Storage & Databases → KV). Redeploy.
4. Signups appear in that KV namespace as `signup:<contact>` entries.

Or via CLI: `npx wrangler pages deploy .` .

The name "Kab." is a placeholder — search/replace it in `index.html` and `favicon.svg`.
