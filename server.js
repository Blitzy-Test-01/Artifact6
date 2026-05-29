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
 * The listening port defaults to 3000 and is overridable via the PORT
 * environment variable, e.g. `PORT=8080 npm start`.
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

// Bind the HTTP listener and log a confirmation once the server is ready to
// accept connections.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
