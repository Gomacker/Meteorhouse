import { Character, Equipment } from '@/anise/worldflipper/object'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import type { WorldflipperObject } from '@/stores/worldflipper'
import { reactive } from 'vue'

let worldflipper: any

function getWorldflipper() {
  return worldflipper || (worldflipper = useWorldflipperDataStore())
}

export class Union {
  constructor(
    private _main: number | null,
    private _unison: number | null,
    private _equipment: number | null,
    private _core: number | null
  ) {
  }

  static load(data: number[]): Union {
    return new this(data[0] || null, data[1] || null, data[2] || null, data[3] || null)
  }

  dump(): any {
    return [this._main, this._unison, this._equipment, this._core]
  }

  get main(): Character | undefined {
    return getWorldflipper().characters.get(String(this._main))
  }

  set main(character: Character | number | null | undefined) {
    if (typeof character === 'number') this._main = character
    else this._main = character?.id ? parseInt(character.id) : null
  }

  get unison(): Character | undefined {
    return getWorldflipper().characters.get(String(this._unison))
  }

  set unison(character: Character | number | null | undefined) {
    if (typeof character === 'number') this._unison = character
    else this._unison = character?.id ? parseInt(character.id) : null
  }

  get equipment(): Equipment | undefined {
    return getWorldflipper().equipments.get(String(this._equipment))
  }

  set equipment(equipment: Equipment | number | null | undefined) {
    if (typeof equipment === 'number') this._equipment = equipment
    else this._equipment = equipment?.id ? parseInt(equipment.id) : null
  }

  get core(): Equipment | undefined {
    return getWorldflipper().equipments.get(String(this._core))
  }

  set core(equipment: Equipment | number | null | undefined) {
    if (typeof equipment === 'number') this._core = equipment
    else this._core = equipment?.id ? parseInt(equipment.id) : null
  }
}

export interface PartyPosition {
  unionIndex: number
  positionIndex: number
}

export class Party {
  public union1: Union
  public union2: Union
  public union3: Union

  constructor(
    union1: Union | number[] | null,
    union2: Union | number[] | null,
    union3: Union | number[] | null
  ) {
    this.union1 = Party.parseUnion(union1)
    this.union2 = Party.parseUnion(union2)
    this.union3 = Party.parseUnion(union3)
  }

  union(i: number): Union | undefined {
    switch (i) {
      case 1:
        return this.union1
      case 2:
        return this.union2
      case 3:
        return this.union3
      default:
        return undefined
    }
  }

  static parseUnion(union: Union | Array<number> | null): Union {
    if (!union) return new Union(null, null, null, null)
    if (union instanceof Union) return union
    else return Union.load(union)
  }

  static empty(): Party {
    return new Party(null, null, null)
  }

  static load(data: any): Party {
    return data ? new Party(data['union1'], data['union2'], data['union3']) : Party.empty()
  }

  static readOriginMb2(data: Array<any>): Manaboard2Values {
    const nodes = data
      .map((value) => String(value['mana_node_multiplied_id']))
      .map((value) => value.substring(value.length - 3, value.length))
    let ab4level: number | undefined = nodes.filter((value) =>
      ['401', '402', '403', '404', '405', '406'].includes(value)
    ).length
    ab4level = ab4level ? ab4level - 1 : undefined
    let ab5level: number | undefined = nodes.filter((value) =>
      ['407', '408', '409', '410', '411', '412'].includes(value)
    ).length
    ab5level = ab5level ? ab5level - 1 : undefined
    let ab6level: number | undefined = nodes.filter((value) =>
      ['413', '414', '415', '416', '417', '418'].includes(value)
    ).length
    ab6level = ab6level ? ab6level - 1 : undefined
    return { ability4: ab4level, ability5: ab5level, ability6: ab6level }
  }

  dump(): any {
    return {
      union1: this.union1.dump(),
      union2: this.union2.dump(),
      union3: this.union3.dump()
    }
  }

