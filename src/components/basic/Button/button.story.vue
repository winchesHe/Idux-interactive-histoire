<script setup lang="ts">
import type { ButtonMode, ButtonSize } from '@idux/components'
import { logEvent } from 'histoire/client'

const btnValue1: Ref<ButtonMode> = ref('default')
const btnSize1: Ref<ButtonSize> = ref('md')

const ButtonOptions: Ref<HstControlOption[]> = ref([
  {
    label: 'default',
    value: 'default',
  }, {
    label: 'link',
    value: 'link',
  }, {
    label: 'primary',
    value: 'primary',
  }, {
    label: 'dashed',
    value: 'dashed',
  }, {
    label: 'text',
    value: 'text',
  },
])
const ButtonSizeOptions: Ref<HstControlOption[]> = ref([
  {
    label: '加大',
    value: 'xl',
  }, {
    label: '大',
    value: 'lg',
  }, {
    label: '正常',
    value: 'md',
  }, {
    label: '小',
    value: 'sm',
  }, {
    label: '超小',
    value: 'xs',
  },
])
</script>

<template>
  <Story title="Basic/Button" icon="teenyicons:button-outline">
    <Variant title="按钮类型">
      <Describe>
        按钮共有 5 种类型：主按钮、默认按钮、虚线按钮和链接按钮，通过设置 mode 来使用不同的类型。
      </Describe>
      <ix-button
        :mode="btnValue1" :href="btnValue1 === 'link' ? 'https://github.com/IDuxFE/idux' : ''"
        :target="btnValue1 === 'link' ? '_blank' : ''" :size="btnSize1" @click="logEvent('btnClick', $el)"
      >
        {{ btnValue1 }}
      </ix-button>

      <template #controls>
        <HstRadio v-model="btnValue1" title="mode" :options="ButtonOptions" />
        <HstRadio v-model="btnSize1" title="size" :options="ButtonSizeOptions" />
      </template>
    </Variant>

    <Variant title="危险按钮">
      <Describe>通过设置 danger 将按钮标识为危险状态。</Describe>
      <ix-button
        :mode="btnValue1" :href="btnValue1 === 'link' ? 'https://github.com/IDuxFE/idux' : ''"
        :target="btnValue1 === 'link' ? '_blank' : ''" :size="btnSize1" @click="logEvent('btnClick', $el)"
      >
        {{ btnValue1 }}
      </ix-button>

      <template #controls>
        <HstRadio v-model="btnValue1" title="mode" :options="ButtonOptions" />
        <HstRadio v-model="btnSize1" title="size" :options="ButtonSizeOptions" />
      </template>
    </Variant>
  </Story>
</template>

<style scoped>

</style>
