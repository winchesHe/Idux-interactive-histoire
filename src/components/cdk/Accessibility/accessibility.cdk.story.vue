<script setup lang="ts">
import type { FocusOrigin } from '@idux/cdk/a11y'

const element = ref<HTMLElement>()
const subtree = ref<HTMLElement>()

const elementOrigin = ref<FocusOrigin>(null)
const subtreeOrigin = ref<FocusOrigin>(null)

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
