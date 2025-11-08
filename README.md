# Typing App

A typing lesson app built with Preact, TypeScript, and Vite. Features an interactive QWERTY keyboard that lights up when keys are pressed.

## Features

- Interactive QWERTY keyboard visualization
- Real-time key press detection
- Responsive design following a custom design system
- TypeScript for type safety
- ESLint and Prettier for code quality

## Setup

This project uses `pnpm` as the package manager.

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

4. Preview the production build:
```bash
pnpm preview
```

## Development Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

## GitHub Pages Deployment

The app is configured to deploy to GitHub Pages automatically via GitHub Actions. The workflow is triggered on pushes to the `master` branch.

Make sure to:
1. Enable GitHub Pages in your repository settings
2. Set the source to the `gh-pages` branch
3. The base path is configured as `/typing-app/` in `vite.config.ts`