import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,  // Ensure Vitest's globals are available
    environment: 'jsdom',
    setupFiles: './setupTests.js',  // Ensure setup file is correctly loaded
  },
  resolve: {
    alias: {
      '@features': '/src/features',
      // add other aliases as needed
    },
  },
});