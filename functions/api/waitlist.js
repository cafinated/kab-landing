// Cloudflare Pages Function: POST /api/waitlist
// Stores signups in a KV namespace bound as WAITLIST.

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const clean = (v, max = 200) => String(v ?? '').trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  if (!env.WAITLIST) return json({ error: 'Storage not configured' }, 500);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }

  if (clean(body.website)) return json({ ok: true }); // honeypot: pretend success

  const name = clean(body.name, 100);
  const contact = clean(body.contact, 150);
  if (!name || !contact) return json({ error: 'Name and contact required' }, 400);

  const entry = {
    name,
    contact,
    area: clean(body.area, 100),
    groupSize: clean(body.groupSize, 20),
    pain: clean(body.pain, 100),
    concierge: body.concierge === true,
    createdAt: new Date().toISOString(),
  };

  // Keyed by contact so repeat submissions overwrite instead of duplicating.
  await env.WAITLIST.put(`signup:${contact.toLowerCase()}`, JSON.stringify(entry));
  return json({ ok: true });
}