  set(position: PartyPosition, object: WorldflipperObject) {
    const union = this.union(position.unionIndex)
    if (union) {
      switch (position.positionIndex) {
        case 0:
          if (object instanceof Character || object === null || object === undefined) {
            union.main = object as Character | null | undefined
            return true
          }
          break
        case 1:
          if (object instanceof Character || object === null || object === undefined) {
            union.unison = object as Character | null | undefined
            return true
          }
          break
        case 2:
          if (object instanceof Equipment || object === null || object === undefined) {
            union.equipment = object as Equipment | null | undefined
            return true
          }
          break
        case 3:
          if (object instanceof Equipment || object === null || object === undefined) {
            union.core = object as Equipment | null | undefined
            return true
          }
          break
      }
      return false
    }
  }

  get(position: PartyPosition): WorldflipperObject {
    const union = this.union(position.unionIndex)
    if (union) {
      switch (position.positionIndex) {
        case 0:
          return union.main
        case 1:
          return union.unison
        case 2:
          return union.equipment
        case 3:
          return union.core
      }
    }
  }
}

export class PartyRelease {
  protected params: Map<string, PartyParam> = new Map<string, PartyParam>()
  public partyCode: string | undefined

  constructor(
    public party: Party,
    params: Array<PartyParam>,
    public title?: string,
    public id?: string,
    public updater_id?: string
  ) {
    params.filter((value) => value).forEach((value) => this.setParam(value))
  }

  getParam(id_: string): PartyParam | undefined {
    return this.params.get(id_)
  }

  removeParam(id_: string) {
    this.params.delete(id_)
  }

  setParam(param: PartyParam) {
    param.isEmpty() ? this.removeParam(param.__type) : this.params.set(param.__type, param)
  }

  static empty(): PartyRelease {
    return new PartyRelease(Party.empty(), [])
  }

  static load(data: any): PartyRelease {
    const party = Party.load(data['party'])
    const pr = new PartyRelease(party, this.loadParams(data['params']))
    pr.title = data['title'] || ''
    pr.id = data['id']
    pr.updater_id = data['updater_id']
    pr.party = Party.load(data['party'])
    return pr
  }

  static loadParams(data: any): PartyParam[] {
    if (!data) return []
    const params: PartyParam[] = []
    if (data['manaboard2']) {
      const ppm2 = PartyParamManaboard2.load(data['manaboard2'])
      if (ppm2) params.push(ppm2)
    }
    if (data['ex']) {
      const ppe = PartyParamEx.load(data['ex'])
    }
    if (data['replacement']) {
      /* empty */
    }
    return params
  }

  dump(for_update: boolean = false): any {
    const base = {
      party: this.party.dump(),
      params: Array.from(this.params.values()).reduce((obj: any, value) => {
        obj[value.__type] = value.dump()
        return obj
      }, {})
    }
    return for_update ? { ...base, title: this.title } : base
  }
}

export class PartyEditor {
  selectedObject: WorldflipperObject
  selectedPosition?: PartyPosition
  release: PartyRelease

  constructor(release: PartyRelease) {
    this.release = release
  }

  init() {
    this.selectedObject = undefined
    this.release = PartyRelease.empty()
  }

  exchangePosition(position1: PartyPosition, position2: PartyPosition) {
    const party = this.release.party
    const obj1 = party.get(position1)
    const obj2 = party.get(position2)
    party.set(position2, obj1)
    party.set(position1, obj2)
    const ppm2 = this.release.getParam('manaboard2') as PartyParamManaboard2 | undefined
    if (ppm2) {
      const mb1 = ppm2.get(position1)
      const mb2 = ppm2.get(position2)
      mb1 && ppm2.set(position2, mb1)
      mb2 && ppm2.set(position1, mb2)
    }
  }

  clearSelection() {
    this.selectedObject = undefined
    this.selectedPosition = undefined
  }

  private isSameType(position1: PartyPosition, position2: PartyPosition) {
    return (position1.positionIndex & 2) === (position2.positionIndex & 2)
    // return ((a & 2) >> 1) === ((b & 2) >> 1)
    // return position1.positionIndex / 2
  }

