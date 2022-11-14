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

export type Enum2Tuple<T, ArrayType, A extends any[] = [], L = GetUnionLength<T>> = A['length'] extends L
  ? A
  : Enum2Tuple<T, ArrayType, Push<A, ArrayType>>
