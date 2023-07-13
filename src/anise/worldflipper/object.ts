import { GameObject } from "@/anise/object";
import type {Unit} from "@/stores/manager";

export enum Element {
  All = -1,
  Fire,
  Water,
  Thunder,
  Wind,
  Light,
  Dark
}

export enum Race {
  Human,
}

export enum SpecialityType {
  KNIGHT,
  FIGHTER,
  RANGED,
  SUPPORTER,
  SPECIAL,
}

interface Skill {
  name: string;
  weight: number;
  description: string;
}

interface LeaderAbility {
  name: string;
  description: string;
}

export class Character extends GameObject {
  readonly __type_id: string = 'worldflipper/unit';
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

    public leader_ability: LeaderAbility,
    public skill: Skill,

    public abilities: Array<string>,
    public description: string,
    public obtain: string,
    public tags: Array<string>,

    public cv: string,
  ) {
    super(resource_id)
  }

  static from_legacy(unit: Unit): Character {
    console.log(unit)
    return new Character(
        unit.wf_id,
        unit.extraction_id,
        [
            unit.name_zh,
            unit.name_sub,
            unit.name_jp
        ],
        unit.rarity,
        unit.element,
        unit.type_id,
        unit.race,
        unit.gender,
        // unit.data['stance'],
        // unit.cv,
        new class implements LeaderAbility {
          description: string = unit.leader_ability;
          name: string = unit.leader_ability_name;
        },
        new class implements Skill {
          description: string = unit.skill_description;
          name: string = unit.skill_name;
          weight: number = unit.skill_weight;
        },
        [
            unit.ability1,
            unit.ability2,
            unit.ability3,
            unit.ability4,
            unit.ability5,
            unit.ability6
        ],
        unit.description,
        unit.obtain,
        JSON.parse(unit.tags),
        unit.cv
    )
  }
}

export class Equipment extends GameObject {
  readonly __type_id: string = 'worldflipper/armament';

  constructor(
      public id: string,
      resource_id: string,
      public rarity: number,
      public element: Element,
  ) {
    super(resource_id);
  }
}
