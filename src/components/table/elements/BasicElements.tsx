import table, { TableElement } from '@/components/table/table'
import type { JSX } from 'vue/jsx-runtime'
import { h, render } from "vue";
import TableComponentTextContent from '@/components/table/elements/TableComponentTextContent.vue'
import TableTextContent from '@/components/table/TableTextContent'

export class TableElementContainer extends TableElement {
  readonly __type: string = 'Container'
  private elements: Array<TableElement>

  constructor(data: any) {
    super()
    this.elements = ((data['elements'] || []) as any[]).map((value) => table.load(value))
  }

  html(): JSX.Element {
    return (
      <div
        class="table-element-container"
        style={{
          padding: this.elements.length === 1 && this.elements[0].__type === 'Html' ? '0' : '16px 0'
        }}
      >
        {this.elements.map((value) => (
          <div style={{ width: value.isFull ? '1008px' : '504px' }}>{value.html()}</div>
        ))}
      </div>
    )
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
      <div class="table-element-title">
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
    return <div innerHTML={this.content}></div>
  }

  get isFull(): boolean {
    return true
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
    // return (
    //   <TableTextContent
    //     content={this.content}
    //     class="table-element-text"
    //     style={{
    //       fontSize: this.little_title ? '28px' : '22px',
    //       width: this.full ? '992px' : '480px'
    //     }}
    //   />
    // )
    return h(TableComponentTextContent, {
      class: 'table-element-text',
      style: {
        fontSize: this.little_title ? '28px' : '22px',
        width: this.full ? '992px' : '480px'
      },
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