  selectPosition(position: PartyPosition) {
    if (this.selectedPosition) {
      if (this.verifyPosition(position)) this.selectedPosition = undefined
      else {
        if (this.isSameType(this.selectedPosition, position)) {
          const obj1 = this.release.party.get(this.selectedPosition)
          const obj2 = this.release.party.get(position)
          if (obj1 || obj2) {
            this.exchangePosition(this.selectedPosition, position)
            this.clearSelection()
          } else {
            this.selectedPosition = position
          }
        } else this.selectedPosition = position
      }
    } else {
      if (this.selectedObject === undefined) {
        this.selectedPosition = position
      } else {
        this.release.party.set(position, this.selectedObject)
        this.clearSelection()
      }
    }
  }

  selectObject(object: WorldflipperObject) {
    if (this.selectedObject || this.selectedObject === null) {
      if (this.selectedObject === object) this.selectedObject = undefined
      else this.selectedObject = object
    } else {
      if (!this.selectedPosition) {
        this.selectedObject = object
      } else {
        this.release.party.set(this.selectedPosition, object)
        this.selectedPosition = undefined
      }
    }
  }

  verifyPosition(position: PartyPosition): boolean {
    return !!(
      this.selectedPosition &&
      this.selectedPosition.positionIndex === position.positionIndex &&
      this.selectedPosition.unionIndex === position.unionIndex
    )
  }

  getRepeats() {
    const characterRepeat = [
      this.release.party.union1.main?.id,
      this.release.party.union2.main?.id,
      this.release.party.union3.main?.id,
      this.release.party.union1.unison?.id,
      this.release.party.union2.unison?.id,
      this.release.party.union3.unison?.id
    ]
    const indexes = [
      { unionIndex: 1, positionIndex: 0 },
      { unionIndex: 2, positionIndex: 0 },
      { unionIndex: 3, positionIndex: 0 },
      { unionIndex: 1, positionIndex: 1 },
      { unionIndex: 2, positionIndex: 1 },
      { unionIndex: 3, positionIndex: 1 }
    ]

    interface TempRepeater {
      cache: WorldflipperObject[]
      repeat: Set<PartyPosition>
    }

    const repeater = indexes.reduce(
      (acc: TempRepeater, val) => {
        const v = this.release.party.get(val)
        if (v !== undefined) {
          if (acc.cache.includes(v)) {
            acc.repeat.add(val)
            acc.repeat.add(indexes[acc.cache.indexOf(v)])
          }
        }
        acc.cache.push(v)
        return acc
      },
      { cache: [], repeat: new Set<PartyPosition>() }
    )
    return repeater.repeat
  }
}

export abstract class PartyParam {
  abstract readonly __type: string

  abstract dump(): any

  static load(data: any): PartyParam | undefined {
    return undefined
  }

  abstract isEmpty(): boolean
}

export interface Manaboard2Values {
  ability4?: number
  ability5?: number
  ability6?: number
}

export class PartyParamManaboard2 extends PartyParam {
  readonly __type: string = 'manaboard2'
  private readonly union1: Manaboard2Values[]
  private readonly union2: Manaboard2Values[]
  private readonly union3: Manaboard2Values[]

  constructor(
    union1?: Manaboard2Values[],
    union2?: Manaboard2Values[],
    union3?: Manaboard2Values[]
  ) {
    super()
    this.union1 = union1 || [{}, {}]
    this.union2 = union2 || [{}, {}]
    this.union3 = union3 || [{}, {}]
  }

  set(position: PartyPosition, mb2: Manaboard2Values) {
    if ([0, 1].includes(position.positionIndex)) {
      switch (position.unionIndex) {
        case 1:
          this.union1[position.positionIndex] = mb2
          return
        case 2:
          this.union2[position.positionIndex] = mb2
          return
        case 3:
          this.union3[position.positionIndex] = mb2
          return
      }
    }
    return
  }

  get(position: PartyPosition): Manaboard2Values | undefined {
    if ([0, 1].includes(position.positionIndex)) {
      switch (position.unionIndex) {
        case 1:
          return this.union1[position.positionIndex] || {}
        case 2:
          return this.union2[position.positionIndex] || {}
        case 3:
          return this.union3[position.positionIndex] || {}
      }
    }
    return
  }

