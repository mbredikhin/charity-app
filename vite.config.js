import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import { cwd } from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { createHtmlPlugin } from 'vite-plugin-html';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '');
  return {
    plugins: [
      react(),
      svgr(),
      createHtmlPlugin({
        entry: 'src/main.tsx',
        template: 'index.html',
        inject: {
          data: {
            injectScript: `<script src=${JSON.stringify(env.YANDEX_MAP)}></script>`,
          },
        },
      }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    },
    server: {
      host: 'charity-hub.local',
    },
  };
});
