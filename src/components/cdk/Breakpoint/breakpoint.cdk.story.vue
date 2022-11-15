<script setup lang="ts">
import { BREAKPOINTS, isMediaMatched, useBreakpoints, useMediaQuery, useSharedBreakpoints } from '@idux/cdk/breakpoint'

const { xs, sm, lg } = BREAKPOINTS
const isXs = isMediaMatched(xs)
const isSmOrLg = isMediaMatched([sm, lg])

const queryState = useMediaQuery('(min-width: 1024px) and (max-width: 1365.99px)')

const queryMap = {
  sm: '(min-width: 768px) and (max-width: 1023.99px)',
  md: '(min-width: 1024px) and (max-width: 1365.99px)',
  lg: '(min-width: 1366px) and (max-width: 1919.99px)',
}
const breakpoints = useBreakpoints(queryMap)

const sharedBreakpoints = useSharedBreakpoints()
</script>

<!-- icon from https://icones.js.org/collection/all?s=breakpoint -->
<template>
  <Story
    title="Breakpoint(断点)"
    icon="codicon:activate-breakpoints"
  >
    <Variant
      title="基本使用"
    >
      <Describe>
        你可以通过调整浏览器窗口来观察各值的变化。
      </Describe>
      <IxSpace>
        <span class="breakpoint-label">isMediaMatched: </span>
        <IxCheckbox disabled :checked="isXs">
          0 ~ 600
        </IxCheckbox>
        <IxCheckbox disabled :checked="isSmOrLg">
          600 ~ 900 or 1280 ~ 1720
        </IxCheckbox>
      </IxSpace>
      <br>
      <IxSpace>
        <span class="breakpoint-label">useMediaQuery: </span>
        <IxCheckbox disabled :checked="queryState.matches">
          1024 ~ 1366
        </IxCheckbox>
      </IxSpace>
      <br>
      <IxSpace>
        <span class="breakpoint-label">useBreakpoints: </span>
        <IxCheckbox disabled :checked="breakpoints.sm">
          768 ~ 1024
        </IxCheckbox>
        <IxCheckbox disabled :checked="breakpoints.md">
          1024 ~ 1366
        </IxCheckbox>
        <IxCheckbox disabled :checked="breakpoints.lg">
          1366 ~ 1920
        </IxCheckbox>
      </IxSpace>
      <br>
      <IxSpace>
        <span class="breakpoint-label">useSharedBreakpoints: </span>
        <IxCheckbox disabled :checked="sharedBreakpoints.xs">
          0 ~ 600
        </IxCheckbox>
        <IxCheckbox disabled :checked="sharedBreakpoints.sm">
          600 ~ 900
        </IxCheckbox>
        <IxCheckbox disabled :checked="sharedBreakpoints.md">
          900 ~ 1280
        </IxCheckbox>
        <IxCheckbox disabled :checked="sharedBreakpoints.lg">
          1280 ~ 1720
        </IxCheckbox>
        <IxCheckbox disabled :checked="sharedBreakpoints.xl">
          1720 ~ more large
        </IxCheckbox>
      </IxSpace>
    </Variant>
  </Story>
</template>

<style scoped>
.breakpoint-label {
  display: inline-block;
  width: 150px;
}
</style>
