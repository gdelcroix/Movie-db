import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      headless: true,
    },
    globals: true,
    environment: 'jsdom',
    include: ['./__tests__/**/*.test.{js,ts,jsx,tsx}'],
  },
});
