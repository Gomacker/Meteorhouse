import table, { TableElement } from '@/components/table/table'
import type { JSX } from 'vue/jsx-runtime'
import { h } from 'vue'
import TableComponentParty from '@/components/table/elements/TableComponentParty.vue'
import { PartyRelease } from '@/anise/worldflipper/party'
import CharacterWikiCardLite from '@/components/worldflipper/character/CharacterWikiCardLite.vue'
import CharacterWikiCard from '@/components/worldflipper/character/CharacterWikiCard.vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import EquipmentWikiCard from '@/components/worldflipper/equipment/EquipmentWikiCard.vue'

export class TableElementParty extends TableElement {
  readonly __type: string = 'Party'
  private _party: any
  public title: string
  public subtitle: string

  constructor(data: any) {
    super()
    // this.__data = data
    this._party = data['party']
    this.title = data['title'] || ''
    this.subtitle = data['subtitle'] || ''
  }
  get party() {
    return PartyRelease.load(this._party)
  }
  html(): JSX.Element {
    return h(TableComponentParty, { element: this })
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
      return h(CharacterWikiCard, {
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
}

table.register('Party', TableElementParty)
table.register('Party2', TableElementParty)

table.register('WikiCard', TableElementWikiCard)
