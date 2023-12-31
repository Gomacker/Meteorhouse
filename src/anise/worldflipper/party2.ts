type Union = [number, number, number, number]
type Manaboard2Level = undefined | 0 | 1 | 2 | 3 | 4 | 5
type Manaboard2Info = [Manaboard2Level, Manaboard2Level, Manaboard2Level]
type UnionManaboard2Info = [Manaboard2Info, Manaboard2Info, Manaboard2Info, Manaboard2Info]

export interface Party {
  body: [
    Union,
    Union,
    Union
  ]
}

export interface PartyRelease {
  getParty(): Party
  getTitle(): string

}

