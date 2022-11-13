import { resolve } from 'pathe'
import { lowerFirst } from 'script/utils'
export const PROJECT_DIR = process.cwd()
export const resolver = (dir: string) => resolve(PROJECT_DIR, dir)

export const createStoryComponent = (category: CategoryObjValue, component: ComponentType, options: optionsType) => `\
<script setup lang="ts">
import type { ${component}Props } from '@idux/components'

function initState() {
  return {
    value: 'default',
  }
}
</script>

<template>
  <!-- icon from https://icones.js.org/collection/all?s=${lowerFirst(component)} -->
  <Story
    title="basic/Header"
    icon="cil:3d"${options.grid ? ' :layout="{ type: \'grid\', width: 400 }"' : ''}
  >
    <Variant
      title="Basic Usage"
      :init-state="initState"
    >
      <template #default="{ state }">
        <!-- HstContent -->
      </template>

      <template #controls="{ state }">
        <!-- HstControl -->
      </template>
    </Variant>
  </Story>
</template>

<style scoped>
</style>
`

export const createStoryMd = (component: ComponentType) => `\
## ${component} Attributes
`

export const componentCollection = {
  通用: {
    components: [
      'Button(按钮)',
      'Header(页头)',
      'Icon(图标)',
      'Tag(标签)',
    ],
  },
  布局: {
    components: [
      'Autocomplete',
      'Cascader',
      'Checkbox',
      'ColorPicker',
      'DatePicker',
      'DateTimePicker',
      'Form',
      'Input',
      'InputNumber',
      'Radio',
      'Rate',
      'Select',
      'VirtualizedSelect',
      'Slider',
      'Switch',
      'TimePicker',
      'TimeSelect',
      'Transfer',
      'Upload',
    ],
  },
  导航: {
    components: [
      'Avatar',
      'Badge',
      'Calendar',
      'Card',
      'Carousel',
      'Collapse',
      'Descriptions',
      'Empty',
      'Image',
      'InfiniteScroll',
      'Pagination',
      'Progress',
      'Result',
      'Skeleton',
      'Table',
      'VirtualizedTable',
      'Tag',
      'Timeline',
      'Tree',
      'TreeSelect',
      'VirtualizedTree',
    ],
  },
  数据录入: {
    components: [
      'Affix',
      'Backtop',
      'Breadcrumb',
      'Dropdown',
      'Menu',
      'PageHeader',
      'Steps',
      'Tabs',
    ],
  },
  数据展示: {
    components: [
      'Alert',
      'Dialog',
      'Drawer',
      'Loading',
      'Message',
      'MessageBox',
      'Notification',
      'Popconfirm',
      'Popover',
      'Tooltip',
    ],
  },
  反馈: {
    components: ['ConfigProvider'],
  },
  其他: {
    components: ['Divider'],
  },
} as const
export const categoryObj = {
  通用: 'basic',
  布局: 'layout',
  导航: 'navigation',
  数据录入: 'dataEntry',
  数据展示: 'dataShow',
  反馈: 'feedback',
  其他: 'others',
} as const

export type CategoryObjValue = typeof categoryObj[keyof typeof categoryObj]
export type CategoryType = keyof typeof componentCollection
export type ComponentType = typeof componentCollection[CategoryType]['components'][number]
export interface optionsType { grid: boolean }
export const categoryList = Object.keys(componentCollection) as [CategoryType]
