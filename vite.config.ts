import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}/`,
      'components': `${path.resolve(__dirname, 'src/components')}/`,
      'theme': `${path.resolve(__dirname, 'src/theme')}/`,
      'utils': `${path.resolve(__dirname, 'src/utils')}/`,
      'script/*': `${path.resolve(__dirname, 'src/script')}/`,
    },
  },
  plugins: [
    Vue(),
    Inspect(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dirs: ['src/components/**/*.vue'],
      // 需自动生成时打开
      dts: 'src/auto-imports.d.ts',
      // false 关闭自动导入防止覆盖额外添加内容
      // dts: false,
      vueTemplate: true,
    }),
    Components({
      dirs: ['src/components/common'],
      dts: 'src/components.d.ts',
    }),
    Unocss(),
  ],
  server: {
    hmr: {
      overlay: false, // fix：unocss服务保存
    },
  },
})
