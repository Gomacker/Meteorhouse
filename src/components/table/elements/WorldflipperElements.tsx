import table, { TableElement } from '@/components/table/table'
import type { JSX } from 'vue/jsx-runtime'
import { h } from 'vue'
import TableComponentParty from '@/components/table/elements/TableComponentParty.vue'
import { Party, PartyRelease } from "@/anise/worldflipper/party";
import CharacterWikiCard from '@/components/worldflipper/character/CharacterWikiCard.vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import EquipmentWikiCard from '@/components/worldflipper/equipment/EquipmentWikiCard.vue'
import TableEditorParty from '@/components/table/elements/TableEditorParty.vue'

export class TableElementParty extends TableElement {
  readonly __type: string = 'Party'
  public _party: string
  public title: string
  public subtitle: string

  constructor(data: any) {
    super()
    // this.__data = data
    const p = data['party']
    if (typeof p === 'object') this._party = JSON.stringify(p)
    else this._party = data['party'] || JSON.stringify(Party.empty().dump())
    this.title = data['title'] || ''
    this.subtitle = data['subtitle'] || ''
  }
  get party() {
    try {
      return PartyRelease.load(JSON.parse(this._party))
    }catch (e) {
      return PartyRelease.empty()
    }
  }

  setPartyFromJson(value: string) {
    this._party = value
  }

  html(): JSX.Element {
    return h(TableComponentParty, { element: this })
  }

  editor(): JSX.Element {
    return h(TableEditorParty, { element: this })
  }
}

export class TableElementWikiCard extends TableElement {
  readonly __type: string = 'WikiCard'
  private type: 'Character' | 'Equipment'
  private id: number
  private lite: boolean
  constructor(data: any) {
    super()
    this.type = ['Armament', 'Equipment'].includes(data['type']) ? 'Equipment' : 'Character'
    this.id = data['id'] || 0
    this.lite = data['lite'] || false
  }

  html(): JSX.Element {
    const worldflipper = useWorldflipperDataStore()
    if (this.type === 'Character') {
      return h<typeof CharacterWikiCard>(CharacterWikiCard, {
        obj: worldflipper.characters.get(String(this.id)),
        lite: this.lite,
        style: {
          margin: '10px',
          borderRadius: '16px'
        },
        class: 'elevation-6'
      })
    } else {
      return h(EquipmentWikiCard, {
        obj: worldflipper.equipments.get(String(this.id)),
        lite: this.lite
      })
    }
  }

  editor(): JSX.Element {
    return <div>{JSON.stringify(this.data())}</div>
  }
}

export class TableElementAutoParty extends TableElement {
  readonly __type: string = 'AutoParty'
  private category: number;
  private questId: number;
  private size: number;

  constructor(data: any) {
    super();
  }

  html(): JSX.Element {
    return <></>;
  }

  editor(): JSX.Element {
    return <></>;
  }
}

table.register('Party', TableElementParty)
table.register('Party2', TableElementParty)

table.register('WikiCard', TableElementWikiCard)
