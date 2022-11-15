<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ProSearchProps, SearchField, SearchItemConfirmContext, SearchValue } from '@idux/pro'
import { logEvent } from 'histoire/client'

type SelectField = SearchField & { type: 'select' }

const selectField = reactive<SelectField>({
  type: 'select',
  label: 'Security State',
  key: 'security_state',
  fieldConfig: {
    multiple: true,
    searchable: true,
    dataSource: [],
  },
  onPanelVisibleChange: (visible) => {
    if (visible) {
      setTimeout(
        () =>
          (selectField.fieldConfig.dataSource = [
            {
              key: 'fatal',
              label: 'fatal',
            },
            {
              key: 'high',
              label: 'high',
            },
            {
              key: 'mediumn',
              label: 'mediumn',
            },
            {
              key: 'low',
              label: 'low',
              disabled: true,
            },
          ]),
        500,
      )
    }
  },
})
const selectSearchFields: SearchField[] = [
  {
    key: 'keyword',
    type: 'input',
    label: 'Keyword',
    multiple: true,
    fieldConfig: {
      trim: true,
    },
  },
  selectField,
]
const value = ref<ProSearchProps['value']>([
  {
    key: 'level',
    name: 'Level',
    operator: '=',
    value: 'level1',
  },
  {
    key: 'security_state',
    name: 'Security State',
    value: ['high', 'low'],
  },
  {
    key: 'keyword',
    name: '',
    value: 'custom keyword',
  },
])

const searchFields: ProSearchProps['searchFields'] = [
  {
    key: 'keyword',
    type: 'input',
    label: 'Keyword',
    multiple: true,
    fieldConfig: {
      trim: true,
    },
  },
  {
    type: 'select',
    label: 'Level',
    key: 'level',
    operators: ['=', '!='],
    defaultOperator: '=',
    fieldConfig: {
      multiple: false,
      searchable: true,
      dataSource: [
        {
          key: 'level1',
          label: 'Level 1',
        },
        {
          key: 'level2',
          label: 'Level 2',
        },
        {
          key: 'level3',
          label: 'Level 3',
        },
      ],
    },
  },
  {
    type: 'select',
    label: 'Security State',
    key: 'security_state',
    fieldConfig: {
      multiple: true,
      searchable: true,
      dataSource: [
        {
          key: 'fatal',
          label: 'fatal',
        },
        {
          key: 'high',
          label: 'high',
        },
        {
          key: 'mediumn',
          label: 'mediumn',
        },
        {
          key: 'low',
          label: 'low',
        },
      ],
    },
  },
  {
    type: 'datePicker',
    label: 'Date',
    key: 'date',
    fieldConfig: {
      type: 'datetime',
    },
  },
  {
    type: 'dateRangePicker',
    label: 'Date Range',
    key: 'date_range',
    fieldConfig: {
      type: 'datetime',
    },
  },
]

const searchValidatorFields: ProSearchProps['searchFields'] = [
  {
    key: 'keyword',
    type: 'input',
    label: 'Keyword',
    multiple: true,
    fieldConfig: {
      trim: true,
    },
    validator(searchValue) {
      if (/[?^<>/+\-=]/.test(searchValue.value))
        return { message: 'keyword mustn\'t contain ?^<>+-=' }
    },
  },
  {
    type: 'datePicker',
    label: 'Creation Time',
    key: 'date',
    operators: ['=', '>', '<'],
    fieldConfig: {
      type: 'datetime',
    },
    validator(searchValue) {
      const { operator, value } = searchValue
      const currentYear = new Date().getFullYear()
      if ((operator === '>' || operator === '=') && value.getFullYear() > currentYear)
        return { message: `cannot select date after year ${currentYear}` }

      if ((operator === '<' || operator === '=') && value.getFullYear() < 2000)
        return { message: 'cannot select date before year 2000' }
    },
  },
]

function initState() {
  return {
    value,
    searchFields,
    searchValidatorFields,
    disabled: true,
    searchValues: [],
    errors: [],
    mergeValue: [
      {
        key: 'level',
        name: 'Level',
        operator: '=',
        value: 'level1',
      },
      {
        key: 'keyword',
        name: '',
        value: 'custom keyword',
      },
    ],
  }
}

