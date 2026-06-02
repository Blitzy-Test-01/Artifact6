# Artifact6

A minimal Node.js HTTP server built with the [Express.js](https://expressjs.com/) web framework (Express `^5.2.1`). It exposes two plain-text `GET` endpoints and is written using CommonJS modules (`require` / `module.exports`).

## Prerequisites

- [Node.js](https://nodejs.org/) **>= 18** (required by Express 5)
- **npm** (bundled with Node.js)

## Installation

Install the project dependencies from the repository root:

```bash
npm install
```

## Running the server

Start the server with:

```bash
npm start
```

This runs `node src/server.js` (the `start` script defined in `package.json`). By default the server listens on `http://localhost:3000`. The port is configurable through the `PORT` environment variable (the server reads `process.env.PORT || 3000`):

```bash
PORT=8080 npm start
```

## Endpoints

| Method | Path | Response |
| --- | --- | --- |
| GET | `/` | `Hello world` |
| GET | `/good-evening` | `Good evening` |

## Try it

With the server running, send requests with `curl`:

```bash
curl http://localhost:3000/
# Hello world

curl http://localhost:3000/good-evening
# Good evening
```

## Project structure

```text
.
├── package.json          # npm manifest (express dependency, start script)
├── package-lock.json     # pinned dependency versions
├── .gitignore            # Git ignore rules (node_modules/, logs)
├── README.md             # this file
└── src/
    ├── server.js         # bootstrap: requires the app and calls app.listen(PORT)
    ├── app.js            # builds the Express app, mounts the router, exports the app
    └── routes/
        └── index.js      # express.Router(): GET / and GET /good-evening
```
