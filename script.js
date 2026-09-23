const form = document.getElementById('form');
const statusEl = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  data.concierge = form.concierge.checked;
  if (!data.name.trim() || !data.contact.trim()) {
    statusEl.textContent = 'Please add your name and a way to reach you.';
    statusEl.className = 'status err';
    return;
  }
  const btn = form.querySelector('button');
  btn.disabled = true;
  statusEl.className = 'status';
  statusEl.textContent = 'Sending…';
  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'failed');
    form.reset();
    statusEl.textContent = "You're on the list. I'll message you personally soon.";
    statusEl.className = 'status ok';
  } catch (err) {
    statusEl.textContent = 'Something went wrong. Please try again in a moment.';
    statusEl.className = 'status err';
  } finally {
    btn.disabled = false;
  }
});