const onChange = (value: ProSearchProps['value'] | undefined, oldValue: ProSearchProps['value'] | undefined) => {
  logEvent('onChange', { value, oldValue })
}
const onSearch = ($el: any) => {
  logEvent('onSearch', $el)
}

function onItemConfirm(searchValues: ProSearchProps['value']) {
  return function (context: SearchItemConfirmContext) {
    const { removed, nameInput, operatorInput, valueInput } = context
    if (!removed)
      return

    searchValues!.push({
      key: 'keyword',
      value: (nameInput ?? '') + (operatorInput ?? '') + (valueInput ?? ''),
    })
  }
}
const securityStateField = reactive<SearchField>({
  type: 'select',
  label: 'Security State',
  key: 'security_state',
  multiple: true,
  fieldConfig: {
    multiple: true,
    searchable: true,
    dataSource: [
      {
        key: 'fatal',
        label: 'fatal',
      },
      {
        key: 'high',
        label: 'high',
      },
      {
        key: 'mediumn',
        label: 'mediumn',
      },
      {
        key: 'low',
        label: 'low',
      },
    ],
  },
})
const securitySearchFields: SearchField[] = reactive([
  {
    key: 'keyword',
    type: 'input',
    label: 'Keyword',
    multiple: true,
    fieldConfig: {
      trim: true,
    },
  },
  {
    type: 'select',
    label: 'Level',
    key: 'level',
    operators: ['=', '!='],
    defaultOperator: '=',
    fieldConfig: {
      multiple: false,
      searchable: true,
      dataSource: [
        {
          key: 'level1',
          label: 'Level 1',
        },
        {
          key: 'level2',
          label: 'Level 2',
        },
        {
          key: 'level3',
          label: 'Level 3',
        },
      ],
    },
  },
  securityStateField,
])

const handleValueUpdate = (searchValues: ProSearchProps['value'] | undefined) => {
  const securityStateValues = searchValues?.filter(v => v.key === 'security_state') as
    | SearchValue<string[]>[]
    | undefined

  if (!securityStateValues?.length) {
    value.value = searchValues ?? []
    return
  }

  const currentValue = securityStateValues.pop()!
  value.value = !securityStateValues.length
    ? searchValues!
    : [...searchValues!.filter(v => v.key !== 'security_state'), currentValue]

  securityStateField.defaultValue = currentValue.value
}

interface UserData {
  username: string
  phone: string
  gender: 'male' | 'female'
}

const userReg = /^(\w+)-(male|female): (\d+)$/
const customerSearchFields: SearchField[] = [
  {
    type: 'custom',
    key: 'custom_input',
    label: 'IP Input',
    fieldConfig: {
      parse: (input) => {
        return input.split(',').map(ip => ip.trim())
      },
      format: (value) => {
        if (!value)
          return ''

        return (value as string[]).join(', ')
      },
    },
  },
  {
    type: 'custom',
    key: 'custom_form',
    label: 'User',
    defaultValue: {
      username: 'Kirito',
      gender: 'male',
      phone: '103006',
    },
    inputClassName: 'demo-pro-search-custom-user-form-input',
    fieldConfig: {
      customPanel: 'userForm',
      parse: (input) => {
        const res = input.match(userReg)
        if (!res)
          return

        const username = res[1]
        const gender = res[2]
        const phone = res[3]

        return username || gender || phone
          ? {
              username,
              gender,
              phone,
            }
          : undefined
      },
      format: (value) => {
        if (!value)
          return ''

        const { username, gender, phone } = value as UserData
        return `${username ?? 'username'}-${gender ?? 'gender'}: ${phone ?? 'phone'}`
      },
    },
  },
]
const handleUserFormKeyDown = (evt: KeyboardEvent, confirm: () => void) => {
  if (evt.key === 'Enter')
    confirm()
}
</script>

