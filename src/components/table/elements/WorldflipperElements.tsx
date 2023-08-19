import table, { TableElement } from '@/components/table/table'
import type { JSX } from 'vue/jsx-runtime'
import { h } from "vue";
import TableComponentParty from "@/components/table/elements/TableComponentParty.vue";
import { PartyRelease } from "@/anise/worldflipper/party";

export class TableElementParty extends TableElement {
  readonly __type: string = 'Party'
  private _party: any;
  public title: string;
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
    return h(TableComponentParty, {element: this})
  }
}

export class TableElementWikiCard extends TableElement {
  readonly __type: string = 'WikiCard'

  html(): JSX.Element {
    return <div>{this.__type}</div>
  }
}

table.register('Party', TableElementParty)
table.register('Party2', TableElementParty)

table.register('WikiCard', TableElementWikiCard)
