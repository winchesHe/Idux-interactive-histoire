export type ValueOf<T> = T[keyof T]

export type NonEmptyArray<T> = [T, ...T[]]

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never

export type UnionToArray<T, U extends NonEmptyArray<T> = NonEmptyArray<T>> = MustInclude<T, U>

export type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => any) ? I : never

export type GetUnionLastValue<T> = UnionToIntersection<(T extends any ? () => T : never)> extends (() => infer R) ? R : never

export type GetUnionLength<T, C extends any[] = [], K = GetUnionLastValue<T>> = [T] extends [never]
  ? C['length']
  : GetUnionLength<Exclude<T, K>, [K, ...C]>
  type Push<T extends any[], U> = [...T, U]

export type Enum2Tuple<T, ArrayType = T, A extends any[] = [], L = GetUnionLength<T>> = A['length'] extends L
  ? A
  : Enum2Tuple<T, ArrayType, Push<A, ArrayType>>

export type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never
}

export type UnionObjectKeysToObject<T, A extends any[] = [], O = {}, L = GetUnionLength<T>, V = GetUnionLastValue<T>> = A['length'] extends L
  ? O
  : UnionObjectKeysToObject<Exclude<T, V>, Push<A, V>, Merge<O, V>, L>
