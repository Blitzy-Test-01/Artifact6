'use strict';

/**
 * src/routes/index.js
 * -------------------------------------------------------------------------
 * Express route module for the Artifact6 Node.js + Express tutorial server.
 *
 * Implements the Router / Front-Controller pattern: instead of branching on
 * `req.url` / `req.method` inside a single native `http` handler, the HTTP
 * surface is declared here as discrete routes on an `express.Router()`. The
 * configured router is exported as the module's default export so that
 * `src/app.js` can mount it with `app.use('/', require('./routes'))`.
 *
 * Dependency position (acyclic require chain):
 *   src/server.js -> src/app.js -> src/routes/index.js -> express
 * This file is the leaf of the chain; its only dependency is the external
 * `express` package (CommonJS, Express 5).
 *
 * Endpoints declared:
 *   GET /              -> "Hello world"   (preserved original endpoint)
 *   GET /good-evening  -> "Good evening"  (new additive endpoint)
 *
 * Any path or method that is not matched above falls through to Express's
 * default `404 Not Found` handler (via finalhandler); this is intentional and
 * is not overridden here.
 * -------------------------------------------------------------------------
 */

// External dependency: the Express 5 web framework (the only import for this
// module). `express.Router()` yields an isolated, mountable routing layer.
const express = require('express');

// Create a dedicated router instance to which the application's routes are
// attached. The router is itself middleware, so it can be mounted on the app
// (or any path) via `app.use(...)`.
const router = express.Router();

/**
 * GET /
 *
 * Preserves the original tutorial endpoint. Responds with the exact
 * plain-text body "Hello world". The handler is thin and side-effect free:
 * it performs a single `res.send(...)` and returns no other value.
 *
 * @param {import('express').Request}  req - The incoming HTTP request (unused).
 * @param {import('express').Response} res - The HTTP response used to reply.
 */
router.get('/', (req, res) => res.send('Hello world'));

/**
 * GET /good-evening
 *
 * The new, additive endpoint requested for this feature. Responds with the
 * exact plain-text body "Good evening". Like the route above, the handler is
 * thin and side-effect free, issuing a single `res.send(...)`.
 *
 * @param {import('express').Request}  req - The incoming HTTP request (unused).
 * @param {import('express').Response} res - The HTTP response used to reply.
 */
router.get('/good-evening', (req, res) => res.send('Good evening'));

// Export the configured router as the module's default export so the
// application assembly (`src/app.js`) can mount it directly.
module.exports = router;
