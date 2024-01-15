import {
  PartyRelease as LegacyPartyRelease,
  type Party as LegacyParty,
  PartyParamManaboard2,
  type Manaboard2Values
} from "./party"

export interface Quest {
  category: number
  questId: number
}

type ObjectId = number | null
type Union = [ObjectId, ObjectId, ObjectId, ObjectId]
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

export interface PartyParams {
  manaboard2?: [UnionManaboard2Info, UnionManaboard2Info, UnionManaboard2Info]
  ex?: [UnionExInfo, UnionExInfo, UnionExInfo]
}

export interface Party {
  main: [Union, Union, Union]
}

export interface PartyRelease {
  getParty(): Party

  getTitle(): string

  getQuests(): Quest[]

  getLike(): number

  getIsLiked(): Promise<boolean>

  getParams(): PartyParams

  getCode(): Promise<string | undefined>

  getId(): string | undefined

  getUpdater(): Promise<string | undefined>
}

interface PartyReleaseV1Data {
  id?: string
  title: string
  party: {
    union1: [ObjectId, ObjectId, ObjectId, ObjectId]
    union2: [ObjectId, ObjectId, ObjectId, ObjectId]
    union3: [ObjectId, ObjectId, ObjectId, ObjectId]
  }
  params: { [key: string]: any }
  updater_id: string
}

export class PartyReleaseV1 implements PartyRelease {
  private readonly partyRelease: LegacyPartyRelease

  constructor(party: LegacyPartyRelease) {
    // this.partyRelease = LegacyPartyRelease.load(props)
    this.partyRelease = party
  }

  static fromPartyRelease(props: PartyReleaseV1Data): PartyReleaseV1 {
    return new PartyReleaseV1(LegacyPartyRelease.load(props))
  }

  getId(): string | undefined {
    return this.partyRelease.id
  }

  getParty(): Party {
    return {
      main: [
        this.partyRelease.party.union1.dump(),
        this.partyRelease.party.union2.dump(),
        this.partyRelease.party.union3.dump()
      ]
    }
  }

  getParams(): PartyParams {
    let result: PartyParams = {
      manaboard2: undefined,
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
    const mb2 = this.partyRelease.getParam('manaboard2')
    const extractTool = (mb2v: Manaboard2Values | undefined): Manaboard2Info => {
      if (mb2v) {
        return [
          (mb2v.ability4 ?? null) as Manaboard2Level,
          (mb2v.ability5 ?? null) as Manaboard2Level,
          (mb2v.ability6 ?? null) as Manaboard2Level
        ]
      } else return [null, null, null]
    }
    if (mb2 instanceof PartyParamManaboard2) {
      result.manaboard2 = [
        [
          extractTool(mb2.get({ unionIndex: 1, positionIndex: 0 })),
          extractTool(mb2.get({ unionIndex: 1, positionIndex: 1 }))
        ],
        [
          extractTool(mb2.get({ unionIndex: 2, positionIndex: 0 })),
          extractTool(mb2.get({ unionIndex: 2, positionIndex: 1 }))
        ],
        [
          extractTool(mb2.get({ unionIndex: 3, positionIndex: 0 })),
          extractTool(mb2.get({ unionIndex: 3, positionIndex: 1 }))
        ]
      ]
    }
    return result
  }

  getIsLiked(): Promise<boolean> {
    return Promise.resolve(false)
  }

  getLike(): number {
    return 0
  }

  getQuests(): Quest[] {
    return []
  }

  getTitle(): string {
    return this.partyRelease.title || ''
  }

  async getCode(): Promise<string | undefined> {
    return this.partyRelease.partyCode
  }

  async getUpdater(): Promise<string | undefined> {
    return this.partyRelease.updater_id
  }
}

interface PartyReleaseV2Data {
  id: string
  party: Party
  title: string
  params: PartyParams
}

export class PartyReleaseV2 implements PartyRelease {
  private readonly id: string
  private readonly party: Party
  private readonly title: string
  private readonly params: PartyParams

  constructor(props: PartyReleaseV2Data) {
    this.id = props.id
    this.party = props.party
    this.title = props.title
    this.params = props.params
  }

  async getIsLiked(): Promise<boolean> {
    return false
  }

  getLike(): number {
    return 0
  }

  getParty(): Party {
    return this.party
  }

  getParams(): PartyParams {
    return this.params
  }

  getQuests(): Quest[] {
    return []
  }

  getTitle(): string {
    return ''
  }

  async getCode(): Promise<string | undefined> {
    return undefined
  }

  getId(): string | undefined {
    return undefined
  }

  async getUpdater(): Promise<string | undefined> {
    return undefined
  }
}

export class PartyFactory {
  static empty(): Party {
    return {
      main: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ]
    }
  }

  static fromLegacy(legacyParty: LegacyPartyRelease): Party {
    return PartyFactory.empty()
  }
}
