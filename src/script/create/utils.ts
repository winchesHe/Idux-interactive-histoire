import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs'
import consola from 'consola'
import { lowerFirst, upperFirst } from '../utils'
import type { CategoryObjValue, CategoryType, ComponentType } from './constant'
import { categoryList, categoryObj, componentCollection, createStoryComponent, createStoryMd, resolver } from './constant'
import { getCategory } from './questions/category'

export const getComponentChoices = async () => {
  const category: CategoryType = await getCategory()
  // 读取已有的组件
  let files: string[] = []
  const choices = (componentCollection[category]?.components as [ComponentType])
  const categoryValue: CategoryObjValue = categoryObj[category]
  try {
    const path = resolver(`src/components/${categoryValue}/`)
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
    // debugger
    return choices.filter(c => !existMap[c.match(/^\w+/i)?.[0] as any])
  }
}

export const generateStoryDoc = (component: ComponentType) => {
  const category = categoryList.find(type => (componentCollection[type]?.components as [ComponentType])?.includes(component))!
  if (!category)
    return consola.error(`${component} not a legal component of Idux, please check and re-enter!`)

  // 确定生成路径
  component = component.match(/^\w+/i)?.[0] as ComponentType
  const categoryValue: CategoryObjValue = categoryObj[category]
  const fileVueName = `${lowerFirst(component)}.story.vue`
  const fileMdName = `${lowerFirst(component)}.story.md`
  const storyDocDir = resolver(`src/components/${categoryValue}/${component}`)
  const storyDocFileVue = resolver(`src/components/${categoryValue}/${component}/${fileVueName}`)
  const storyDocFileMd = resolver(`src/components/${categoryValue}/${component}/${fileMdName}`)

  // 读取模板
  const template = createStoryComponent(categoryValue, component)
  const md = createStoryMd(component)
  // 生成文件
  try {
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
