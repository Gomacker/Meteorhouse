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
export interface PartyParam {
  dump(): any
  load(): PartyParam
  empty(): PartyParam
}
export class PartyParamManaboard2 implements PartyParam {
  load(): PartyParam {
    return new PartyParamManaboard2()
  }
  empty(): PartyParam {
    return new PartyParamManaboard2()
  }
  dump(): any {}
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
      if (this.verifyPosition(new PartyPosition(obj.unionIndex, obj.positionIndex))) this.selected_object = undefined
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

  hasRepeat() {
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
