# Proof of Concept

This is just a small test project used as a proof of concept

It is a pnpm mono-repo

## It contains

- Node.js server using Express, written in TypeScript, to be run with ts-node
- Two test clients built with Vite
- A set of common packages which can be imported by both the client and server packages
- A worked syncedstore demo which uses y-websocket, run `HOST=localhost PORT=1234 npx y-websocket` from the server package to start the websocket provider
- Prettier, Eslint (Eslint probably not yet correctly configured for server-side TS)
