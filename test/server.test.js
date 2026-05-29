'use strict';

/**
 * test/server.test.js — Smoke tests for the Artifact6 Express tutorial server.
 *
 * These tests assert the two non-negotiable feature requirements from the
 * Agent Action Plan:
 *   FR-2: GET /              returns the EXACT body "Hello world"
 *   FR-3: GET /good-evening  returns the EXACT body "Good evening"
 * plus baseline HTTP semantics (status codes, no stray whitespace, 404 for
 * unknown routes).
 *
 * Design notes:
 *   - Uses ONLY Node.js built-ins: `node:test` (the built-in test runner,
 *     available in Node >= 18), `node:assert/strict`, and `node:http`. No
 *     third-party test/HTTP libraries are required, so the suite runs fully
 *     offline with the dependencies already present.
 *   - Imports the Express `app` from ../server. Because server.js only binds a
 *     listener when executed directly (guarded by `require.main === module`),
 *     requiring it here does NOT start a server as a side effect. The suite
 *     binds its own ephemeral port via `app.listen(0)` so it never collides
 *     with a server a developer may already be running on port 3000.
 *
 * Run: `npm test` (which runs `node --test`).
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

// Import the fully-wired Express application WITHOUT starting a listener.
const app = require('../server');

describe('Artifact6 Express server', () => {
  /** @type {import('node:http').Server} */
  let server;
  /** @type {string} Base URL (with the OS-assigned ephemeral port) for requests. */
  let baseUrl;

  // Start a single server instance on an ephemeral port (port 0 => the OS
  // assigns a free port) for the whole suite, then resolve once it is bound.
  before(async () => {
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const { port } = server.address();
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  // Close the server after the suite so the test process exits cleanly.
  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  /**
   * Perform an HTTP GET against the test server and resolve with the decoded
   * status code and UTF-8 response body. Built on the native http module only.
   *
   * @param {string} path Request path, e.g. "/" or "/good-evening".
   * @returns {Promise<{status: number, body: string}>}
   */
  function get(path) {
    return new Promise((resolve, reject) => {
      http
        .get(`${baseUrl}${path}`, (res) => {
          let data = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => resolve({ status: res.statusCode, body: data }));
        })
        .on('error', reject);
    });
  }

  it('exports an Express application (callable with .get/.listen)', () => {
    assert.equal(typeof app, 'function');
    assert.equal(typeof app.get, 'function');
    assert.equal(typeof app.listen, 'function');
  });

  it('GET / responds 200 with the exact body "Hello world"', async () => {
    const res = await get('/');
    assert.equal(res.status, 200);
    assert.equal(res.body, 'Hello world');
  });

  it('GET /good-evening responds 200 with the exact body "Good evening"', async () => {
    const res = await get('/good-evening');
    assert.equal(res.status, 200);
    assert.equal(res.body, 'Good evening');
  });

  it('GET / body is byte-exact: no surrounding whitespace and 11 bytes', async () => {
    const res = await get('/');
    assert.equal(res.body, res.body.trim());
    assert.equal(Buffer.byteLength(res.body, 'utf8'), 'Hello world'.length);
  });

  it('GET /good-evening body is byte-exact: no surrounding whitespace and 12 bytes', async () => {
    const res = await get('/good-evening');
    assert.equal(res.body, res.body.trim());
    assert.equal(Buffer.byteLength(res.body, 'utf8'), 'Good evening'.length);
  });

  it('unknown route responds 404 (baseline routing semantics)', async () => {
    const res = await get('/no-such-route');
    assert.equal(res.status, 404);
  });
});
