## API

### FocusMonitor

监视鼠标和键盘事件以确定焦点事件的原因。

```ts
export interface FocusMonitor {
  /**
   * 监视元素的焦点，并应用适当的 CSS 类
   *
   * @param element 要监听的元素
   * @param checkChildren 当子元素获得焦点时是否要计入这个焦点
   * @returns 会在元素的焦点状态更改时发出新值的计算属性
   */
  monitor(element: ElementType, checkChildren?: boolean): ComputedRef<FocusMonitorEvent>

  /**
   * 停止监听元素的焦点，并移除所有被添加的 CSS 类
   *
   * @param element 停止监听的元素
   */
  stopMonitoring(element: ElementType): void

  /**
   * 通过指定的焦点来源对元素进行聚焦
   *
   * @param element 要获取焦点的元素
   * @param origin 焦点来源
   * @param options 可用于配置焦点行为的参数
   */
  focusVia(element: ElementType, origin: FocusOrigin, options?: FocusOptions): void

  /**
   * 让元素失去焦点.
   *
   * @param element 要失去焦点的元素.
   */
  blurVia: (element: ElementType) => void
}

/**
 * 元素的类型
 */
type ElementType = Ref<ComponentPublicInstance | HTMLElement> | ComponentPublicInstance | HTMLElement

export interface FocusMonitorEvent {
  /**
   * 焦点来源
   *
   * **mouse**: 表示该元素是通过鼠标获得焦点的
   * **keyboard**: 表示该元素是通过键盘获得焦点的
   * **touch**: 表示该元素是通过触摸屏获得焦点的
   * **program**: 表示该元素是通过编程方式获得焦点的
   * **null**: 表示该元素失去了焦点
   */
  origin: FocusOrigin

  /**
   * 焦点事件，如果焦点由 `focusVia` 触发，它可能是 `undefined`
   */
  event?: FocusEvent
}
```

#### useFocusMonitor

创建一个焦点管理器。

```ts
export function useFocusMonitor(options?: FocusMonitorOptions): FocusMonitor

export interface FocusMonitorOptions {
  /**
   * 用于指定焦点事件来源的检测模式。
   *
   * **immediate**: 任何在前一个标记或当前标记中发生的鼠标下拉、按下或触摸开始事件都将更新焦点事件的来源(鼠标、键盘或触摸)。这是默认的配置。
   *
   * **eventual**: 焦点事件的来源总是最后一个相应的鼠标按下、按下或触摸开始事件，无论它发生在多久以前。
   */
  detectionMode?: FocusMonitorDetectionMode

  /**
   * 用于指定检测用户输入模式的探测器。
   *
   * 如果不指定，默认会使用 `useSharedInputModalityDetector` 创建一个全局的探测器。
   */
  inputModalityDetector?: InputModalityDetector
}
```

#### useSharedFocusMonitor

通过 `createSharedComposable` 创建的全局共享的 `useFocusMonitor`。

```ts
export const useSharedFocusMonitor: () => FocusMonitor
```

## FAQ

### 更多的使用细节和文档？

参见 [material.angular.cn](https://material.angular.cn/cdk/a11y/overview)

`@idux/cdk/a11y` 提供了许多提高无障碍性（可访问性）的工具。

## FocusMonitor（焦点管理器）

`FocusMonitor` 可以用来监听元素焦点状态的变化。

它比单纯监听 focus 或 blur 事件更有意义，因为它会告诉你该元素是如何获得焦点的（通过鼠标，键盘，触摸或编程方式）。如果需要，它还允许监听各级子元素。

要监听某个元素的焦点变化，可以调用 `monitor` 方法, 指定要监控的元素(`element`)和是否检查子元素(`checkChildren`)。如果 `checkChildren` 为 `true`, 那么该元素的任何各级子元素有焦点，就认为该元素有焦点。 `monitor` 方法返回的是一个计算属性 `FocusMonitorEvent`, 当焦点状态改变时，会得到一个新的值。

`FocusMonitor` 还会自动对有焦点的元素元素应用一些 CSS 类。如果该元素拥有焦点，它会添加 `.cdk-focused` 类，并进一步添加 `.cdk-${origin}-focused` 类来表明元素是如何获得焦点的 (`origin` 是 `mouse`、`keyboard`、`touch` 或 `program` 之一)。
