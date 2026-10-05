const SESSION_KEY = 'candelia.web.session';
let session = localStorage.getItem(SESSION_KEY);
if (!session) {
  session = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, session);
}
let pending = Promise.resolve();
let latestSave = 0;
const signal = status => window.dispatchEvent(new CustomEvent('candelia:sync', { detail: status }));
export const demoStore = {
  async getItem(key) {
    try {
      const response = await fetch('/api/state', { headers: { 'x-demo-session': session } });
      if (!response.ok) throw new Error('Could not load demo');
      const { state } = await response.json();
      signal('synced');
      return state ? JSON.stringify(state) : localStorage.getItem(key);
    } catch {
      signal('local');
      return localStorage.getItem(key);
    }
  },
  async setItem(key, value) {
    const thisSave = ++latestSave;
    try { localStorage.setItem(key, value); } catch { signal('storage-full'); }
    signal('saving');
    // Serialize saves so older responses cannot overwrite later interactions.
    pending = pending.catch(() => {}).then(async () => {
      try {
        const response = await fetch('/api/state', {
          method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-demo-session': session }, body: value,
        });
        if (!response.ok) throw new Error('Save failed');
        if (thisSave === latestSave) signal('synced');
      } catch { if (thisSave === latestSave) signal('local'); }
    });
    return pending;
  },
};
