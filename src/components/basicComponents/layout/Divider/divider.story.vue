<script setup lang="ts">
import type { DividerProps } from '@idux/components'

function initState() {
  return {
    dashed: true,
    vertical: true,
    plain: true,
    label: 'iDux',
    size: 'md',
  }
}

const dividerSizeOptions: HstControlOption<DividerProps['size']>[] = [
  {
    label: 'Large',
    value: 'lg',
  }, {
    label: 'Medium',
    value: 'md',
  }, {
    label: 'small',
    value: 'sm',
  },
]
</script>

<!-- icon from https://icones.js.org/collection/all?s=divider -->
<template>
  <Story
    title="layout/Divider"
    icon="teenyicons:divider-line-outline"
    :layout="{
      type: 'grid',
      width: 400,
    }"
  >
    <Variant
      title="水平分割线"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          默认为水平分割线，可在通过 dashed 设置为虚线。
        </Describe>
        <IxDivider />
        <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
        <IxDivider :dashed="state.dashed" />
        <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
        <IxDivider :dashed="state.dashed" />
        <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
      </template>

      <template #controls="{ state }">
        <HstCheckbox v-model="state.dashed" title="dashed" />
      </template>
    </Variant>

    <Variant
      title="垂直分割线"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          使用 vertical 设置为行内的垂直分割线
        </Describe>
        <IxDivider />
        <span>Text</span>
        <IxDivider :vertical="state.vertical" :dashed="state.dashed" />
        <a href="#">Link</a>
        <IxDivider :vertical="state.vertical" :dashed="state.dashed" />
        <a href="#">Link</a>
      </template>

      <template #controls="{ state }">
        <HstCheckbox v-model="state.dashed" title="dashed" />
        <HstCheckbox v-model="state.vertical" title="vertical" />
      </template>
    </Variant>

    <Variant
      title="带文字的分割线"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          分割线中带有文字，可以用 labelPlacement 设置文字的位置。
        </Describe>
        <IxDivider />
        <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
        <IxDivider :label="state.label" :dashed="state.dashed" />
        <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
        <IxDivider :label="state.label" :dashed="state.dashed" label-placement="start" />
        <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
        <IxDivider :label="state.label" :dashed="state.dashed" label-placement="end" />
        <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
      </template>

      <template #controls="{ state }">
        <HstText v-model="state.label" title="label" />
        <HstCheckbox v-model="state.dashed" title="dashed" />
      </template>
    </Variant>

    <Variant
      title="分割线使用正文样式"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          使用 plain 可以设置为更轻量的分割线文字样式。
        </Describe>
        <IxDivider :label="state.label" :plain="state.plain" />
        <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
        <IxDivider :label="state.label" />
        <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
      </template>

      <template #controls="{ state }">
        <HstText v-model="state.label" title="label" />
        <HstCheckbox v-model="state.plain" title="plain" />
      </template>
    </Variant>

    <Variant
      title="分割线大小"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          使用 size 可以设置分割线的大小。
        </Describe>
        <IxDivider />
        <IxRadioGroup v-model:value="state.size" buttoned class="mb">
          <IxRadio value="sm">
            Small
          </IxRadio>
          <IxRadio value="md">
            Medium
          </IxRadio>
          <IxRadio value="lg">
            Large
          </IxRadio>
        </IxRadioGroup>

        <IxDivider :size="state.size" :label="state.label" :dashed="state.dashed" />
        <p>见山是山，见水是水；见山不是山，见水不是水；见山还是山，见水还是水。</p>
        <IxDivider :size="state.size" :label="state.label" :dashed="state.dashed" />
        <div>
          <span>Text</span>
          <IxDivider :size="state.size" :vertical="state.vertical" :dashed="state.dashed" />
          <a href="#">Link</a>
          <IxDivider :size="state.size" :vertical="state.vertical" :dashed="state.dashed" />
          <a href="#">Link</a>
        </div>
      </template>

      <template #controls="{ state }">
        <hst-button-group v-model="state.size" title="size" :options="dividerSizeOptions" />
        <HstText v-model="state.label" title="label" />
        <HstCheckbox v-model="state.vertical" title="vertical" />
        <HstCheckbox v-model="state.dashed" title="dashed" />
      </template>
    </Variant>
  </Story>
</template>

<style scoped>
</style>
