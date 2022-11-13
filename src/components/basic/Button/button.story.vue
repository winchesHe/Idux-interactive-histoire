<script setup lang="ts">
import type { ButtonMode, ButtonSize } from '@idux/components'
import { logEvent } from 'histoire/client'

function initState() {
  return {
    value: 'default',
    size: 'md',
  }
}

const buttonMode: HstControlOption<ButtonMode>[] = [
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
]
const buttonSize: HstControlOption<ButtonSize>[] = [
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
]
const ButtonOptions = ref(buttonMode)
const ButtonSizeOptions = ref(buttonSize)
</script>

<template>
  <Story
    title="Basic/Button" icon="teenyicons:button-outline" :layout="{
      type: 'grid',
      width: 400,
    }"
  >
    <Variant
      title="按钮类型"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          按钮共有 5 种类型：主按钮、默认按钮、虚线按钮和链接按钮，通过设置 mode 来使用不同的类型。
        </Describe>
        <ix-button
          :mode="state.value" :href="state.value === 'link' ? 'https://github.com/IDuxFE/idux' : ''"
          :target="state.value === 'link' ? '_blank' : ''" :size="state.size" @click="logEvent('btnClick', $el)"
        >
          {{ state.value }}
        </ix-button>
      </template>

      <template #controls="{ state }">
        <HstRadio v-model="state.value" title="mode" :options="ButtonOptions" />
        <HstRadio v-model="state.value" title="size" :options="ButtonSizeOptions" />
      </template>
    </Variant>

    <Variant title="危险按钮" :init-state="initState">
      <template #default="{ state }">
        <Describe>通过设置 danger 将按钮标识为危险状态。</Describe>
        <ix-button
          :mode="state.value" :href="state.value === 'link' ? 'https://github.com/IDuxFE/idux' : ''"
          :target="state.value === 'link' ? '_blank' : ''" :size="state.size" @click="logEvent('btnClick', $el)"
        >
          {{ state.value }}
        </ix-button>
      </template>

      <template #controls="{ state }">
        <HstRadio v-model="state.value" title="mode" :options="ButtonOptions" />
        <HstRadio v-model="state.size" title="size" :options="ButtonSizeOptions" />
      </template>
    </Variant>
  </Story>
</template>

<style scoped>

</style>
