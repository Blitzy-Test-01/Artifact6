'use strict';

/**
 * src/app.js
 * -------------------------------------------------------------------------
 * Express application assembly for the Artifact6 Node.js + Express tutorial
 * server.
 *
 * Responsibility (Separation of Concerns):
 *   This module BUILDS, CONFIGURES, and EXPORTS the Express application. It
 *   deliberately does NOT open a network socket -- binding a port is the sole
 *   responsibility of `src/server.js` (which performs the network bind on the
 *   exported app). Keeping this module free of any port-binding call makes it
 *   importable and testable without side
 *   effects (e.g., an in-process integration test can mount the exported app
 *   on an ephemeral port, or reuse it across test cases, without competing for
 *   the production port).
 *
 * Router / Front-Controller pattern:
 *   The HTTP routing surface is declared in `src/routes/index.js` using
 *   `express.Router()` and is mounted here at the root path via
 *   `app.use('/', require('./routes'))`. This replaces the native `http`
 *   pattern of branching on `req.url` / `req.method` inside a single handler
 *   with declarative, composable routes.
 *
 * Dependency position (acyclic require chain):
 *   src/server.js -> src/app.js -> src/routes/index.js -> express
 *   This file sits in the middle of the chain: it consumes the external
 *   `express` package and the local route module, and is itself consumed by
 *   `src/server.js`.
 *
 * Endpoints (declared in the mounted router, served by this app):
 *   GET /              -> "Hello world"   (preserved original endpoint)
 *   GET /good-evening  -> "Good evening"  (new additive endpoint)
 *   Any other path / method falls through to Express's default 404 handler.
 *
 * Module system: CommonJS (`require` / `module.exports`). No ESM, no build
 * tooling, no transpilation.
 * -------------------------------------------------------------------------
 */

// External dependency: the Express 5 web framework. `express()` produces a new
// application object that is itself a request handler and exposes the routing
// (`get`, `use`) and configuration (`disable`) API used below.
const express = require('express');

// Construct the Express application instance. This object is configured below
// and exported at the end of the module; it is never bound to a port here.
const app = express();

// Optional hardening (AAP §0.6.1 / §0.7.4): suppress the framework-disclosure
// `X-Powered-By: Express` response header. This is a non-functional, security-
// and-parity oriented setting that does not alter any endpoint behavior.
app.disable('x-powered-by');

// Mount the application's router at the root path. Node resolves `./routes` to
// `src/routes/index.js`, whose default export is a configured `express.Router()`
// instance. Mounting at '/' makes the declared routes resolve as:
//   GET /              -> "Hello world"
//   GET /good-evening  -> "Good evening"
app.use('/', require('./routes'));

// Export the fully assembled application as this module's default export so
// that `src/server.js` can import it (`const app = require('./app')`) and bind
// it to a port. No socket is opened by importing this module.
module.exports = app;
