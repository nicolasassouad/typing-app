import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  base: '/typing-app/',
  build: {
    outDir: 'dist',
  },
});
