<script setup lang="ts">
import type { ProTextareaProps, TextareaError } from '@idux/pro'
import { logEvent } from 'histoire/client'
import type { ValidateErrors } from '@idux/cdk/forms'
import { Validators, useFormGroup } from '@idux/cdk/forms'

function initState() {
  return {
    value: '',
    resize: 'vertical',
    clearable: true,
    showCount: true,
  }
}
const ipRegex = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/
const validateIP = (line: string) => ipRegex.test(line)
const getIpValidationResults = (value: string | undefined) => {
  const lines = value?.split('\n')

  return lines
    ?.map((line, index) => !validateIP(line.trim()) && { index, message: 'IP Input is invalid' })
    .filter(Boolean) as TextareaError[]
}
const errorValue = ref(['127.0.0.1', '168.0.0.1', '100.10', '255.255.255.255', '999.999.1.1'].join('\n'))
const errors = ref<TextareaError[]>(getIpValidationResults(errorValue.value))
const onChangeError = (value: string | undefined, oldValue: string | undefined) => {
  if (value?.split('\n').length !== oldValue?.split('\n').length)
    errors.value = getIpValidationResults(oldValue)
}
const onBlur = () => {
  errors.value = getIpValidationResults(errorValue.value)
}
const onChange = (value: string, oldValue: string) => {
  logEvent('onChange', { value, oldValue })
}
const resizeOptions: HstControlOption<ProTextareaProps['resize']>[] = [
  {
    label: 'none',
    value: 'none',
  }, {
    label: 'vertical',
    value: 'vertical',
  }, {
    label: 'both',
    value: 'both',
  }, {
    label: 'horizontal',
    value: 'horizontal',
  },
]
const computeCount = (value: string) => `${value.length * 2} - 100`

const ipInputPlaceHolder = [
  'Please input IP, IP Range or IP with Prefix, one at each row',
  'Examples:',
  'IP: 192.168.1.1',
  'IP Range: 192.168.1.1-192.168.1.10',
  'IP With Prefix: 192.168.1.10/24',
].join('\n')

const ipRegexStr = '(\\b25[0-5]|\\b2[0-4][0-9]|\\b[01]?[0-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}'
const prefixedIpRegex = new RegExp(`^${ipRegexStr}/([1-2][0-9]|3[0-2]|[1-9])$`)
const ipRangeRegex = new RegExp(`^${ipRegexStr}-${ipRegexStr}$`)

const formValidateIP = (line: string) => [ipRegex, prefixedIpRegex, ipRangeRegex].some(regex => regex.test(line.trim()))
const formGetIpValidationResults = (value: string | undefined) => {
  const lines = value?.split('\n')

  return lines
    ?.map((line, index) => line.trim() && !formValidateIP(line.trim()) && { index, message: 'IP Input is invalid' })
    .filter(Boolean) as TextareaError[]
}

const formErrors = ref<TextareaError[]>()

const { required } = Validators
const IPValidator = (value: string): ValidateErrors | undefined => {
  if (!value) {
    formErrors.value = []
    return
  }

  const result = formGetIpValidationResults(value)
  formErrors.value = result

  const errorIndexList = result?.map(error => error.index + 1)

  return errorIndexList && errorIndexList.length > 0
    ? {
        IP: { message: `IP input at line ${errorIndexList.join(', ')} is incorrect` },
      }
    : undefined
}

const formGroup = useFormGroup({
  ruleName: ['', [required]],
  IP: ['', [IPValidator]],
})
</script>

<!-- icon from https://icones.js.org/collection/all?s=proTextarea -->
<template>
  <Story
    title="dataEntry/ProTextarea(高级文本域)"
    icon="bi:textarea-resize"
  >
    <Variant
      title="基本使用"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          最简单的用法。
        </Describe>
        <IxProTextarea v-model:value="state.value" :on-change="onChange" placeholder="Basic usage" />
      </template>

      <template #controls="{ state }">
        <HstText v-model="state.value" title="text value" />
      </template>
    </Variant>

    <Variant
      title="缩放文本域"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          IxProTextarea 组件可以设置 resize 调整可缩放方向，默认为 none。
        </Describe>
        <section class="demo-pro-textarea-resize__wrapper">
          <IxProTextarea :resize="state.resize" :placeholder="state.resize" />
          <IxProTextarea resize="horizontal" placeholder="Resize is set as 'horizontal'" />
          <IxProTextarea resize="both" placeholder="Resize is set as 'both'" />
        </section>
      </template>

      <template #controls="{ state }">
        <HstButtonGroup v-model="state.resize" title="resize" :options="resizeOptions" />
      </template>
    </Variant>

    <Variant
      title="可清除"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          带清除图标的输入框，点击图标清空输入内容。
        </Describe>
        <IxProTextarea :clearable="state.clearable" placeholder="Clearable" />
      </template>

      <template #controls="{ state }">
        <HstCheckbox v-model="state.clearable" title="clearable" />
      </template>
    </Variant>

    <Variant
      title="文本域带数字统计"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          展示字数统计。
        </Describe>
        <IxSpace vertical>
          <IxProTextarea :show-count="state.showCount" placeholder="Textarea showCount" />
          <IxProTextarea :show-count="state.showCount" max-count="100" placeholder="Textarea showCount with maxCount" />
          <IxProTextarea :show-count="state.showCount" :compute-count="computeCount" placeholder="Textarea showCount with computeCount" />
        </IxSpace>
      </template>

      <template #controls="{ state }">
        <HstCheckbox v-model="state.showCount" title="showCount" />
      </template>
    </Variant>

    <Variant
      title="错误信息"
      :init-state="initState"
    >
      <Describe>
        可以使用 errors 指定文本域输入内容的错误信息。
      </Describe>
      <IxProTextarea
        v-model:value="errorValue"
        :errors="errors"
        :on-change="onChangeError"
        :on-blur="onBlur"
        placeholder="Error Message"
      />
    </Variant>

    <Variant
      title="表单内使用"
      :init-state="initState"
    >
      <Describe>
        可以结合 IxForm 使用。
      </Describe>
      <IxForm :control="formGroup" :label-col="4" :control-col="8">
        <IxFormItem label="Rule Name" required>
          <IxInput control="ruleName" placeholder="Please input rule name" />
        </IxFormItem>
        <IxFormItem label="IP List" label-tooltip="Please input IP, IP Range or IP with Prefix, one at each row">
          <IxProTextarea control="IP" :errors="formErrors" :placeholder="ipInputPlaceHolder" />
        </IxFormItem>
      </IxForm>
    </Variant>
  </Story>
</template>

<style scoped lang="less">
:deep(.ix-pro-textarea-scroll-holder) {
  background-color: #fff;
}
.ix-pro-textarea {
  width: 480px;
  height: 210px;
}
.demo-pro-textarea-resize__wrapper {
  .ix-pro-textarea {
    width: 300px;
    height: 230px;
    display: flex;

    &:not(&:first-child) {
      margin-top: 16px;
    }
  }
}
</style>
