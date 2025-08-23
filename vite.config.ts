import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { copyFileSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [
    vue(),
    // Custom plugin to copy integration examples to dist folder
    {
      name: 'copy-integration-examples',
      writeBundle() {
        // Copy integration examples and README to dist folder
        const examples = [
          'integration-example.html',
          'simple-integration.html',
          'dist-readme.md',
        ];

        examples.forEach(example => {
          const srcPath = resolve(__dirname, example);
          const destPath = resolve(__dirname, 'dist', example);

          if (existsSync(srcPath)) {
            copyFileSync(srcPath, destPath);
            console.log(`✅ Copied ${example} to dist/`);
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'Apple2GSSerial',
      fileName: 'app',
      formats: ['iife', 'es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
