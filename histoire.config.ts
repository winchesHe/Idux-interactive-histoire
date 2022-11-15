import path from 'pathe'
import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import { getCdkComponents, getProComponents } from './src/utils'

const iduxLogo = path.resolve(__dirname, './src/assets/logo/logo.svg')
const proComponents = getProComponents()
const cdkComponents = getCdkComponents()

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
  tree: {
    groups: [
      {
        id: 'top',
        title: '',
      },
      {
        title: 'Basic Components',
        include: file => !/\.cdk|\.pro/.test(file.path),
      },
      {
        title: 'Pro Components',
        include: file => proComponents.some(item => file.title.includes(item)),
      },
      {
        title: 'Cdk Components',
        include: file => cdkComponents.some(item => file.title.includes(item)),
      },
    ],
  },
})
