import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    // Enable React Fast Refresh
    fastRefresh: true,
  })],
  server: {
    // Enable HMR
    hmr: true,
  },
});