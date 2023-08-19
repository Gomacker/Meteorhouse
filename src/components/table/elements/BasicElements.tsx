import table, { TableElement } from '@/components/table/table'
import type { JSX } from 'vue/jsx-runtime'
import { h } from 'vue'
import TableComponentTextContent from '@/components/table/elements/TableComponentTextContent.vue'

export class TableElementContainer extends TableElement {
  readonly __type: string = 'Container'
  private elements: Array<TableElement>

  constructor(data: any) {
    super()
    this.elements = ((data['elements'] || []) as any[]).map((value) => table.load(value))
  }

  html(): JSX.Element {
    return <div>{this.elements.map((value) => value.html())}</div>
  }
}

export class TableElementTitle extends TableElement {
  readonly __type: string = 'Title'
  private icon: string
  private content: string

  constructor(data: any) {
    super()
    this.icon = data['icon'] || data['element'] || 'none'
    this.content = data['content'] || ''
  }

  html(): JSX.Element {
    return (
      <div
        style="
                background: var(--main-background-color);
                backdrop-filter: blur(2px);
                box-shadow: 0 0 16px black;
                color: white;
                font: 38px Arial, '黑体';
                width: 100%;
                padding: 6px 16px;
                display: flex;
                align-items: center;
                z-index: 1;
              "
      >
        <img
          style="width: 36px; margin: 0 4px"
          src={`/static/worldflipper/icon/${this.icon}.png`}
          alt=""
        />
        {h(TableComponentTextContent, {
          style: 'font-weight: bold',
          text_border: false,
          content: this.content
        })}
      </div>
    )
  }
}

export class TableElementHtml extends TableElement {
  readonly __type: string = 'Html'
  private content: string

  constructor(data: any) {
    super()
    this.content = data['content']
  }

  html(): JSX.Element {
    return <>{this.content}</>
  }
}

export class TableElementText extends TableElement {
  readonly __type: string = 'Text'
  public content: string
  public little_title: boolean
  public full: boolean

  constructor(data: any) {
    super()
    this.content = typeof data['content'] === 'string' ? data['content'] : ''
    this.little_title = !!data['little_title']
    this.full = !!data['full']
  }

  html(): JSX.Element {
    return h(TableComponentTextContent, {
      style: { margin: '0 6px', fontSize: '22px' },
      content: this.content
    })
  }

  get isFull(): boolean {
    return this.full
  }
}

table.register('Container', TableElementContainer)
table.register('Row', TableElementContainer)

table.register('Title', TableElementTitle)
table.register('SubTitle', TableElementTitle)

table.register('Html', TableElementHtml)
table.register('Origin', TableElementHtml)

table.register('Text', TableElementText)
table.register('TextArea', TableElementText)
table.register('TextRegion', TableElementText)