  dump(): { [key in 'union1' | 'union2' | 'union3']: number[][] } {
    const dumpFunc = (value: Manaboard2Values) => [
      value.ability4 ?? -1,
      value.ability5 ?? -1,
      value.ability6 ?? -1
    ]
    return {
      union1: this.union1.map(dumpFunc),
      union2: this.union2.map(dumpFunc),
      union3: this.union3.map(dumpFunc)
    }
  }

  static load(data: any): PartyParam | undefined {
    const loadFunc = (value: Array<number | undefined>) => {
      const a4 =
        typeof value[0] === 'number' && value[0] <= 5 && value[0] >= 0 ? value[0] : undefined
      const a5 =
        typeof value[1] === 'number' && value[1] <= 5 && value[1] >= 0 ? value[1] : undefined
      const a6 =
        typeof value[2] === 'number' && value[2] <= 5 && value[2] >= 0 ? value[2] : undefined
      return { ability4: a4, ability5: a5, ability6: a6 }
    }
    const ppm2 = new PartyParamManaboard2(
      (data['union1'] as Array<Array<number | undefined>>).map(loadFunc),
      (data['union2'] as Array<Array<number | undefined>>).map(loadFunc),
      (data['union3'] as Array<Array<number | undefined>>).map(loadFunc)
    )
    if (!ppm2 || ppm2.isEmpty()) return undefined
    else return ppm2
  }

  isEmpty(): boolean {
    const unions = [this.union1, this.union2, this.union3]

    return unions.every((union) => {
      const abilityIndices = [0, 1]
      return abilityIndices.every((index) => {
        const { ability4, ability5, ability6 } = union[index]
        return [ability4, ability5, ability6].every((ability) => ability === undefined)
      })
    })
  }
}

export interface ExAbility {
  id: ExAType | ExBType
  name: string
  imageSrc: string
}

type ExAType =
  | 'atk_self'
  | 'skilldamage_self'
  | 'directdamage_self'
  | 'abilitydagame_self'
  | 'atk_party'
  | 'skilldamage_party'
  | 'directdamage_party'
  | 'abilitydagame_party'
  | 'powerflipdamage'
  | 'hp_self'

type ExBType =
  | 'atk_buffextend_self'
  | 'skilldamage_buffextend_self'
  | 'directdamage_buffextend_self'
  | 'abilitydagame_buffextend_self'
  | 'powerflipdamage_buffextend'
  | 'piercing_buffextend'
  | 'flying_buffextend'
  | 'feverpoint_self'
  | 'fevertime_extend'
  | 'initial_skillgauge_self'
  | 'skillgagemax_self'

export const exAAbilities: { [K in ExAType]: ExAbility } = {
  atk_self: {
    id: 'atk_self',
    imageSrc: '/assets/worldflipper/icon/ex10.png',
    name: '自身攻击力提升'
  },
  skilldamage_self: {
    id: 'skilldamage_self',
    imageSrc: '/assets/worldflipper/icon/ex11.png',
    name: '自身技能伤害提升'
  },
  directdamage_self: {
    id: 'directdamage_self',
    imageSrc: '/assets/worldflipper/icon/ex12.png',
    name: '自身直接攻击伤害提升'
  },
  abilitydagame_self: {
    id: 'abilitydagame_self',
    imageSrc: '/assets/worldflipper/icon/ex13.png',
    name: '自身能力伤害提升'
  },
  atk_party: {
    id: 'atk_party',
    imageSrc: '/assets/worldflipper/icon/ex14.png',
    name: '己方全体攻击力提升'
  },
  skilldamage_party: {
    id: 'skilldamage_party',
    imageSrc: '/assets/worldflipper/icon/ex15.png',
    name: '己方全体技能伤害提升'
  },
  directdamage_party: {
    id: 'directdamage_party',
    imageSrc: '/assets/worldflipper/icon/ex16.png',
    name: '己方全体直接攻击伤害提升'
  },
  abilitydagame_party: {
    id: 'abilitydagame_party',
    imageSrc: '/assets/worldflipper/icon/ex17.png',
    name: '己方全体能力伤害提升'
  },
  powerflipdamage: {
    id: 'powerflipdamage',
    imageSrc: '/assets/worldflipper/icon/ex18.png',
    name: '强化弹射伤害提升'
  },
  hp_self: {
    id: 'hp_self',
    imageSrc: '/assets/worldflipper/icon/ex19.png',
    name: '自身HP提升'
  }
}

