<script setup lang="ts">
import type { FocusOrigin } from '@idux/cdk/a11y'
import { useSharedFocusMonitor } from '@idux/cdk/a11y'
import { logEvent } from 'histoire/client'

const element = ref<HTMLElement>()
const subtree = ref<HTMLElement>()

const elementOrigin = ref<FocusOrigin>(null)
const subtreeOrigin = ref<FocusOrigin>(null)

const focusMonitor = useSharedFocusMonitor()

onMounted(() => {
  setInterval(() => {
    if (elementOrigin.value)
      focusMonitor.blurVia(element.value)

    else
      focusMonitor.focusVia(element.value, 'program')
  }, 3000)

  watch(focusMonitor.monitor(element), ({ origin, event }) => {
    elementOrigin.value = origin
    logEvent('focus', { origin, event })
  })

  watch(focusMonitor.monitor(subtree, true), ({ origin, event }) => {
    subtreeOrigin.value = origin
    logEvent('focus', { origin, event })
  })
})

onBeforeUnmount(() => {
  focusMonitor.stopMonitoring(element)
  focusMonitor.stopMonitoring(subtree)
})
function initState() {
  return {
    value: 'default',
  }
}
</script>

<!-- icon from https://icones.js.org/collection/all?s=accessibility -->
<template>
  <Story
    title="Accessibility(无障碍性)"
    icon="icomoon-free:accessibility"
  >
    <Variant
      title="焦点管理器"
      :init-state="initState"
    >
      <Describe>
        FocusMonitor 可以用来监听元素焦点状态的变化。

        你可以尝试使用鼠标或者键盘来获取按钮的焦点。
      </Describe>
      <div class="example-focus-monitor">
        <IxButton ref="element" ghost>
          Focus Monitored Element ({{ elementOrigin }})
        </IxButton>
      </div>
      <div class="example-focus-monitor">
        <div ref="subtree">
          <p>Focus Monitored Subtree ({{ subtreeOrigin }})</p>
          <IxButton ghost>
            Child Button 1
          </IxButton>
          <IxButton ghost>
            Child Button 2
          </IxButton>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.example-focus-monitor {
  background-color: #a3a3a3;
  padding: 20px;
}
.example-focus-monitor .cdk-mouse-focused {
  background: #1c6eff;
}

.example-focus-monitor .cdk-keyboard-focused {
  background: #39c317;
}

.example-focus-monitor .cdk-touch-focused {
  background: #d619be;
}

.example-focus-monitor .cdk-program-focused {
  background: #f52727;
}

.example-focus-monitor .ix-button {
  margin-right: 12px;
}
</style>
