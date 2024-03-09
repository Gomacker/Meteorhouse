import chroma, { Color } from 'chroma-js'

export enum WorldflipperElement {
  None = -1,
  Fire,
  Water,
  Thunder,
  Wind,
  Light,
  Dark
}

const alpha = 0.8

const __ele2Color: { [p: string]: Color } = {
  [WorldflipperElement.None]: chroma('rgb(105,105,105)').alpha(alpha),
  [WorldflipperElement.Fire]: chroma('rgb(234,53,75)').alpha(alpha),
  [WorldflipperElement.Water]: chroma('rgb(68,137,255)').alpha(alpha),
  [WorldflipperElement.Thunder]: chroma('rgb(244,204,36)').alpha(alpha),
  [WorldflipperElement.Wind]: chroma('rgb(119,217,47)').alpha(alpha),
  [WorldflipperElement.Light]: chroma('rgb(245,255,186)').alpha(alpha),
  [WorldflipperElement.Dark]: chroma('rgb(90,57,95)').alpha(alpha)
}

export const backgroundColor = chroma('rgb(248,248,248)').alpha(alpha)

export function getElementColor(element: WorldflipperElement): Color {
  return __ele2Color[element] || __ele2Color[WorldflipperElement.None]
}

const __race2String: { [p: string]: string } = {
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

export function parseRaces(race: string): string {
  return race
    .split(',')
    .map(value => __race2String[value])
    .join(' / ')
}

const __gender2String: { [p: string]: string } = {
  Female: '女性',
  Male: '男性',
  Unknown: '不明',
  Ririi: '莉莉'
}

export function parseGender(gender: string): string {
  return __gender2String[gender]
}

export enum SpecialityType {
  Knight,
  Fighter,
  Ranged,
  Supporter,
  Special
}