import type { CdkComponentType, ProCategory, ProComponentType } from '../script/create/constant'
import { componentCollection } from '../script/create/constant'
import type { Enum2Tuple, UnionToArray } from './typeTools'

type CdkTuple = Enum2Tuple<CdkComponentType>
type ProTuple = Enum2Tuple<ProComponentType>
type proKeysTuple = Enum2Tuple<ProCategory>
export type CdkArrayList = UnionToArray<CdkComponentType>
export type ProArrayList = UnionToArray<ProComponentType>

export const getCdkComponents = () => {
  const cdkList: CdkTuple = [] as unknown as CdkTuple
  componentCollection['开发套件'].components.forEach((item) => {
    cdkList.push(item.match(/^\w+/i)?.[0] as any)
  })
  return cdkList
}

export const getProComponents = () => {
  const proList: ProTuple = [] as unknown as ProTuple
  const proKeys = Object.keys(componentCollection['高级组件']) as unknown as proKeysTuple
  proKeys.forEach((itemKeys) => {
    componentCollection['高级组件'][itemKeys].components.forEach((item) => {
      proList.push(item.match(/^\w+/i)?.[0] as any)
    })
  })
  return proList
}
