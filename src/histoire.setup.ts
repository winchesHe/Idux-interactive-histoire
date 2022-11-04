import type { App } from 'vue'
import { defineSetupVue3 } from '@histoire/plugin-vue'
import IduxCdk from '@idux/cdk'
import IduxComponents from '@idux/components'
import IduxPro from '@idux/pro'

import './theme/style.css'
// 引入unocss
import '@unocss/reset/tailwind.css'
import 'uno.css'

// 导入 cdk 样式，注意是 `index`, 因为 cdk 不会区分主题
import '@idux/cdk/index.min.css'

// 如果不需要 reset 全局样式，移除下一行代码，但是这可能导致部分组件样式异常，需要提供一些必须的全局样式
// 参见：https://github.com/IDuxFE/idux/issues/1194
import '@idux/components/style/core/reset.default.min.css'
// 如果不需要 reset 滚动条样式，移除下一行代码
import '@idux/components/style/core/reset-scroll.default.min.css'

// 如果需要 css 按需加载，移除下面 2 行代码
import '@idux/components/default.min.css'
import '@idux/pro/default.min.css'

import { IDUX_ICON_DEPENDENCIES, addIconDefinitions } from '@idux/components/icon'

// 静态加载: `IDUX_ICON_DEPENDENCIES` 是 `@idux` 的部分组件默认所使用到图标，建议在此时静态引入。
addIconDefinitions(IDUX_ICON_DEPENDENCIES)

export const setupVue3 = defineSetupVue3(({ app }: { app: App }) => {
  app.use(IduxCdk).use(IduxComponents).use(IduxPro)
})
