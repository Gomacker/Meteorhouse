import axios from 'axios'
import { reactive } from 'vue'

export class Manager {
  public readonly unit_data: Map<number, Unit>
  public readonly armament_data: Map<number, Armament>
  public need_update
  constructor() {
    this.unit_data = new Map<number, Unit>()
    this.armament_data = new Map<number, Armament>()
    this.need_update = reactive({ value: false })
  }

  clear() {
    this.unit_data.clear()
    this.armament_data.clear()
    this.need_update.value = true
  }

  load(data: any) {
    if ('unit' in data) {
      for (const unit in data['unit']) {
        this.unit_data.set(parseInt(unit), new Unit(data['unit'][unit]))
        // console.log(data['unit'][unit])
      }
    }
    if ('armament' in data) {
      for (const armament in data['armament']) {
        this.armament_data.set(parseInt(armament), new Armament(data['armament'][armament]))
        // console.log(data['armament'][armament])
      }
    }
    this.need_update.value = true
  }
}

const gender2zh: any = {
  Female: '女性',
  Male: '男性',
  Unknown: '不明',
  Ririi: '莉莉'
}
export const type2zh: any = {
  0: '剑士',
  1: '格斗',
  2: '射击',
  3: '辅助',
  4: '特殊'
}
const race2zh: any = {
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
export const ele_id2ele: any = {
  [-1]: 'none',
  0: 'fire',
  1: 'water',
  2: 'thunder',
  3: 'wind',
  4: 'light',
  5: 'dark'
}

function format_race(race: string) {
  const l = race.split(',')
  if (l[0] === '') l.splice(0, 1)
  for (let i = 0; i < l.length; i++) {
    l[i] = race2zh[l[i]]
  }
  return l
}

export class Unit {
  public readonly _data: any
  constructor(data: Object) {
    this._data = data
  }

  get data(): Object {
    return this._data
  }

  get status(): Object {
    const status = {
      mhp: 0,
      mmhp: 0,
      atk: 0,
      matk: 0
    }
    return Object.assign(status, this._data['status'])
  }

  get id(): number {
    return parseInt(this.wf_id)
  }

  get anise_id(): string {
    return this._data['anise_id']
  }
  get wf_id(): string {
    return this._data['wf_id']
  }
  get extraction_id(): string {
    return this._data['extraction_id']
  }
  get name_zh(): string {
    return this._data['name'][0]
  }
  get name_sub(): string {
    return this._data['name'][1]
  }
  get name_jp(): string {
    return this._data['name'][2]
  }
  get rarity(): number {
    return this._data['rarity']
  }
  get element_id(): number {
    return this._data['element']
  }
  get element(): number {
    // console.log(ele_id2ele[this.element_id])
    return this.element_id in ele_id2ele ? ele_id2ele[this.element_id] : ele_id2ele[-1]
  }
  get gender(): number {
    return this._data['gender'] in gender2zh
      ? gender2zh[this._data['gender']]
      : this._data['gender']
  }
  get race_ids(): string {
    return this._data['race']
  }
  get race(): string {
    return format_race(this._data['race']).join(' / ')
  }
  get type_id(): number {
    return this._data['pf_type']
  }
  get pf_type(): string {
    return this._data['pf_type'] in type2zh ? type2zh[this._data['pf_type']] : '未知'
  }
  get leader_ability_name(): string {
    return this._data['leader_ability_name']
  }
  get leader_ability(): string {
    return this._data['leader_ability']
  }
  get skill_name(): string {
    return this._data['skill_name']
  }
  get skill_description(): string {
    return this._data['skill_description']
  }
  get skill_weight(): number {
    return this._data['skill_weight']
  }
  get description(): string {
    return this._data['description']
  }
  private _ability(index: number): string {
    return this._data['ability' + index]
  }
  get ability1(): string {
    return this._ability(1)
  }
  get ability2(): string {
    return this._ability(2)
  }
  get ability3(): string {
    return this._ability(3)
  }
  get ability4(): string {
    return this._ability(4)
  }
  get ability5(): string {
    return this._ability(5)
  }
  get ability6(): string {
    return this._ability(6)
  }
  get cv(): string {
    return this._data['cv'] === '(None)' ? '无' : this._data['cv']
  }
  pic_url(awakened = false): string {
    if (this.extraction_id) {
      return (
        '/static/worldflipper/unit/square212x/' +
        (awakened ? 'awakened' : 'base') +
        '/' +
        this.extraction_id +
        '.png'
      )
    } else {
      return '/static/worldflipper/unit/blank.png'
    }
  }
}

export class Armament {
  public readonly _data: any

  constructor(data: Object) {
    this._data = data
  }
  get id(): number {
    return parseInt(this.wf_id)
  }

  get anise_id(): string {
    return this._data['anise_id']
  }
  get wf_id(): string {
    return this._data['wf_id']
  }
  get extraction_id(): string {
    // return this._data['WfExId']
    return this._data['extraction_id']
  }

  get name_zh(): string {
    return this._data['name'][0]
  }

  get name_jp(): string {
    return this._data['name'][1]
  }

  get rarity(): number {
    return this._data['rarity']
  }

  get element(): number {
    return this._data['element']
  }

  get ability(): string {
    return this._data['ability']
  }

  get ability_soul(): string {
    return this._data['ability_soul']
  }

  get ability_awaken3(): string {
    return this._data['ability_awaken3']
  }

  get ability_awaken5(): string {
    return this._data['ability_awaken5']
  }

  get ability_augment1(): string {
    return this._data['ability_augment1']
  }

  get ability_augment70(): string {
    return this._data['ability_augment70']
  }

  get ability_augment100(): string {
    return this._data['ability_augment100']
  }

  get status_data(): string {
    return this._data['status_data']
  }

  get description(): string {
    return this._data['description']
  }

  pic_url(soul: boolean): string {
    if (this.extraction_id) {
      // return `/static/worldflipper/generated/armament/${soul ? 'core' : 'normal'}/` + this.extraction_id + '.png'
      return soul
        ? `/static/worldflipper/armament/${this.extraction_id.replace(
            'equipment',
            'generated\\ability_soul'
          )}.png`
        : `/static/worldflipper/armament/${this.extraction_id}.png`
    } else {
      return '/static/worldflipper/unit/blank.png'
    }
  }
}

export class Union {
  public main: Unit | undefined
  public unison: Unit | undefined
  public armament: Armament | undefined
  public core: Armament | undefined

  constructor(
    main: Unit | undefined = undefined,
    unison: Unit | undefined = undefined,
    armament: Armament | undefined = undefined,
    core: Armament | undefined = undefined
  ) {
    this.main = main
    this.unison = unison
    this.armament = armament
    this.core = core
  }

  clear(): void {
    this.main = undefined
    this.unison = undefined
    this.armament = undefined
    this.core = undefined
  }

  self_check(): boolean {
    return true
  }

  static loads(data: Array<number> | undefined): Union {
    if (data) {
      // console.log(manager.value.unit_data.get(String(data[0])))
      return new Union(
        manager.unit_data.get(data[0]),
        manager.unit_data.get(data[1]),
        manager.armament_data.get(data[2]),
        manager.armament_data.get(data[3])
      )
    } else return new Union()
  }

  data() {
    return [
      this.main ? this.main.id : 0,
      this.unison ? this.unison.id : 0,
      this.armament ? this.armament.id : 0,
      this.core ? this.core.id : 0
    ]
  }
}

export class Party {
  public readonly _union1: Union
  public readonly _union2: Union
  public readonly _union3: Union
  constructor(
    union1: Union | undefined = undefined,
    union2: Union | undefined = undefined,
    union3: Union | undefined = undefined
  ) {
    if (union1) this._union1 = union1
    else this._union1 = new Union()
    if (union2) this._union2 = union2
    else this._union2 = new Union()
    if (union3) this._union3 = union3
    else this._union3 = new Union()
  }

  get union1(): Union {
    return this._union1
  }

  get union2(): Union {
    return this._union2
  }

  get union3(): Union {
    return this._union3
  }

  get_by_position(union: string, position: number) {
    const p = {
      0: 'main',
      1: 'armament',
      2: 'unison',
      3: 'core'
    }[position]
    if (p === 'main' || p === 'armament' || p === 'unison' || p === 'core') {
      if (union === 'union1') return this._union1[p]
      if (union === 'union2') return this._union2[p]
      if (union === 'union3') return this._union3[p]
    }
  }

  can_exchange(position1: number, position2: number) {
    // const pm = {
    //     0: 'main',
    //     1: 'armament',
    //     2: 'unison',
    //     3: 'core'
    // }
    if (position1 === 0 || position1 === 2) return position2 === 0 || position2 === 2
    if (position1 === 1 || position1 === 3) return position2 === 1 || position2 === 3
  }

  set_by_position(obj: Unit | Armament | undefined, union: string, position: number) {
    const p = {
      0: 'main',
      1: 'armament',
      2: 'unison',
      3: 'core'
    }[position]
    if ((obj instanceof Unit || obj === undefined) && (p === 'main' || p === 'unison')) {
      if (union === 'union1') this._union1[p] = obj
      if (union === 'union2') this._union2[p] = obj
      if (union === 'union3') this._union3[p] = obj
      return true
    }
    if ((obj instanceof Armament || obj === undefined) && (p === 'armament' || p === 'core')) {
      if (union === 'union1') this._union1[p] = obj
      if (union === 'union2') this._union2[p] = obj
      if (union === 'union3') this._union3[p] = obj
      return true
    }
    return false
  }

  data(): { union1: any; union2: any; union3: any } {
    return {
      union1: this._union1.data(),
      union2: this._union2.data(),
      union3: this._union3.data()
    }
  }

  static loads(data: any): Party {
    return new Party(
      Union.loads(data['union1']),
      Union.loads(data['union2']),
      Union.loads(data['union3'])
    )
  }
}

interface PartyParam {
  data(): Object
}

class Manaboard2Levels {
  public manaboard4: number | undefined
  public manaboard5: number | undefined
  public manaboard6: number | undefined
  constructor(
    manaboard4: number | undefined,
    manaboard5: number | undefined,
    manaboard6: number | undefined
  ) {
    this.manaboard4 = manaboard4
    this.manaboard5 = manaboard5
    this.manaboard6 = manaboard6
  }
  data() {
    return [this.manaboard4, this.manaboard5, this.manaboard6]
  }
}

class PartyParamManaboard2 implements PartyParam {
  public union1main: Manaboard2Levels;
  public union2main: Manaboard2Levels;
  public union3main: Manaboard2Levels;
  public union1unison: Manaboard2Levels;
  public union2unison: Manaboard2Levels;
  public union3unison: Manaboard2Levels;
  constructor() {
      this.union1main = new Manaboard2Levels(undefined, undefined, undefined)
      this.union2main = new Manaboard2Levels(undefined, undefined, undefined)
      this.union3main = new Manaboard2Levels(undefined, undefined, undefined)
      this.union1unison = new Manaboard2Levels(undefined, undefined, undefined)
      this.union2unison = new Manaboard2Levels(undefined, undefined, undefined)
      this.union3unison = new Manaboard2Levels(undefined, undefined, undefined)
  }

  static load(): void {}

  data(): Object {
    return {}
  }
}

const ppm = new PartyParamManaboard2()

export class PartyRelease {
  private readonly _party: Party
  private _params: Map<string, PartyParam>
  title: string
  updater_id: string
  _id: string

  constructor(
    party: Party,
    params: Map<string, PartyParam>,
    title: string = '',
    updater_id: string = '',
    id: string = ''
  ) {
    this._party = party
    this._params = params
    this.title = title
    this.updater_id = updater_id
    this._id = id
  }

  get id(): string {
    return this._id
  }

  static loads(data: any): PartyRelease {
    return new PartyRelease(
      Party.loads(data['party']),
      new Map(),
      data['title'],
      data['updater_id'],
      data['id']
    )
  }
  static empty(): PartyRelease {
    return PartyRelease.loads({
      party: { union1: [0, 0, 0, 0], union2: [0, 0, 0, 0], union3: [0, 0, 0, 0] }
    })
  }
  get party(): Party {
    return this._party
  }
}

export class PartyReleaseConstructor {
  private party_release: PartyRelease

  constructor(data: Object) {
    this.party_release = PartyRelease.loads(data)
  }
  static empty(): PartyRelease {
    return PartyRelease.loads({
      party: { union1: [0, 0, 0, 0], union2: [0, 0, 0, 0], union3: [0, 0, 0, 0] }
    })
  }
}

export const manager = reactive(new Manager())

export function init() {
  axios
    .post('/api/v1/data/unit/', {})
    .then((res) => {
      manager.load({ unit: res.data })
    })
    .catch(() => {})
  axios
    .post('/api/v1/data/armament/', {})
    .then((res) => {
      manager.load({ armament: res.data })
    })
    .catch(() => {})
}

init()
