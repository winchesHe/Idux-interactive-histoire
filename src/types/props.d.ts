export {}
declare global {
  type Ref<T = any> = import('vue').Ref<T>
  interface HstControlOption<T = any> {
    label: string
    value: T
  }
}