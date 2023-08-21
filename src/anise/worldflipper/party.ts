import { Character, Equipment } from '@/anise/worldflipper/object'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import type { WorldflipperObject } from '@/stores/worldflipper'

const worldflipper = useWorldflipperDataStore()

export class Union {
  constructor(
    private _main: number | null,
    private _unison: number | null,
    private _equipment: number | null,
    private _core: number | null
  ) {}

  static load(data: number[]): Union {
    return new this(data[0] || null, data[1] || null, data[2] || null, data[3] || null)
  }

  dump(): any {
    return [this._main, this._unison, this._equipment, this._core]
  }

  get main(): Character | undefined {
    return worldflipper.characters.get(String(this._main))
  }

  set main(character: Character | number | null | undefined) {
    if (typeof character === 'number') this._main = character
    else this._main = character?.id ? parseInt(character.id) : null
  }

  get unison(): Character | undefined {
    return worldflipper.characters.get(String(this._unison))
  }

  set unison(character: Character | number | null | undefined) {
    if (typeof character === 'number') this._unison = character
    else this._unison = character?.id ? parseInt(character.id) : null
  }

  get equipment(): Equipment | undefined {
    return worldflipper.equipments.get(String(this._equipment))
  }

  set equipment(equipment: Equipment | number | null | undefined) {
    if (typeof equipment === 'number') this._equipment = equipment
    else this._equipment = equipment?.id ? parseInt(equipment.id) : null
  }

  get core(): Equipment | undefined {
    return worldflipper.equipments.get(String(this._core))
  }

  set core(equipment: Equipment | number | null | undefined) {
    if (typeof equipment === 'number') this._core = equipment
    else this._core = equipment?.id ? parseInt(equipment.id) : null
  }
}

