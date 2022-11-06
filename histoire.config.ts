import path from 'path'
import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

const iduxLogo = path.resolve(__dirname, './src/assets/logo/logo.svg')

export default defineConfig({
  setupFile: './src/histoire.setup.ts',
  plugins: [HstVue()],
  theme: {
    title: 'Idux Interactive Docs',
    logo: {
      dark: iduxLogo,
      light: iduxLogo,
      square: iduxLogo,
    },
    favicon: './src/assets/logo/favicon.ico',
  },
})
