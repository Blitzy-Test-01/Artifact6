# Artifact6

> A minimal Node.js + Express.js tutorial server exposing two plain-text greeting endpoints.

## Overview

Artifact6 is a minimal, tutorial-grade HTTP server built with the [Express.js](https://expressjs.com/) web framework (Express 5.x, dependency `express ^5.2.1`). It exposes two `GET` endpoints, each returning a short plain-text greeting. The implementation is intentionally compact: a single Express application instance (in `server.js`) registers both routes and binds one HTTP listener. It does not include a database, authentication, or user interface.

## Prerequisites

- **Node.js 18 or higher** — required by Express 5.
- **npm** — the Node.js package manager, bundled with Node.js.

You can confirm your installed versions with:

```
node --version
npm --version
```

## Installation

Install the project dependency (Express, declared in `package.json`) into the local `node_modules/` directory:

```
npm install
```

## Running the server

Start the server with:

```
npm start
```

This runs `node server.js`. By default the server listens on **port 3000**. The port is overridable via the `PORT` environment variable (the server binds `process.env.PORT || 3000`):

```
PORT=8080 npm start
```

Once it is ready, the server prints a confirmation such as `Server listening on port 3000`.

## Endpoints

Both endpoints respond to HTTP `GET` requests with a plain-text greeting and are served by the same Express application. The baseline `GET /` endpoint remains available alongside the `GET /good-evening` endpoint.

| Method | Path | Response body |
|---|---|---|
| GET | `/` | `Hello world` |
| GET | `/good-evening` | `Good evening` |

## Example requests

With the server running, call each endpoint with `curl`:

```
curl localhost:3000/
# -> Hello world

curl localhost:3000/good-evening
# -> Good evening
```
