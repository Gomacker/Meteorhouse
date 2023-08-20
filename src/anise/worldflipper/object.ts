import { GameObject } from '@/anise/object'
import type { Unit } from '@/stores/manager'

export enum Element {
  All = -1,
  Fire,
  Water,
  Thunder,
  Wind,
  Light,
  Dark
}

// export enum Race {
//   Human,
//   Beast
// }

export enum SpecialityType {
  Knight,
  Fighter,
  Ranged,
  Supporter,
  Special
}

interface Skill {
  name: string
  weight: number
  description: string
}

interface LeaderAbility {
  name: string
  description: string
}

export class Character extends GameObject {
  readonly __type_id: string = 'worldflipper/unit'
  static readonly LEVEL_CAP: any = {
    '1': ['40', '12', '5', '0.4', '0.4'],
    '2': ['50', '10', '5', '0.5', '0.5'],
    '3': ['60', '8', '5', '0.8', '0.8'],
    '4': ['70', '6', '5', '1.5', '1.5'],
    '5': ['80', '4', '5', '3', '3']
  }
  static readonly EVOLUTION_STATUS: any = {
    '1': ['30', '150', '0', '0'],
    '2': ['40', '200', '0', '0'],
    '3': ['50', '250', '0', '0'],
    '4': ['54', '270', '0', '0'],
    '5': ['60', '300', '0', '0']
  }

  constructor(
    public id: string,
    resource_id: string,
    public names: string[],
    public rarity: number,
    public element: Element,
    public type: SpecialityType,
    public race: string, // 未优化
    public gender: string, // 未优化
    // public stance: number, // 未优化

    // public status_data: StatusData,
    public status_data: string,

    public leader_ability: LeaderAbility,
    public skill: Skill,

    public abilities: Array<string>,
    public description: string,
    public obtain: string,
    public tags: Array<string>,

    public cv: string
  ) {
    super(resource_id)
  }

  static from_legacy(unit: Unit): Character {
    console.log(unit)
    return new Character(
      unit.wf_id,
      unit.extraction_id,
      [unit.name_zh, unit.name_sub, unit.name_jp],
      unit.rarity,
      unit.element,
      unit.type_id,
      unit.race,
      unit.gender,
      // unit.data['stance'],
      // unit.cv,
      '[]',
      {
        description: unit.leader_ability,
        name: unit.leader_ability_name
      },
      {
        description: unit.skill_description,
        name: unit.skill_name,
        weight: unit.skill_weight
      },
      [unit.ability1, unit.ability2, unit.ability3, unit.ability4, unit.ability5, unit.ability6],
      unit.description,
      unit.obtain,
      JSON.parse(unit.tags),
      unit.cv
    )
  }

  get nature_max_level(): number {
    return Math.floor(Character.LEVEL_CAP[String(this.rarity)][0])
  }

  private get_cap_count(level: number): number {
    const nml = this.nature_max_level
    return level <= nml ? 0 : Math.ceil((level - nml) / Character.LEVEL_CAP[String(this.rarity)][2])
  }

  private get cap_rate(): number {
    return Character.LEVEL_CAP[String(this.rarity)][3] / 100.0
  }

  private _calculate_status(
    start: number,
    end: number,
    level_start: number,
    level_end: number,
    level: number,
    evolution: number
  ): number {
    let value = Math.ceil(
      start + ((end - start) / (level_end - level_start)) * (level - level_start)
    )
    value = Math.ceil(value * (1 + this.get_cap_count(level) * this.cap_rate))
    value = value + Math.floor(evolution)
    return value
  }

  private get __status_data(): Record<string, number[]> {
    return JSON.parse(this.status_data)
  }

  get_status(level: number): [number, number] {
    const status_data = this.__status_data
    let mhp = 0
    let atk = 0
    level = Math.max(0, Math.min(100, level))

    if (level >= 80 && level <= 100) {
      const sd1 = status_data['80'].map((x) => Math.floor(x))
      const sd2 = status_data['100'].map((x) => Math.floor(x))
      mhp = this._calculate_status(
        sd1[0],
        sd2[0],
        80,
        100,
        level,
        Math.floor(Character.EVOLUTION_STATUS[String(this.rarity)][1])
      )
      atk = this._calculate_status(
        sd1[1],
        sd2[1],
        80,
        100,
        level,
        Math.floor(Character.EVOLUTION_STATUS[String(this.rarity)][0])
      )
    } else if (level >= 10 && level < 80) {
      const sd1 = status_data['10'].map((x) => Math.floor(x))
      const sd2 = status_data['80'].map((x) => Math.floor(x))
      const evolutionStatusRarity1 =
        level >= this.nature_max_level
          ? Math.floor(Character.EVOLUTION_STATUS[String(this.rarity)][1])
          : 0
      const evolutionStatusRarity0 =
        level >= this.nature_max_level
          ? Math.floor(Character.EVOLUTION_STATUS[String(this.rarity)][0])
          : 0
      mhp = this._calculate_status(sd1[0], sd2[0], 10, 80, level, evolutionStatusRarity1)
      atk = this._calculate_status(sd1[1], sd2[1], 10, 80, level, evolutionStatusRarity0)
    } else if (level >= 1 && level < 10) {
      const sd1 = status_data['1'].map((x) => Math.floor(x))
      const sd2 = status_data['10'].map((x) => Math.floor(x))
      mhp = this._calculate_status(sd1[0], sd2[0], 1, 10, level, 0)
      atk = this._calculate_status(sd1[1], sd2[1], 1, 10, level, 0)
    }

    return [mhp, atk]
  }
}

export class Equipment extends GameObject {
  readonly __type_id: string = 'worldflipper/armament'

  constructor(
    public id: string,
    resource_id: string,
    public names: string[],
    public rarity: number,
    public element: Element,
    public status_data: string,
    public abilities: string[],
    public description: string,
    public obtain: string,
    public tags: string[]
  ) {
    super(resource_id)
  }

  res(res_group: 'normal' | 'soul'): string {
    switch (res_group) {
      case 'normal':
        return `/static/worldflipper/armament/${this.resource_id}.png`
      case 'soul':
        return `/static/worldflipper/armament/${this.resource_id.replace(
          'equipment',
          'generated\\ability_soul'
        )}.png`
    }
  }
}
