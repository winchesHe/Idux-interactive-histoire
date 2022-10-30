import { VueStoryComponent, VueVariantComponent } from "@histoire/plugin-vue/components"
import type {
  HstCheckbox,
  HstText,
  HstTextarea,
  HstNumber,
  HstTokenGrid,
  HstTokenList,
  HstColorShades,
  HstRadio,
} from '@histoire/controls'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Story: typeof VueStoryComponent
    Variant: typeof VueVariantComponent
    // Controls
    HstCheckbox: typeof HstCheckbox
    HstText: typeof HstText
    HstTextarea: typeof HstTextarea
    HstNumber: typeof HstNumber
    HstTokenGrid: typeof HstTokenGrid
    HstTokenList: typeof HstTokenList
    HstColorShades: typeof HstColorShades
    HstRadio: typeof HstRadio
  }
}