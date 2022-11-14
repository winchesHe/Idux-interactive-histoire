<script setup lang="ts">
import type { ButtonMode, ButtonShape, ButtonSize } from '@idux/components'
import { logEvent } from 'histoire/client'

function initState() {
  return {
    value: 'default',
    size: 'md',
    icon: 'search',
    shape: '',
    danger: true,
    disabled: true,
    loading: true,
    ghost: true,
    block: true,
    stateLoading: false,
    stateDisabled: false,
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
const icon: HstControlOption[] = [
  {
    label: '搜索图标',
    value: 'search',
  }, {
    label: '灯泡',
    value: 'bulb',
  }, {
    label: '关闭',
    value: 'close-circle',
  }, {
    label: '加号',
    value: 'plus',
  }, {
    label: '减号',
    value: 'minus',
  }]

const shape: HstControlOption<ButtonShape | ''>[] = [
  {
    label: '长方形按钮(默认)',
    value: '',
  }, {
    label: '圆角长方形',
    value: 'round',
  }, {
    label: '正方形',
    value: 'square',
  }]
const ShapOptions = ref(shape)
const ButtonOptions = ref(buttonMode)
const ButtonSizeOptions = ref(buttonSize)
const IconOptions = ref(icon)
</script>

<template>
  <Story
    title="ClickOutside" icon="teenyicons:button-outline" :layout="{
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
          :target="state.value === 'link' ? '_blank' : ''" @click="logEvent('btnClick', $el)"
        >
          {{ state.value }}
        </ix-button>
      </template>

      <template #controls="{ state }">
        <HstRadio v-model="state.value" title="mode" :options="ButtonOptions" />
      </template>
    </Variant>

    <Variant
      title="按钮尺寸"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          按钮共有 5 种尺寸：超小、小、中、大、超大，默认为中。
        </Describe>
        <ix-button
          :mode="state.value" :href="state.value === 'link' ? 'https://github.com/IDuxFE/idux' : ''"
          :target="state.value === 'link' ? '_blank' : ''" :size="state.size" @click="logEvent('btnClick', $el)"
        >
          {{ state.value }}
        </ix-button>
      </template>

      <template #controls="{ state }">
        <HstSelect v-model="state.value" title="mode" :options="ButtonOptions" />
        <HstRadio v-model="state.size" title="size" :options="ButtonSizeOptions" />
      </template>
    </Variant>

    <Variant title="禁用状态" :init-state="initState">
      <template #default="{ state }">
        <Describe>禁用状态下按钮不可点击。</Describe>
        <ix-button
          :mode="state.value" :href="state.value === 'link' ? 'https://github.com/IDuxFE/idux' : ''"
          :target="state.value === 'link' ? '_blank' : ''" :disabled="state.disabled" @click="logEvent('btnClick', $el)"
        >
          {{ state.value }}
        </ix-button>
      </template>

      <template #controls="{ state }">
        <HstSelect v-model="state.value" title="mode" :options="ButtonOptions" />
        <HstCheckbox v-model="state.disabled" title="disabled" />
      </template>
    </Variant>

    <Variant title="按钮图标" :init-state="initState">
      <template #default="{ state }">
        <Describe>图标按钮由图标 + 文字或图标构成，通过图标可增强识别性，以便直观理解。</Describe>
        <IxSpace>
          <IxButton :icon="state.icon">
            {{ state.icon }}
          </IxButton>
          <IxButton :icon="state.icon" />
        </IxSpace>
      </template>

      <template #controls="{ state }">
        <HstSelect
          v-model="state.icon" title="icon" :options="IconOptions"
        />
      </template>
    </Variant>

    <Variant title="加载中状态" :init-state="initState">
      <template #default="{ state }">
        <IxSpace>
          <Describe>加载中状态下按钮不可点击，此时会显示加载图标，自定义设置的 icon 无效。</Describe>
          <ix-button
            :mode="state.value" :href="state.value === 'link' ? 'https://github.com/IDuxFE/idux' : ''"
            :target="state.value === 'link' ? '_blank' : ''" :loading="state.loading" @click="logEvent('btnClick', $el)"
          >
            {{ state.value }}
          </ix-button>
          <IxButton mode="dashed" loading>
            dashed
          </IxButton>
          <IxButton mode="primary" loading>
            primary
          </IxButton>
          <IxButton mode="link" loading href="https://github.com/IDuxFE/idux" target="_blank">
            link
          </IxButton>
        </IxSpace>
      </template>

      <template #controls="{ state }">
        <HstSelect v-model="state.value" title="mode" :options="ButtonOptions" />
        <HstCheckbox v-model="state.loading" title="loading" />
      </template>
    </variant>

    <Variant title="幽灵按钮" :init-state="initState">
      <template #default="{ state }">
        <Describe>通过设置 ghost 将按钮的背景设为透明，通常在有色背景上。</Describe>
        <IxSpace class="button-ghost-demo">
          <IxButton :mode="state.value" :ghost="state.ghost" :loading="state.stateLoading" :disabled="state.stateDisabled">
            {{ state.value }}
          </IxButton>
          <IxButton mode="primary" :ghost="state.ghost" :loading="state.stateLoading" :disabled="state.stateDisabled">
            primary
          </IxButton>
          <IxButton mode="dashed" :ghost="state.ghost" :loading="state.stateLoading" :disabled="state.stateDisabled">
            dashed
          </IxButton>
          <IxButton danger :ghost="state.ghost" :loading="state.stateLoading" :disabled="state.stateDisabled">
            danger
          </IxButton>
        </IxSpace>
      </template>

      <template #controls="{ state }">
        <HstSelect v-model="state.value" title="mode" :options="ButtonOptions" />
        <HstCheckbox v-model="state.ghost" title="ghost" />
        <HstCheckbox v-model="state.stateLoading" title="loading" />
        <HstCheckbox v-model="state.stateDisabled" title="disabled" />
      </template>
    </variant>

    <Variant title="危险按钮" :init-state="initState">
      <template #default="{ state }">
        <Describe>通过设置 danger 将按钮标识为危险状态。</Describe>
        <ix-button
          :mode="state.value" :href="state.value === 'link' ? 'https://github.com/IDuxFE/idux' : ''"
          :target="state.value === 'link' ? '_blank' : ''" :danger="state.danger" @click="logEvent('btnClick', $el)"
        >
          {{ state.value }}
        </ix-button>
      </template>

      <template #controls="{ state }">
        <HstSelect v-model="state.value" title="mode" :options="ButtonOptions" />
        <HstCheckbox v-model="state.danger" title="danger" />
      </template>
    </variant>

    <Variant title="按钮形状" :init-state="initState">
      <template #default="{ state }">
        <Describe>除了默认的长方形按钮，还提供了圆角长方形、正方形、圆形等形状。</Describe>
        <IxSpace>
          <IxButton icon="bulb" :mode="state.value" :shape="state.shape" />
          <IxButton shape="round">
            Button
          </IxButton>
          <IxButton :icon="state.icon" shape="square" />
        </IxSpace>
      </template>

      <template #controls="{ state }">
        <HstRadio v-model="state.shape" title="shape" :options="ShapOptions" />
        <HstSelect v-model="state.value" title="mode" :options="ButtonOptions" />
        <HstSelect v-model="state.icon" title="icon" :options="IconOptions" />
      </template>
    </variant>

    <Variant title="Block 按钮" :init-state="initState">
      <template #default="{ state }">
        <Describe>通过设置 block 将按钮宽度调整为自适应其父元素的宽度, 该按钮常见于移动端和一些表单场景中。</Describe>
        <IxSpace vertical block>
          <IxButton :mode="state.value" :block="state.block">
            {{ state.value }}
          </IxButton>
          <IxButton mode="primary" :block="state.block">
            primary
          </IxButton>
          <IxButton mode="dashed" :block="state.block">
            dashed
          </IxButton>
          <IxButton mode="text" :block="state.block">
            text
          </IxButton>
          <IxButton mode="link" :block="state.block" href="https://github.com/IDuxFE/idux" target="_blank">
            link
          </IxButton>
        </IxSpace>
      </template>

      <template #controls="{ state }">
        <HstSelect v-model="state.value" title="mode" :options="ButtonOptions" />
        <HstCheckbox v-model="state.block" title="block" />
      </template>
    </variant>

    <Variant title="按钮组" :init-state="initState">
      <template #default="{ state }">
        <Describe>提供文字提示 + 操作行为。</Describe>
        <IxSpace>
          <IxButtonGroup>
            <IxButton :mode="state.value" block>
              {{ state.value }}
            </IxButton>
            <IxButton :mode="state.value" icon="search" shape="square" />
          </IxButtonGroup>
          <IxButtonGroup>
            <IxButton block>
              default
            </IxButton>
            <IxButton icon="down" shape="square" />
          </IxButtonGroup>
        </IxSpace>
      </template>

      <template #controls="{ state }">
        <HstRadio v-model="state.value" title="mode" :options="ButtonOptions" />
      </template>
    </variant>
  </story>
</template>

<style scoped>
.button-ghost-demo {
  background: rgb(200, 200, 200);
  padding: 16px;
}
</style>
