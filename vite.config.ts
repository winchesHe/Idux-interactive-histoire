import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    AutoImport({
      include: [
        /\.vue$/, /\.vue\?vue/, // .vue
      ],
      imports: ['vue'],
      dirs: ['src/components/**/*'],
      // 需自动生成时打开
      // dts: 'src/auto-imports.d.ts',
      // false 关闭自动导入防止覆盖额外添加内容
      dts: false,
      vueTemplate: true,
    }),
    Unocss(),
  ],
})
