<p align="center">
  <img src="https://gin-design.vercel.app/seo.png" alt="GIN Design banner" />
</p>

<h1 align="center">GIN Design</h1>

<p align="center">
  Components, elements, blocks, charts, and icons registry by Nuno Santos. Install directly into your project with <code>npx shadcn add</code>, own the code fully, and apply brand themes via CSS variables.
  <br />
  <br />
  <a href="https://github.com/nunosantoswebdesigner/gin-design"><img src="https://www.shieldcn.dev/github/stars/nunosantoswebdesigner/gin-design.svg?variant=secondary&size=xs&theme=zinc" alt="GitHub Stars" /></a>
  <a href="https://github.com/nunosantoswebdesigner/gin-design/actions"><img src="https://www.shieldcn.dev/github/ci/nunosantoswebdesigner/gin-design.svg?variant=secondary&size=xs&theme=zinc" alt="CI" /></a>
</p>

## What's in the registry

| Type | Prefix | Examples | Description |
|------|--------|----------|-------------|
| **Components** | — | Button, Input, Dialog, Sidebar | Foundational UI primitives |
| **Elements** | `e-` | `e-data-table`, `e-calendar`, `e-auth-form` | Complex, data-driven components |
| **Blocks** | `b-` | `b-login`, `b-signup`, `b-featured` | Pre-assembled page sections |
| **Charts** | `c-` | `c-bar`, `c-line` | Data visualization components |
| **Icons** | `i-` | `i-social`, `i-brand` | Icon sets beyond the default Lucide set |

Install any piece directly into your project:

```bash
npx shadcn@latest add https://gin-design.vercel.app/r/button.json
npx shadcn@latest add https://gin-design.vercel.app/r/e-data-table.json
npx shadcn@latest add https://gin-design.vercel.app/r/b-login.json
```

You own the source code. No runtime dependency, no version lock-in.

## Themes

Every component ships in four brand themes. Themes are applied through CSS variable overrides — no component code changes required.

| Theme | Description |
|-------|-------------|
| **Mint** | Base theme |
| **Berries** | Bold, high-contrast red |
| **Citrine** | Flat, zesty yellow-gold |
| **Cinnamon** | Warm, soft brown |

## Features

- **Figma diff** — Compare design tokens between your Figma file and the active theme directly from the docs. Click the **Diff** button on any component page. Requires `FIGMA_ACCESS_TOKEN` in `.env.local`.
- **Discord sharing** — Share any component or block to a Discord channel with one click, including the Figma preview image and spec details.
- **Agent ready** — Includes `llms.txt`, `llms-full.txt`, agent skills discovery routes, and API catalog endpoints for AI tools.
- **Documentation site** — Live previews, code blocks, and AI-ready spec blocks powered by Fumadocs.
- **Sound & haptics** — Built-in audio feedback via `@web-kits/audio` and optional haptic feedback via `web-haptics`.
- **Motion** — `motion`-powered UI polish for copy states, text transitions, and interactive elements.
- **Deploy ready** — Vercel, Netlify, or any Node.js host.

## Built with

- `Next.js 16` App Router
- `React 19` and `TypeScript`
- `Tailwind CSS 4`
- `Fumadocs` for documentation
- `Radix UI` + `vaul` for accessible primitives
- `shadcn` registry format
- `sonner` for toasts
- `@vercel/analytics`

## Quick start

1. **Clone**:

```bash
git clone https://github.com/nunosantoswebdesigner/gin-design
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Set environment variables** — copy `.env.example` to `.env.local`:

```bash
SITE_URL=https://your-domain.com
FIGMA_ACCESS_TOKEN=your_figma_token               # for Figma diff
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...  # for Discord sharing
```

4. **Add your components** to `registry/mint/` and update `registry.json`.

5. **Build the registry**:

```bash
pnpm registry:build
```

6. **Start development**:

```bash
pnpm dev
```

## Project structure

```
├── registry/
│   └── mint/               # Components, elements (e-), and blocks (b-)
├── registry.json           # Registry manifest
├── content/docs/           # Documentation (MDX)
├── app/
│   ├── api/diff/figma/     # Figma token diff API
│   └── api/share/discord/  # Discord webhook API
└── public/r/               # Built registry files (auto-generated)
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm registry:build` | Rebuild the component registry |

## License

[MIT](./LICENSE)
