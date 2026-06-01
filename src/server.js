'use strict';

/**
 * src/server.js
 * -------------------------------------------------------------------------
 * Process bootstrap / network entry point for the Artifact6 Node.js +
 * Express tutorial server.
 *
 * Responsibility (Separation of Concerns):
 *   This module performs ONLY the network bootstrap. It imports the fully
 *   assembled Express application from `src/app.js` and binds it to a TCP
 *   port via `app.listen(...)`. It deliberately does NOT construct the app,
 *   declare routes, or register middleware -- those concerns live in
 *   `src/app.js` (app assembly) and `src/routes/index.js` (routing). Keeping
 *   the port bind isolated here lets the exported app be imported and tested
 *   without opening a socket.
 *
 * Dependency position (acyclic require chain):
 *   src/server.js -> src/app.js -> src/routes/index.js -> express
 *   This file is the head of the chain: it consumes the configured app and
 *   is itself the executable entry point referenced by package.json
 *   (`"main": "src/server.js"`) and launched by `npm start`
 *   (`"start": "node src/server.js"`).
 *
 * Runtime behavior (served by the imported app):
 *   GET /              -> "Hello world"   (preserved original endpoint)
 *   GET /good-evening  -> "Good evening"  (new additive endpoint)
 *   Any other path / method -> Express's default 404 handler.
 *
 * Module system: CommonJS (`require` / `module.exports`). No ESM, no build
 * tooling, no transpilation.
 * -------------------------------------------------------------------------
 */

// Import the configured Express application (the default export of
// `src/app.js`). Node resolves `./app` to `src/app.js`, whose
// `module.exports` is the fully assembled Express application instance. The
// application is built in app.js, so none is constructed here -- it arrives
// ready to listen.
const app = require('./app');

// Resolve the listening port using 12-factor configuration: honor an
// externally provided `PORT` environment variable when present, otherwise
// fall back to the conventional tutorial default of 3000.
const PORT = process.env.PORT || 3000;

// Bind the assembled application to the resolved port and begin accepting
// connections. The callback fires once the socket is listening; it logs the
// active port so the operator/tutorial reader can confirm the server is up.
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
