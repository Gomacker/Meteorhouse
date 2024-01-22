import table, { TableElement } from '@/components/table/table'
import type { JSX } from 'vue/jsx-runtime'
import { h } from 'vue'
import TableComponentParty from '@/components/table/elements/TableComponentParty.vue'
import { Party, PartyRelease } from '@/anise/worldflipper/party'
import CharacterWikiCard from '@/components/worldflipper/character/CharacterWikiCard.vue'
import { useWorldflipperDataStore } from '@/stores/worldflipper'
import EquipmentWikiCard from '@/components/worldflipper/equipment/EquipmentWikiCard.vue'
import TableEditorParty from '@/components/table/elements/TableEditorParty.vue'
import { VSelect, VSwitch, VTextField } from 'vuetify/components'
import TableComponentAutoPartyRecent from '@/components/table/elements/TableComponentAutoPartyRecent.vue'
import CharacterIcon from '@/components/worldflipper/character/CharacterIcon.vue'

export class TableElementParty extends TableElement {
  readonly __type: string = 'Party'
  public _party: string
  public title: string
  public subtitle: string

  constructor(data: any) {
    super()
    // this.__data = data
    const p = data['party'] || data['_party']
    if (typeof p === 'object') this._party = JSON.stringify(p)
    else this._party = data['party'] || data['_party'] || JSON.stringify(Party.empty().dump())
    this.title = data['title'] || ''
    this.subtitle = data['subtitle'] || ''
  }
  get party() {
    try {
      return PartyRelease.load(JSON.parse(this._party))
    } catch (e) {
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

  protected _data(): object {
    return {
      party: this.party.dump(),
      title: this.title,
      subtitle: this.subtitle
    }
  }
}

export class TableElementWikiCard extends TableElement {
  readonly __type: string = 'WikiCard'
  private type: 'Character' | 'Equipment'
  private id: string
  private lite: boolean
  constructor(data: any) {
    super()
    this.type = ['Armament', 'Equipment'].includes(data['type']) ? 'Equipment' : 'Character'
    this.id = String(data['id']) || '0'
    this.lite = data['lite'] || false
  }

  html(): JSX.Element {
    const worldflipper = useWorldflipperDataStore()
    if (this.type === 'Character') {
      return <CharacterWikiCard
        obj={worldflipper.characters.get(this.id)}
        lite={this.lite}
        style="margin: 10px; border-radius: 16px"
        class="elevation-6"
      />
      // return h<typeof CharacterWikiCard>(CharacterWikiCard, {
      //   obj: worldflipper.characters.get(this.id),
      //   lite: this.lite,
      //   style: {
      //     margin: '10px',
      //     borderRadius: '16px'
      //   },
      //   class: 'elevation-6'
      // })
    } else {
      return <EquipmentWikiCard
        obj={worldflipper.equipments.get(this.id)}
        lite={this.lite}
      />
      // return h(EquipmentWikiCard, {
      //   obj: worldflipper.equipments.get(this.id),
      //   lite: this.lite
      // })
    }
  }

  editor(): JSX.Element {
    return (
      <>
        <VSelect v-model={this.type} label="类型" items={['Character', 'Equipment']} hideDetails />
        <VTextField v-model={this.id} label="id" hideDetails />
        <VSwitch v-model={this.lite} label="Lite" hideDetails />
      </>
    )
  }
}

export class TableElementAutoPartyRecent extends TableElement {
  readonly __type: string = 'AutoPartyRecent'
  private category: string
  private questId: string
  private size: number

  constructor(data: any) {
    super()
    this.category = data['category'] || 0
    this.questId = data['questId'] || 0
    this.size = data['size'] || 0
  }

  html(): JSX.Element {
    return h(TableComponentAutoPartyRecent, { category: this.category, questId: this.questId })
  }

  editor(): JSX.Element {
    return (
      <>
        <VTextField v-model={this.category} label="category" />
        <VTextField v-model={this.questId} label="questId" />
      </>
    )
  }

  get isFull(): boolean {
    return true
  }
}

export class TableElementObjectList extends TableElement {
  readonly __type: string = 'ObjectList'
  private objectList: Array<string>

  constructor() {
    super()
    this.objectList = []
  }
  html(): JSX.Element {
    const worldflipper = useWorldflipperDataStore()
    const characters = worldflipper.characters
    const equipments = worldflipper.equipments
    return (
      <div
        style={{
          background:
            'url(/static/worldflipper/ui/background_cut_official.png) -10px -10px / 136px',
          imageRendering: 'pixelated',
          borderRadius: '8px'
        }}
      >
        <div style={{ imageRendering: 'initial', display: 'flex', padding: '8px', justifyContent: "center" }}>
          {['1', '100', '10']
            .map((value) => {
              if (value.startsWith('u') || value.startsWith('c')) return characters.get(value.substring(1))
              else if (value.startsWith('a') || value.startsWith('e')) return equipments.get(value.substring(1))
              else return characters.get(value)
            })
            .map((value) =>
              value ? (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '5px' }}>
                  {h(CharacterIcon, { obj: value, size: 90 })}
                  <span style={{ marginTop: '6px', fontSize: '20px' }}>{value.names[0]}</span>
                </div>
              ) : undefined
            )
            .filter((value) => value)}
        </div>
      </div>
    )
  }

  editor(): JSX.Element {
    return h('div', [this.objectList])
  }
}

table.register('Party', TableElementParty)
table.register('Party2', TableElementParty)

table.register('WikiCard', TableElementWikiCard)

table.register('AutoPartyRecent', TableElementAutoPartyRecent)

table.register('ObjectList', TableElementObjectList)
