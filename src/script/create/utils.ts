import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs'
import consola from 'consola'
import { lowerFirst, upperFirst } from '../utils'
import type { CategoryComType, CategoryObjValue, CategoryType, ComponentType, optionsType } from './constant'
import { categoryList, categoryObj, componentCollection, createStoryComponent, createStoryMd, moduleList, moduleObj, resolver } from './constant'
import { getCategory } from './questions/category'

export const getComponentChoices = async () => {
  const { category, module } = await getCategory()
  // 读取已有的组件
  let files: string[] = []
  let choices: ComponentType[]
  if (module === '开发套件')
    choices = (componentCollection as any)[module].components
  else choices = (componentCollection as any)[module][category].components
  const categoryValue: CategoryObjValue = categoryObj[category]

  try {
    const path = resolver(`src/components/${moduleObj[module]}/${categoryValue}/`)
    if (existsSync(path))
      files = readdirSync(path)
  }
  catch (e) {
    console.error((e as string).toString())
    process.exit(1)
  }
  if (files) {
    const existMap: any = {}
    const names = files?.map(f => upperFirst(f?.split('.')[0]))
    // 取交集，仅列出未创建的组件
    for (const k of names)
      existMap[k] = true

    return {
      module,
      choices: choices.filter(c => !existMap[c.match(/^\w+/i)?.[0] as any]),
    }
  }
}

export const generateStoryDoc = (component: ComponentType, options: optionsType, module?: CategoryComType) => {
  let category: CategoryType
  const findCategoryList = (module: any) => {
    return categoryList.find((type) => {
      if (type === 'components')
        return componentCollection['开发套件'].components?.includes(component as any)
      return (componentCollection as any)[module!][type]?.components?.includes(component as any)
    })
  }
  if (module) {
    category = findCategoryList(module) as CategoryType
  }
  else {
    module = moduleList.find((module) => {
      return findCategoryList(module)
    })
    category = findCategoryList(module) as CategoryType
  }

  if (!category)
    return consola.error(`${component} not a legal component of Idux, please check and re-enter!`)

  // 确定生成路径
  component = component.match(/^\w+/i)?.[0] as ComponentType
  const addPrefix = () => {
    if (module === '开发套件')
      return '.cdk'
    else if (module === '高级组件')
      return '.pro'
    else return ''
  }
  const categoryValue: CategoryObjValue = categoryObj[category]
  const fileVueName = `${lowerFirst(component)}${addPrefix()}.story.vue`
  const fileMdName = `${lowerFirst(component)}${addPrefix()}.story.md`
  const moduleValue = module === '开发套件' ? '' : `/${categoryValue}`
  const moduleDocDir = resolver(`src/components/${moduleObj[module!]}${moduleValue}/`)
  const storyDocDir = resolver(`src/components/${moduleObj[module!]}${moduleValue}/${component}`)
  const storyDocFileVue = resolver(`src/components/${moduleObj[module!]}${moduleValue}/${component}/${fileVueName}`)
  const storyDocFileMd = resolver(`src/components/${moduleObj[module!]}${moduleValue}/${component}/${fileMdName}`)

  // 读取模板
  const template = createStoryComponent(categoryValue, component, options, module!)
  const md = createStoryMd(component)
  // 生成文件
  try {
    // 模块不存在则新建
    if (!existsSync(moduleDocDir))
      mkdirSync(moduleDocDir)
    // 目录不存在则新建
    if (!existsSync(storyDocDir))
      mkdirSync(storyDocDir)

    // 组件文档存在则退出
    if (existsSync(storyDocFileVue)) {
      consola.error(`${storyDocFileVue} Already existed!`)
      return
    }
    writeFileSync(storyDocFileVue, template, { encoding: 'utf-8' })

    if (existsSync(storyDocFileMd)) {
      consola.error(`${storyDocFileMd} Already existed!`)
      return
    }
    writeFileSync(storyDocFileMd, md, { encoding: 'utf-8' })

    printSuccess(component, storyDocFileVue)
  }
  catch (e) {
    console.error((e as string).toString())
    process.exit(1)
  }
}

function printSuccess(component: ComponentType, dir: string) {
  consola.success(`\x1B[36m${component} Creation Success\x1B[39m`)
  consola.info(`\x1B[36mPath:\x1B[39m \x1B[32m${dir}\x1B[39m`)
}