export class PartyPosition {
  constructor(public unionIndex: number, public positionIndex: number) {}
  get(party: Party): WorldflipperObject {
    const union = party.union(this.unionIndex)
    if (union instanceof Union) {
      switch (this.positionIndex) {
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
    return undefined
  }

  equals(position: PartyPosition) {
    return this.unionIndex === position.unionIndex && this.positionIndex === position.positionIndex
  }
}

export class Party {
  public union1: Union
  public union2: Union
  public union3: Union
  constructor(
    union1: Union | Array<number> | null,
    union2: Union | Array<number> | null,
    union3: Union | Array<number> | null
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
    return new Party(data['union1'], data['union2'], data['union3'])
  }
  static loadOrigin(data: any): Party {
    const main_party_data = data['target_user_party']
    const character_data: Array<any> = data['user_character_list']
    const union1 = new Union(
      main_party_data['character_ids'][0],
      main_party_data['unison_character_ids'][0],
      main_party_data['equipments'][0]['equipment_id'],
      character_data.filter(
        (value) => value['character_id'] === main_party_data['character_ids'][0]
      )[0]['ability_soul_slot_1']
    )
    const union2 = new Union(
      main_party_data['character_ids'][1],
      main_party_data['unison_character_ids'][1],
      main_party_data['equipments'][1]['equipment_id'],
      character_data.filter(
        (value) => value['character_id'] === main_party_data['character_ids'][1]
      )[0]['ability_soul_slot_1']
    )
    const union3 = new Union(
      main_party_data['character_ids'][2],
      main_party_data['unison_character_ids'][2],
      main_party_data['equipments'][2]['equipment_id'],
      character_data.filter(
        (value) => value['character_id'] === main_party_data['character_ids'][2]
      )[0]['ability_soul_slot_1']
    )
    return new Party(union1, union2, union3)
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
  constructor(
    public party: Party,
    public params: Array<any>,
    public title?: string,
    public id?: string,
    public updater_id?: string
  ) {}
  static empty(): PartyRelease {
    return new PartyRelease(Party.empty(), [])
  }
  static load(data: any): PartyRelease {
    const party = Party.load(data['party'])
    const pr = new PartyRelease(party, [])
    pr.title = data['title']
    pr.id = data['id']
    return pr
  }
  dump(): any {
    return {
      party: this.party.dump()
    }
  }
}

export class PartyEditor {
  selected_object: WorldflipperObject | PartyPosition
  party: PartyRelease
  constructor(party: PartyRelease) {
    this.party = party
  }

  select(obj: WorldflipperObject | PartyPosition) {
    if (obj instanceof PartyPosition) {
      if (this.verifyPosition(new PartyPosition(obj.unionIndex, obj.positionIndex)))
        this.selected_object = undefined
      else {
        if (this.selected_object instanceof PartyPosition) {
          if (
            [0, 1].includes(this.selected_object.positionIndex) &&
            [0, 1].includes(obj.positionIndex)
          ) {
            this.exchangePosition(this.selected_object, obj)
            this.selected_object = undefined
          } else if (
            [2, 3].includes(this.selected_object.positionIndex) &&
            [2, 3].includes(obj.positionIndex)
          ) {
            this.exchangePosition(this.selected_object, obj)
            this.selected_object = undefined
          } else this.selected_object = obj
        } else if (this.selected_object || this.selected_object === null) {
          if (this.party.party.set(obj, this.selected_object)) this.selected_object = undefined
          else this.selected_object = new PartyPosition(obj.unionIndex, obj.positionIndex)
        } else this.selected_object = new PartyPosition(obj.unionIndex, obj.positionIndex)
      }
    } else {
      if (this.selected_object instanceof PartyPosition) {
        if (this.party.party.set(this.selected_object, obj)) this.selected_object = undefined
        else this.selected_object = obj
      } else this.selected_object = obj
    }
  }

  exchangePosition(position1: PartyPosition, position2: PartyPosition) {
    const p = this.party.party
    const obj1 = p.get(position1)
    const obj2 = p.get(position2)
    p.set(position2, obj1)
    p.set(position1, obj2)
  }

  verifyPosition(position: PartyPosition): boolean {
    return (
      this.selected_object instanceof PartyPosition &&
      this.selected_object.unionIndex === position.unionIndex &&
      this.selected_object.positionIndex === position.positionIndex
    )
  }

  getRepeats() {
    const characterRepeat = [
      this.party.party.union1.main?.id,
      this.party.party.union2.main?.id,
      this.party.party.union3.main?.id,
      this.party.party.union1.unison?.id,
      this.party.party.union2.unison?.id,
      this.party.party.union3.unison?.id
    ]
    const indexes = [
      new PartyPosition(1, 0),
      new PartyPosition(2, 0),
      new PartyPosition(3, 0),
      new PartyPosition(1, 1),
      new PartyPosition(2, 1),
      new PartyPosition(3, 1)
    ]
    interface TempRepeater {
      cache: WorldflipperObject[]
      repeat: Set<PartyPosition>
    }
    const repeater = indexes.reduce(
      (acc: TempRepeater, val, index) => {
        const v = this.party.party.get(val)
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
  abstract load(data: any): PartyParam
  abstract isEmpty(): boolean
}

interface Manaboard2Values {
  manaboard4?: number
  manaboard5?: number
  manaboard6?: number
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
      switch (position.positionIndex) {
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
      switch (position.positionIndex) {
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

  dump(): any {
    const dumpFunc = (value: Manaboard2Values) => [
      value.manaboard4,
      value.manaboard5,
      value.manaboard6
    ]
    return {
      union1: this.union1.map(dumpFunc),
      union2: this.union2.map(dumpFunc),
      union3: this.union3.map(dumpFunc)
    }
  }

  load(data: any): PartyParam {
    const loadFunc = (value: Array<number | undefined>) => {
      return { manaboard4: value[0], manaboard5: value[1], manaboard6: value[2] }
    }
    return new PartyParamManaboard2(
      (data['union1'] as Array<Array<number | undefined>>).map(loadFunc),
      (data['union2'] as Array<Array<number | undefined>>).map(loadFunc),
      (data['union3'] as Array<Array<number | undefined>>).map(loadFunc)
    )
  }

  isEmpty(): boolean {
    return !(
      this.union1.some((value) => !!value) &&
      this.union2.some((value) => !!value) &&
      this.union3.some((value) => !!value)
    )
  }
}