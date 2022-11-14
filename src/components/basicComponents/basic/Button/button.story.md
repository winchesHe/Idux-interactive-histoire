### IxButton

#### ButtonProps

> 当 `mode` 不为 `link` 时，除以下表格之外还支持原生 `button` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)。  
> 当 `mode` 为 `link` 时，除以下表格之外还支持原生 `a` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `block` | 将按钮宽度调整为自适应其父元素的宽度 | `boolean` | - | - |- |
| `danger` | 设置危险状态 | `boolean` | - | - |- |
| `disabled` | 设置禁用状态 | `boolean` | - | - |- |
| `ghost` | 设置幽灵状态 | `boolean` | - | - |- |
| `icon` | 设置图标类型 | `string` | - | - | `loading` 为 `true` 时无效 |
| `loading` | 设置加载中状态 | `boolean` |  - | - |- |
| `mode` | 设置按钮种类 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'default'` | - |- |
| `shape` | 设置按钮形状 | `'square' \| 'circle' \| 'round'` | - | - |- |
| `size` | 设置按钮大小 | `'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'` | `'md'` | - |- |
| `type` | 原生 `button` 的 `type` 属性 | `'button' \| 'submit' \| 'reset'` | `'button'` | - | 参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) |

#### ButtonSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `icon` | 自定义图标 | - | - |

### IxButtonGroup

#### ButtonGroupProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `gap` | 设置按钮组的 gap 配置 | `number \| string` | - | - | 兼容性问题参见: [Can I use](https://caniuse.com/flexbox-gap) |
| `mode` | 设置组内按钮种类 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | - | - |- |
| `shape` | 设置组内按钮形状 | `'circle' \| 'round'` | - | - |- |
| `size` | 设置组内按钮大小 | `'lg' \| 'md' \| 'sm'` | - | - |- |

### 使用场景

使用简单的按钮执行特定操作，例如：新增、编辑、保存、确定，取消。

- 使用主按钮为按钮集合的主要操作。
- 次要按钮应使用不那么显性的颜色。
- 按钮大小很重要-确保按钮的大小足够大，可以方便快捷的进行交互，但不要太大，以免在视觉上压倒一切。
- 使用动作动词或短语告诉用户接下来会发生什么。

### 组件类型

#### 按样式分类

| 名称 | 说明  |
| --- | ---  |
| 主按钮 | 用于适配一些固定的组合型的输入 |
| 默认按钮 | 用于没有主次之分的一组行动 |
| 虚线按钮 | 常用于添加操作 |
| 文本按钮 | 用于最次级的行动点 |
| 链接按钮 | 用于次要或外链的行动点 |

#### 按状态分类

| 名称 | 说明  |
| --- | ---  |
| 禁用状态 | 行动点不可用的时候，一般需要文案解释 |
| 加载中状态 | 用于异步操作等待反馈的时候，也可以避免多次提交 |
| 危险按钮 | 删除/移动/修改权限等危险操作，一般需要二次确认 |
| 幽灵按钮 | 用于背景色比较复杂的地方，常用在首页/产品页等展示场景 |

#### 按尺寸分类

| 名称 | 说明  |
| --- | ---  |
| 超小尺寸 | 最小尺寸的按钮，一般用在下拉框或容器较小的场景中使用 |
| 小尺寸 | 一般用在紧凑型的场景中 |
| 中尺寸 | 默认的支持，适用于大多数场景 |
| 大尺寸 | 一般用在信息密度较低的注册等页面 |
| 超大尺寸 | 登录页或运营类页面使用 |

#### 纯图标按钮

仅当图标隐喻易于识别，且在全球具有相同的含义，才使用图标按钮
