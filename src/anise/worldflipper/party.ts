import type { Character } from "@/anise/worldflipper/object";
import { useWorldflipperDataStore } from "@/stores/worldflipper";
import { Equipment } from "@/anise/worldflipper/object";

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

  set main(character: Character | number | undefined) {
    if (typeof character === 'number') this._main = character
    else this._main = character?.id ? parseInt(character.id) : null
  }

  get unison(): Character | undefined {
    return worldflipper.characters.get(String(this._unison))
  }

  set unison(character: Character | number | undefined) {
    if (typeof character === 'number') this._unison = character
    else this._unison = character?.id ? parseInt(character.id) : null
  }

  get equipment(): Equipment | undefined {
    return worldflipper.equipments.get(String(this._equipment))
  }

  set equipment(equipment: Equipment | number | undefined) {
    if (typeof equipment === 'number') this._equipment = equipment
    else this._equipment = equipment?.id ? parseInt(equipment.id) : null
  }

  get core(): Equipment | undefined {
    return worldflipper.equipments.get(String(this._core))
  }

  set core(equipment: Equipment | number | undefined) {
    if (typeof equipment === 'number') this._core = equipment
    else this._core = equipment?.id ? parseInt(equipment.id) : null
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
      union3: this.union3.dump(),
    }
  }
}
export interface PartyParam {
  dump(): any
  load(): PartyParam
  empty(): PartyParam
}
export class PartyParamManaboard2 implements PartyParam {
  load(): PartyParam {return new PartyParamManaboard2()}
  empty(): PartyParam {return new PartyParamManaboard2()}
  dump(): any {}
}
export class PartyRelease {
  constructor(public party: Party, public params: Array<any>) {}
  static empty(): PartyRelease {
    return new PartyRelease(Party.empty(), [])
  }
  static load(data: any): PartyRelease {
    const party = Party.load(data['party'])
    return new PartyRelease(party, [])
  }
  dump(): any {
    return {
      party: this.party.dump()
    }
  }
}
