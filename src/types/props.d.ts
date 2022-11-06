export {}
declare global {
  type Ref<T = any> = import('vue').Ref<T>
  interface HstControlOption {
    label: string
    value: any
  }
}