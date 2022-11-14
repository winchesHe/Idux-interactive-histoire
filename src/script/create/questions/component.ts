import inquirer from 'inquirer'
import type { ComponentType } from '../constant'
import { getComponentChoices } from '../utils'

export const getComponentsName = async () => {
  const { choices, module } = (await getComponentChoices())!
  const componentName = {
    type: 'checkbox',
    name: 'components',
    message: '请选择一个组件名：',
    choices,
    validate: (value: string) => {
      if (!value.length)
        return 'Component name is required!'

      return true
    },
  }
  return {
    module,
    components: (await inquirer.prompt([componentName])).components as [ComponentType],
  }
}
