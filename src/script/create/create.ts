import type { ComponentType, optionsType } from './constant'
import { getComponentsName } from './questions/component'
import { generateStoryDoc } from './utils'

export async function create(components: [ComponentType], options: optionsType) {
  // 参数没有带上组件名
  if (!components.length) {
    const { components, module } = await getComponentsName()
    // 组件名合法性检验
    components.forEach(c => generateStoryDoc(c, options, module))
  }
  else { components.forEach(c => generateStoryDoc(c, options)) }
}
