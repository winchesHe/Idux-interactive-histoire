import { HstRadio } from '@histoire/controls'
import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HstRadio: typeof HstRadio
  }
}