<!-- icon from https://icones.js.org/collection/all?s=proSearch -->
<template>
  <Story
    title="dataEntry/ProSearch(复合搜素)"
    icon="ic:baseline-manage-search"
    :layout="{ type: 'grid', width: 800 }"
  >
    <!-- eslint-disable vue/attribute-hyphenation -->
    <!-- eslint-disable vue/no-template-shadow -->
    <Variant
      title="基本使用"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          最简单的用法。关键字为默认内置搜索项。
        </Describe>
        <IxProSearch
          v-model:value="state.value"
          style="width: 100%"
          :search-fields="state.searchFields"
          :on-change="onChange"
          :on-search="onSearch"
        />
      </template>
    </Variant>

    <Variant
      title="禁用"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          通过配置 disabled 来禁用搜索
        </Describe>
        <IxProSearch
          v-model:value="state.value"
          :disabled="state.disabled"
          style="width: 100%"
          :search-fields="state.searchFields"
          :on-change="onChange"
        />
      </template>

      <template #controls="{ state }">
        <HstCheckbox v-model="state.disabled" title="disabled" />
      </template>
    </Variant>

    <Variant
      title="非法搜索项处理"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          通过 searchField.validator 校验搜索项。
        </Describe>
        <IxProSearch
          v-model:value="state.searchValues"
          v-model:errors="state.errors"
          style="width: 100%"
          :search-fields="state.searchFields"
          :on-change="onChange"
          :on-search="onSearch"
        />
      </template>
    </Variant>

    <Variant
      title="非法搜索项转换为关键字"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          使用 onItemConfirm 事件将非法搜索项转换为关键字。
        </Describe>
        <IxProSearch
          v-model:value="state.searchValues"
          style="width: 100%"
          :search-fields="state.searchFields"
          :on-change="onChange"
          :on-search="onSearch"
          :on-item-confirm="onItemConfirm"
        />
      </template>
    </Variant>

    <Variant
      title="合并同类选项"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          合并同类选项并置于尾部。
        </Describe>
        <IxProSearch
          :value="state.mergeValue"
          style="width: 100%"
          :search-fields="securitySearchFields"
          :on-search="onSearch"
          :onUpdate:value="handleValueUpdate"
        />
      </template>
    </Variant>

    <Variant
      title="自定义搜索项"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          通过 'custom' 类型的option自定义搜索项。
        </Describe>
        <IxProSearch
          v-model:value="state.searchValue"
          style="width: 100%"
          :searchFields="customerSearchFields"
          :onChange="onChange"
          :onSearch="onSearch"
          overlayContainer="demo-pro-search-custom"
        >
          <template #userForm="{ setValue, ok, value }">
            <IxSpace class="demo-pro-search-custom-user-form" vertical>
              <IxSpace>
                <label class="label">username: </label>
                <IxInput
                  class="value"
                  :value="value?.username"
                  :onChange="input => setValue({ ...(value ?? {}), username: input })"
                  :onKeydown="evt => handleUserFormKeyDown(evt, ok)"
                />
              </IxSpace>
              <IxSpace>
                <label class="label">gender: </label>
                <IxSelect
                  class="value"
                  overlayContainer="demo-pro-search-custom"
                  :value="value?.gender"
                  :onChange="gender => setValue({ ...(value ?? {}), gender })"
                  :onKeydown="evt => handleUserFormKeyDown(evt, ok)"
                >
                  <IxSelectOption key="male" value="male">
                    male
                  </IxSelectOption>
                  <IxSelectOption key="female" value="female">
                    female
                  </IxSelectOption>
                </IxSelect>
              </IxSpace>
              <IxSpace>
                <label class="label">phone: </label>
                <IxInput
                  class="value"
                  :value="value?.phone"
                  :onChange="input => setValue({ ...(value ?? {}), phone: input })"
                  :onKeydown="evt => handleUserFormKeyDown(evt, ok)"
                />
              </IxSpace>
            </IxSpace>
          </template>
        </IxProSearch>
      </template>
    </Variant>

    <Variant
      title="面板展开时加载数据"
      :init-state="initState"
    >
      <template #default="{ state }">
        <Describe>
          使用 searchField.onVisibleChange 在面板展开时加载数据。
        </Describe>
        <IxProSearch v-model:value="state.searchValues" style="width: 100%" :searchFields="selectSearchFields" />
      </template>
    </Variant>
  </Story>
</template>

<style scoped>
.demo-pro-search-custom-user-form {
  height: 200px;
  padding: 8px;
  box-shadow: inset 0 0 2px #684545;
}
.demo-pro-search-custom-user-form .label {
  display: inline-block;
  width: 70px;
}
.demo-pro-search-custom-user-form .value {
  width: 200px;
}
.demo-pro-search-custom-user-form-input {
  min-width: 305px;
  color: #684545;
  text-align: center;
}
</style>
