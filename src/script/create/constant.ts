import { resolve } from 'pathe'
import { lowerFirst } from '../utils'
export const PROJECT_DIR = process.cwd()
export const resolver = (dir: string) => resolve(PROJECT_DIR, dir)

const moduleTemplateObj = {
  基础组件: 'components',
  高级组件: 'pro',
  开发套件: 'cdk',
} as const
export const createStoryComponent = (category: CategoryObjValue, component: ComponentType, options: optionsType, module: CategoryComType) => `\
<script setup lang="ts">
import type { ${component}Props } from '@idux/${moduleTemplateObj[module]}'

function initState() {
  return {
    value: 'default',
  }
}
</script>

<template>
  <!-- icon from https://icones.js.org/collection/all?s=${lowerFirst(component)} -->
  <Story
    title="${category ? `${category}/` : ''}${component}"
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
  基础组件: {
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
        'Divider(分割线)',
        'Grid(栅格布局)',
        'Layout(布局)',
        'Space(间距)',
      ],
    },
    导航: {
      components: [
        'BreadCrumb(面包屑)',
        'Dropdown(下拉菜单)',
        'Menu(导航菜单)',
        'Pagination(分页)',
        'Stepper(步骤条)',
      ],
    },
    数据录入: {
      components: [
        'Cascader(级联选择)',
        'CHeckbox(复选框)',
        'DatePicker(日期选择器)',
        'Form(表单)',
        'Input(输入框)',
        'InputNumber(数字输入框)',
        'Radio(单选框)',
        'Rate(评分)',
        'Select(选择器)',
        'Slider(滑动输入条)',
        'Switch(开关)',
        'Textarea(文本域)',
        'TimePicker(时间选择器)',
        'Transfer(穿梭框)',
        'TreeSelect(树型选择)',
        'Upload(文件上传)',
      ],
    },
    数据展示: {
      components: [
        'Avatar(头像)',
        'Badge(徽标数)',
        'Card(卡片)',
        'Carousel(轮播图)',
        'Collapse(折叠面板)',
        'Comment(评论)',
        'Empty(空数据)',
        'Image(图片)',
        'List(列表)',
        'Popover(气泡卡片)',
        'Statistic(统计数值)',
        'Table(表格)',
        'Tabs(标签页)',
        'Timeline(时间轴)',
        'Tooltip(文字提示)',
        'Tree(树)',
      ],
    },
    反馈: {
      components: [
        'Alert(警告提示)',
        'Drawer(抽屉)',
        'LoadingBar(加载进度条)',
        'Message(全局提示)',
        'Modal(对话框)',
        'Notification(通知提醒)',
        'PopConfirm(气泡确认框)',
        'Progress(进度条)',
        'Result(结果)',
        'Skeleton(骨架屏)',
        'Spin(加载中)',
      ],
    },
    其他: {
      components: [
        'Affix(固钉)',
        'Anchor(锚点)',
        'BackTop(回到顶部)',
        'Watermark(水印)',
      ],
    },
  },
  高级组件: {
    数据录入: {
      components: [
        'ProForm(高级表单)',
        'ProSearch(复合搜索)',
        'ProTextarea(高级文本域)',
        'ProTransfer(高级穿梭框)',
      ],
    },
    布局: {
      components: [
        'ProLayout(高级布局)',
      ],
    },
    数据展示: {
      components: [
        'ProTable(高级表格)',
        'ProTree(高级树型控件)',
      ],
    },
  },
  开发套件: {
    components: [
      'Accessibility(无障碍性)',
      'Breakpoint(断电)',
      'ClickOutside(点击外部)',
      'Clipboard(剪贴板)',
      'DragDrop(拖放)',
      'Forms(表单)',
      'Platform(平台)',
      'Popper(浮层)',
      'Portal(传送门)',
      'Resize(调整尺寸)',
      'Scroll(滚动)',
    ],
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
export const moduleObj = {
  基础组件: 'basicComponents',
  高级组件: 'pro',
  开发套件: 'cdk',
} as const
export type CategoryObjValue = typeof categoryObj[keyof typeof categoryObj]
export interface optionsType { grid: boolean }

export type CategoryComType = keyof typeof componentCollection

export type BasicCategory = keyof typeof componentCollection['基础组件']
export type ProCategory = keyof typeof componentCollection['高级组件']
export type CdkCategory = keyof typeof componentCollection['开发套件']
export type CategoryType = BasicCategory | ProCategory

export type BasicComponentType = typeof componentCollection['基础组件'][BasicCategory]['components'][number]
export type ProComponentType = typeof componentCollection['高级组件'][ProCategory]['components'][number]
export type CdkComponentType = typeof componentCollection['开发套件'][CdkCategory][number]
export type ComponentType = BasicComponentType | ProComponentType | CdkComponentType

export const categoryList = Object.keys({
  ...componentCollection['基础组件'],
  ...componentCollection['高级组件'],
  ...componentCollection['开发套件'],
}) as [CategoryType | 'components']
export const moduleList = Object.keys(componentCollection) as [CategoryComType]
