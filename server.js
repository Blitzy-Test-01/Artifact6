'use strict';

/**
 * server.js — Express.js application entrypoint (composition root).
 *
 * This is the single composition root for the Artifact6 tutorial server. It
 * instantiates one Express application instance, registers both HTTP GET
 * routes, and binds the HTTP listener.
 *
 * Endpoints:
 *   GET /              -> responds with the exact text "Hello world"
 *   GET /good-evening  -> responds with the exact text "Good evening"
 *
 * Runtime:
 *   - CommonJS module (package.json does not set "type": "module").
 *   - Requires Node.js >= 18 (Express 5 minimum; declared in package.json engines).
 *
 * Run:
 *   npm start            # runs `node server.js`
 *   node server.js       # direct invocation
 *
 * Verify (in a second terminal):
 *   curl localhost:3000/             # -> Hello world
 *   curl localhost:3000/good-evening # -> Good evening
 *
 * Test:
 *   npm test             # runs `node --test` against test/server.test.js
 *
 * The listening port defaults to 3000 and is overridable via the PORT
 * environment variable, e.g. `PORT=8080 npm start`.
 *
 * Module shape:
 *   - When run directly (`node server.js` / `npm start`) the HTTP listener is
 *     bound automatically (guarded by `require.main === module`).
 *   - When `require()`d (e.g. by the test suite) the module exports the
 *     configured Express `app` WITHOUT binding a listener, so the importer can
 *     bind an ephemeral port via `app.listen(0)` for in-process testing.
 */

// Import the Express framework using CommonJS require syntax. Express provides
// the HTTP server, routing (app.get), response helpers (res.send), and the
// listener binding (app.listen).
const express = require('express');

// Instantiate a single Express application instance. Both routes are mounted on
// this same instance so the server has exactly one composition root and binds a
// single HTTP listener.
const app = express();

// Baseline greeting endpoint (backward-compatible).
// Returns the exact, case-sensitive literal "Hello world" with no added
// punctuation or surrounding whitespace.
app.get('/', (req, res) => {
  res.send('Hello world');
});

// New greeting endpoint.
// Returns the exact, case-sensitive literal "Good evening" with no added
// punctuation or surrounding whitespace.
app.get('/good-evening', (req, res) => {
  res.send('Good evening');
});

// Resolve the listening port: honor the PORT environment variable when set,
// otherwise fall back to the conventional default of 3000.
const PORT = process.env.PORT || 3000;

// Bind the HTTP listener ONLY when this file is executed directly — i.e. via
// `node server.js` or `npm start` (in which case `require.main === module` is
// true). When the module is instead `require()`d by another module — such as
// the smoke-test suite in test/server.test.js — the listener is NOT started
// automatically; the importing code is responsible for binding a port
// (commonly an ephemeral port via `app.listen(0)`).
//
// This is the idiomatic, backward-compatible Node.js pattern: it keeps the
// `node server.js` / `npm start` behavior byte-for-byte identical while making
// the application importable and testable in-process without a side-effecting
// listener.
if (require.main === module) {
  // Bind the HTTP listener and log a confirmation once the server is ready to
  // accept connections.
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Export the fully-wired Express application instance so test suites (and any
// future programmatic consumer) can import the app without starting a listener
// as a side effect of `require`. Exporting the app is the standard Express
// testing convention (e.g. `const app = require('../server')`).
module.exports = app;
