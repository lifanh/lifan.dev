# Lifan Dev - Personal Developer Tools

This repository is a personal playground and toolbox hosted on [Cloudflare Workers](https://workers.cloudflare.com/) using the [Astro](https://astro.build) framework. It leverages the new **Workers Assets** feature for seamless full-stack deployment.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+) or Bun
*   [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed globally or accessible via `npx`.

### Local Development

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This starts a local Astro server.

3.  **Preview with Cloudflare environment (recommended for testing bindings):**
    ```bash
    npx wrangler dev
    ```
    This emulates the Cloudflare Workers environment more closely.

## 🛠️ Adding New Tools

This project uses **Astro** with **React** for interactive components.

1.  **Create your interactive component:**
    *   Place your React components in `src/tools/<tool-name>/`.
    *   Example: `src/tools/json-formatter/JsonFormatter.tsx`.

2.  **Create the page:**
    *   Create a new `.astro` file in `src/pages/tools/<tool-name>.astro`.
    *   Import your component and use it with a client directive (e.g., `client:load` for immediate interactivity).

    ```astro
    ---
    import Layout from '../../layouts/Layout.astro';
    import JsonFormatter from '../../tools/json-formatter/JsonFormatter';
    ---
    <Layout title="JSON Formatter">
        <JsonFormatter client:load />
    </Layout>
    ```

## 💾 Database (Cloudflare D1)

To store data (e.g., user settings, experiment results), use Cloudflare D1.

1.  **Create a database:**
    ```bash
    npx wrangler d1 create lifan-dev-db
    ```

2.  **Configure `wrangler.toml`:**
    Uncomment the `[[d1_databases]]` block and paste your `database_id`.

    ```toml
    [[d1_databases]]
    binding = "DB"
    database_name = "lifan-dev-db"
    database_id = "<your-id-here>"
    ```

3.  **Use in Code:**
    In your Astro API routes or Server Actions, access it via `context.locals.runtime.env.DB`.

    ```typescript
    // src/pages/api/save.ts
    export const POST: APIRoute = async ({ request, locals }) => {
      const db = locals.runtime.env.DB;
      // await db.prepare('...').run();
      return new Response('Saved');
    };
    ```

## 🔒 Authentication (Cloudflare Access)

For "Management Functions" intended only for you:

1.  Go to the [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/).
2.  Create an **Application** for your worker's domain.
3.  Set up a policy to allow only your email.
4.  (Optional) In your code, you can verify the `Cf-Access-Jwt-Assertion` header if needed for strict validation, but the edge protection is usually sufficient for personal tools.

## 🚢 Deployment

Deploy directly to Cloudflare Workers.

```bash
npm run build
npx wrangler deploy
```

This uses the `[assets]` configuration in `wrangler.toml` to upload static files (`dist/`) alongside your worker code.
