import type { Party, PartyRelease, type PartyRelease as LegacyPartyRelease } from "./party";

export interface Quest {
  category: number
  questID: number
}

type objectID = number | null
type Union = [objectID, objectID, objectID, objectID]
type Manaboard2Level = null | 0 | 1 | 2 | 3 | 4 | 5
type Manaboard2Info = [Manaboard2Level, Manaboard2Level, Manaboard2Level]
type UnionManaboard2Info = [Manaboard2Info, Manaboard2Info]
type ExAType =
  | null
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
  | null
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
type ExInfo = [ExAType, ExBType]
type UnionExInfo = [ExInfo, ExInfo]

export interface Party {
  main: [Union, Union, Union]
  manaboard2: [UnionManaboard2Info, UnionManaboard2Info, UnionManaboard2Info]
  ex: [UnionExInfo, UnionExInfo, UnionExInfo]
}

export interface PartyRelease {
  getParty(): Party

  getTitle(): string

  getQuests(): Quest[]

  getLike(): number

  getIsLiked(): boolean
}

interface PartyReleaseV2Data {
  party: Party
  title: string
  releaseID: string
}

// export class PartyReleaseV2 implements PartyRelease {
//
//   private title: string
//
//   constructor(props: PartyReleaseV2Data) {
//     this.title = props.title
//   }
//
//
//   getIsLiked(): boolean {
//     return false;
//   }
//
//   getLike(): number {
//     return 0;
//   }
//
//   getParty(): Party {
//     return undefined;
//   }
//
//   getQuests(): Quest[] {
//     return [];
//   }
//
//   getTitle(): string {
//     return "";
//   }
// }

export class PartyFactory {
  static empty(): Party {
    return {
      main: [[null,null,null,null], [null,null,null,null], [null,null,null,null], ],
      manaboard2: [
        [
          [null, null, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, null, null]
        ],
        [
          [null, null, null],
          [null, null, null]
        ]
      ],
      ex: [
        [
          [null, null],
          [null, null]
        ],
        [
          [null, null],
          [null, null]
        ],
        [
          [null, null],
          [null, null]
        ]
      ]
    }
  }

  static fromLegacy(legacyParty: LegacyPartyRelease): Party {
    return PartyFactory.empty()
  }
}
