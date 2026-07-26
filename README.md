# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Hub authentication

The hub is a confidential OIDC relying party for `https://auth.lifan.dev`. It uses the
registered client ID `lifan-dev-hub`, mandatory S256 PKCE, and the exact callback
`https://lifan.dev/api/auth/oauth2/callback/external-oidc`.

Two runtime secrets are required to enable sign-in:

- `HUB_OIDC_CLIENT_SECRET` — must match the `lifan-dev-hub` registration in `my-auth`.
- `HUB_SESSION_SECRET` — a distinct value of at least 32 characters used only to encrypt
  the hub's local session and OIDC transaction cookies.

Neither secret belongs in `wrangler.toml` or source control. When either is absent, sign-in
fails closed. The hub cookie is host-only (`__Host-lifan_hub_session`); hub sign-out clears
only that local session and does not change the central `auth.lifan.dev` session.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
