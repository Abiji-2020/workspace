import { defineConfig } from 'vite';
import VitePluginReact from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [VitePluginReact()],
  test: {
    globals: true, // Makes expect available globally
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'], // Optional setup file
  },
});