export const exBAbilities: { [K in ExBType]: ExAbility } = {
  atk_buffextend_self: {
    id: 'atk_buffextend_self',
    imageSrc: '/assets/worldflipper/icon/ex20.png',
    name: '攻击力提升效果时间'
  },
  skilldamage_buffextend_self: {
    id: 'skilldamage_buffextend_self',
    imageSrc: '/assets/worldflipper/icon/ex21.png',
    name: '技能伤害提升效果时间'
  },
  directdamage_buffextend_self: {
    id: 'directdamage_buffextend_self',
    imageSrc: '/assets/worldflipper/icon/ex22.png',
    name: '直接攻击伤害提升效果时间'
  },
  abilitydagame_buffextend_self: {
    id: 'abilitydagame_buffextend_self',
    imageSrc: '/assets/worldflipper/icon/ex23.png',
    name: '能力伤害提升效果时间'
  },
  powerflipdamage_buffextend: {
    id: 'powerflipdamage_buffextend',
    imageSrc: '/assets/worldflipper/icon/ex24.png',
    name: '强化弹射伤害提升效果时间'
  },
  piercing_buffextend: {
    id: 'piercing_buffextend',
    imageSrc: '/assets/worldflipper/icon/ex25.png',
    name: '贯穿效果时间'
  },
  flying_buffextend: {
    id: 'flying_buffextend',
    imageSrc: '/assets/worldflipper/icon/ex26.png',
    name: '浮游效果时间'
  },
  feverpoint_self: {
    id: 'feverpoint_self',
    imageSrc: '/assets/worldflipper/icon/ex27.png',
    name: '攻击造成的fever增长率'
  },
  fevertime_extend: {
    id: 'fevertime_extend',
    imageSrc: '/assets/worldflipper/icon/ex28.png',
    name: 'fever效果时间'
  },
  initial_skillgauge_self: {
    id: 'initial_skillgauge_self',
    imageSrc: '/assets/worldflipper/icon/ex29.png',
    name: '技能槽'
  },
  skillgagemax_self: {
    id: 'skillgagemax_self',
    imageSrc: '/assets/worldflipper/icon/ex2a.png',
    name: '最大技能槽'
  }
}

type characterEx = { exA: ExAType; exB: ExBType }
type unionEx = { main?: characterEx; unison?: characterEx }

export class PartyParamEx extends PartyParam {
  readonly __type: string = 'ex'

  private union1: unionEx = {}
  private union2: unionEx = {}
  private union3: unionEx = {}

  constructor() {
    super()
  }

  set(position: PartyPosition, exPosition: 'exA' | 'exB') {
    if (position.positionIndex & 2) return
    switch (position.unionIndex) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }

  }

  dump(): {
    [key in 'union1' | 'union2' | 'union3']: unionEx
  } | undefined {
    if (this.isEmpty()) {
      return undefined // 如果 isEmpty 返回 true，则直接返回 undefined
    }

    return {
      union1: this.union1,
      union2: this.union2,
      union3: this.union3
    }
  }

  static load(data: any): PartyParamEx | undefined {
    if (!data) {
      return undefined // 如果传入的 data 为空或者 undefined，则返回 undefined
    }

    const loadedPartyParam = new PartyParamEx()

    if (data.union1) {
      loadedPartyParam.union1 = data.union1
    }

    if (data.union2) {
      loadedPartyParam.union2 = data.union2
    }

    if (data.union3) {
      loadedPartyParam.union3 = data.union3
    }

    return loadedPartyParam
  }

  isEmpty(): boolean {
    const isUnionEmpty = (union: unionEx): boolean => {
      const keys = Object.keys(union)
      return keys.length === 0 || keys.every((key) => !union[key as 'main' | 'unison'])
    }
    return isUnionEmpty(this.union1) && isUnionEmpty(this.union2) && isUnionEmpty(this.union3)
  }
}

export const partyEditor = reactive<PartyEditor>(new PartyEditor(PartyRelease.empty()))
