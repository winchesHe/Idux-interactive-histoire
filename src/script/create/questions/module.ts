import inquirer from 'inquirer'
import { moduleList } from './../constant'

const module = {
  type: 'list',
  name: 'module',
  message: '请选择组件模块：',
  choices: moduleList,
}

export const getModule = async () => {
  return (await inquirer.prompt([module])).module
}
