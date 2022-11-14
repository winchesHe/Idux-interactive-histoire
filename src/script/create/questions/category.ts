import inquirer from 'inquirer'
import type { CategoryComType, CategoryType } from './../constant'
import { componentCollection } from './../constant'
import { getModule } from './module'

export const getCategory = async () => {
  const module: CategoryComType = await getModule()
  const categoryList = {
    type: 'list',
    name: 'category',
    message: '请选择一个组件目录：',
    choices: Object.keys(componentCollection[module]),
  }
  let category: CategoryType
  if (['开发套件'].includes(module))
    category = 'components' as CategoryType
  else category = (await inquirer.prompt([categoryList])).category as CategoryType

  return {
    module,
    category,
  }
}
