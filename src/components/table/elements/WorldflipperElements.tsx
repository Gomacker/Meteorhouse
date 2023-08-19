import table, { TableElement } from '@/components/table/table'
import type { JSX } from 'vue/jsx-runtime'

export class TableElementParty extends TableElement {
  readonly __type: string = 'Party'

  constructor(data: any) {
    super()
  }
  protected _data(): object {
    return {}
  }
  html(): JSX.Element {
    return <div>{this.__type}</div>
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
