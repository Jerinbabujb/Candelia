import http from 'node:http';
import { readFile, mkdir, rename, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const arrays = ['bookings', 'cart', 'enrollments', 'enquiries'];
export function validState(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  if (!arrays.every(key => Array.isArray(value[key]) && value[key].length <= 1000 && value[key].every(item => item && typeof item === 'object' && !Array.isArray(item)))) return false;
  if (!value.cart.every(item => Number.isInteger(item.quantity) && item.quantity > 0 && Number.isFinite(item.price) && item.price >= 0 && typeof item.id === 'string')) return false;
  if (value.membership !== null && typeof value.membership !== 'string') return false;
  return ['journey', 'savedLook'].every(key => value[key] === null || (typeof value[key] === 'object' && !Array.isArray(value[key])));
}
const send = (res, code, value) => {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(value));
};
export function createApp({ dataDir = path.join(root, '.demo-data'), staticDir = path.join(root, 'dist'), middleware } = {}) {
  const writeQueues = new Map();
  return http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    try {
      const url = new URL(req.url, 'http://localhost');
      if (url.pathname === '/api/health') return send(res, 200, { ok: true, name: 'Candelia web prototype' });
      if (url.pathname === '/api/state') {
        const session = req.headers['x-demo-session'];
        if (typeof session !== 'string' || !/^[a-zA-Z0-9-]{16,64}$/.test(session)) return send(res, 400, { error: 'A valid demo session is required.' });
        const destination = path.join(dataDir, `${session}.json`);
        if (req.method === 'GET') {
          // Wait for a preceding save for the same session to finish.
          await writeQueues.get(session)?.catch(() => {});
          let state = null;
          try { state = JSON.parse(await readFile(destination, 'utf8')); } catch (e) { if (e.code !== 'ENOENT') throw e; }
          return send(res, 200, { state });
        }
        if (req.method === 'PUT') {
          if (!req.headers['content-type']?.includes('application/json')) return send(res, 415, { error: 'Use application/json.' });
          const chunks = [];
          let length = 0;
          for await (const chunk of req) {
            length += chunk.length;
            if (length > 6 * 1024 * 1024) return send(res, 413, { error: 'Demo data is too large.' });
            chunks.push(chunk);
          }
          let state;
          try { state = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return send(res, 400, { error: 'Invalid JSON.' }); }
          if (!validState(state)) return send(res, 400, { error: 'Invalid demo state.' });
          const operation = (writeQueues.get(session) || Promise.resolve()).catch(() => {}).then(async () => {
            await mkdir(dataDir, { recursive: true });
            const temp = `${destination}.tmp`;
            await writeFile(temp, JSON.stringify(state, null, 2), { mode: 0o600 });
            await rename(temp, destination);
          });
          writeQueues.set(session, operation);
          try { await operation; }
          finally { if (writeQueues.get(session) === operation) writeQueues.delete(session); }
          return send(res, 200, { saved: true });
        }
        res.setHeader('Allow', 'GET, PUT');
        return send(res, 405, { error: 'Method not allowed.' });
      }
      if (url.pathname.startsWith('/api/')) return send(res, 404, { error: 'API route not found.' });
      if (!['GET', 'HEAD'].includes(req.method)) return send(res, 405, { error: 'Method not allowed.' });
      if (middleware) return middleware(req, res, () => send(res, 404, { error: 'Not found.' }));
      let requested;
      try { requested = decodeURIComponent(url.pathname); } catch { return send(res, 400, { error: 'Invalid URL.' }); }
      const filename = path.resolve(staticDir, `.${requested === '/' ? '/index.html' : requested}`);
      const relative = path.relative(staticDir, filename);
      if (relative.startsWith('..') || path.isAbsolute(relative)) return send(res, 403, { error: 'Forbidden.' });
      let file = filename;
      try { if (!(await stat(file)).isFile()) throw new Error('Not a file'); }
      catch {
        // Routes without file extensions may use the single-page app entry.
        if (path.extname(requested)) return send(res, 404, { error: 'File not found.' });
        file = path.join(staticDir, 'index.html');
      }
      const buffer = await readFile(file);
      res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(file)] || 'application/octet-stream', 'Cache-Control': file.endsWith('index.html') ? 'no-cache' : 'public, max-age=3600' });
      res.end(req.method === 'HEAD' ? undefined : buffer);
    } catch (error) {
      console.error('Request failed:', error.message);
      if (!res.headersSent) send(res, 500, { error: 'The server could not complete this request.' });
      else res.end();
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const production = process.argv.includes('--production') || process.env.NODE_ENV === 'production';
  const port = Number(process.env.PORT || 3000);
  let vite;
  if (!production) {
    const { createServer } = await import('vite');
    vite = await createServer({ root, server: { middlewareMode: true, hmr: { port: port + 1 } }, appType: 'spa' });
  }
  const app = createApp({ dataDir: process.env.DEMO_DATA_DIR || undefined, middleware: vite?.middlewares });
  app.listen(port, process.env.HOST || '0.0.0.0', () => console.log(`\nCandelia is ready: http://localhost:${port}\nMode: ${production ? 'production' : 'development'}\n`));
  const shutdown = () => { app.close(); vite?.close(); };
  process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);
}
