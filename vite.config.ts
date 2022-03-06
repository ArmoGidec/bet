import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@domain': resolve(__dirname, 'src', 'packages', 'domain'),
      '@services': resolve(__dirname, 'src', 'services'),
      '@mappers': resolve(__dirname, 'src', 'mappers'),
      '@shared': resolve(__dirname, 'src', 'shared'),
      '@components': resolve(__dirname, 'src', 'components'),
      '@hooks': resolve(__dirname, 'src', 'hooks'),
    },
  },
});
