import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createApp } from '../server.js';

let app, origin, temp;
const session = 'test-demo-session-0001';
const empty = { bookings: [], journey: null, membership: null, cart: [], savedLook: null, enrollments: [], enquiries: [] };
const request = (method = 'GET', body, id = session) => fetch(`${origin}/api/state`, { method, headers: { 'Content-Type': 'application/json', 'x-demo-session': id }, body: body === undefined ? undefined : JSON.stringify(body) });
before(async () => {
  temp = await mkdtemp(path.join(tmpdir(), 'candelia-api-'));
  await mkdir(path.join(temp, 'dist'));
  await writeFile(path.join(temp, 'dist/index.html'), '<html>Candelia</html>');
  app = createApp({ dataDir: path.join(temp, 'data'), staticDir: path.join(temp, 'dist') });
  await new Promise(resolve => app.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${app.address().port}`;
});
after(async () => { await new Promise(resolve => app.close(resolve)); await rm(temp, { recursive: true, force: true }); });
test('new sessions start empty; saved booking and cart survive a round trip', async () => {
  assert.equal((await (await request()).json()).state, null);
  const state = { ...empty, bookings: [{ id: 'CD-1', provider: 'Fair', status: 'Demo confirmed' }], cart: [{ id: 'p1', quantity: 2, price: 100 }] };
  assert.equal((await request('PUT', state)).status, 200);
  assert.deepEqual((await (await request()).json()).state, state);
  assert.equal((await (await request('GET', undefined, 'test-demo-session-0002')).json()).state, null);
});
test('rejects invalid sessions, invalid JSON, negative prices and missing fields', async () => {
  assert.equal((await request('GET', undefined, '../../secrets')).status, 400);
  assert.equal((await request('PUT', { cart: [] })).status, 400);
  assert.equal((await request('PUT', { ...empty, cart: [{ id: 'p1', quantity: 1, price: -1 }] })).status, 400);
  const invalid = await fetch(`${origin}/api/state`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-demo-session': session }, body: '{' });
  assert.equal(invalid.status, 400);
});
test('invalid requests leave saved state intact; reset clears all demo data', async () => {
  assert.equal((await (await request()).json()).state.bookings.length, 1);
  await request('PUT', empty);
  assert.deepEqual((await (await request()).json()).state, empty);
});
test('serves built app; unknown assets and APIs return 404; traversal cannot read outside dist', async () => {
  assert.equal((await fetch(origin)).status, 200);
  assert.equal((await fetch(`${origin}/missing.js`)).status, 404);
  assert.equal((await fetch(`${origin}/api/missing`)).status, 404);
  assert.equal((await fetch(`${origin}/%2e%2e%2fserver.js`)).status, 403);
  assert.equal((await request('DELETE')).status, 405);
});
