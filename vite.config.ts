import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import createImportPlugin from 'vite-plugin-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createImportPlugin({
      onlyBuild: false, // if onlyBuild === true, this plugin takes effect only in vite build mode; onlyBuild's default value is true.
      babelImportPluginOptions: [
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        },
      ],
    }),
  ],
  base: './',
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
      pages: resolve(__dirname, './src/pages'),
      utils: resolve(__dirname, './src/utils'),
      components: resolve(__dirname, './src/components'),
      app: resolve(__dirname, './src/app'),
      assets: resolve(__dirname, './src/assets'),
    },
  },
  server: {
    open: '/',
    strictPort: true,
    port: 8090,
  },
  build: {
    target: 'esnext',
    sourcemap: false,
  },
});
