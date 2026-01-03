import path from 'node:path';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, type PluginOption } from 'vite';
import zip from 'vite-plugin-zip-pack';
import manifest from './manifest.config.js';
import { name, version } from './package.json';

export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
  plugins: [
    react(),
    charcoalIcons(),
    crx({ manifest }),
    zip({ outDir: 'release', outFileName: `${name}-${version}.zip` }),
  ],
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
});

/** @see {@link https://github.com/pixiv/charcoal/blob/main/packages/icons/README.md} */
// TODO: dynamic import로 인해 모든 아이콘이 번들에 포함되는 현상 수정 필요 - 가이드 대로 적용해도 해결되지 않음.
function charcoalIcons(): PluginOption {
  return {
    name: 'charcoal-icons',
    config() {
      return {
        build: {
          rollupOptions: {
            // 아래 코드를 적용 시 번들에서 사라지긴 하지만 실제로 구동이 안 됨.
            // external: ['@charcoal-ui/icons'],
          },
        },
      };
    },
  };
}
