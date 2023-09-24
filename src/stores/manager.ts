import chroma from 'chroma-js'
import { Element, SpecialityType } from '@/anise/worldflipper/object'

export const gender2zh: any = {
  Female: '女性',
  Male: '男性',
  Unknown: '不明',
  Ririi: '莉莉'
}
export const type2zh: any = {
  [SpecialityType.Knight]: '剑士',
  [SpecialityType.Fighter]: '格斗',
  [SpecialityType.Ranged]: '射击',
  [SpecialityType.Supporter]: '辅助',
  [SpecialityType.Special]: '特殊'
}
export const race2zh: any = {
  Human: '人',
  Beast: '兽',
  Mystery: '妖',
  Element: '精灵',
  Dragon: '龙',
  Machine: '机械',
  Devil: '魔',
  Plants: '植物',
  Aquatic: '水栖',
  Undead: '不死'
}
export const ele2color = {
  [Element.None]: chroma('rgb(68,68,68)'),
  [Element.Fire]: chroma('rgb(234,53,75)'),
  [Element.Water]: chroma('rgb(68,137,255)'),
  [Element.Thunder]: chroma('rgb(244,204,36)'),
  [Element.Wind]: chroma('rgb(119,217,47)'),
  [Element.Light]: chroma('rgb(244,255,186)'),
  [Element.Dark]: chroma('rgb(90,57,95)')
}
export const ele2name = {
  [Element.None]: '无属性',
  [Element.Fire]: '火属性',
  [Element.Water]: '水属性',
  [Element.Thunder]: '雷属性',
  [Element.Wind]: '风属性',
  [Element.Light]: '光属性',
  [Element.Dark]: '暗属性'
}
export const ele_id2ele = {
  [Element.None]: 'none',
  [Element.Fire]: 'fire',
  [Element.Water]: 'water',
  [Element.Thunder]: 'thunder',
  [Element.Wind]: 'wind',
  [Element.Light]: 'light',
  [Element.Dark]: 'dark'
}
