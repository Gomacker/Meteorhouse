import table, { TableElement } from '@/components/table/table'
import type { JSX } from 'vue/jsx-runtime'
import { h } from 'vue'
import TableComponentTextContent from '@/components/table/elements/TableComponentTextContent.vue'
import { VBtn, VCard, VSwitch, VTextarea, VTextField } from 'vuetify/components'
import TableCard from '@/views/table/TableCard.vue'
import type { TableProfile } from "@/components/table/table";

export class TableElementContainer extends TableElement {
  readonly __type: string = 'Container'
  private elements: Array<TableElement>

  constructor(data: any) {
    super()
    this.elements = ((data['elements'] || []) as any[]).map((value) => table.load(value))
  }

  protected _data(): object {
    return {
      elements: this.elements.map((value) => value.data())
    }
  }

  html(): JSX.Element {
    return (
      <div
        class="table-element-container"
        style={{
          padding: this.elements.length === 1 && this.elements[0].__type === 'Html' ? '0' : '16px 0'
        }}
      >
        {this.elements.map((value, index) => (
          <div key={index} style={{ width: value.isFull ? '1008px' : '504px' }}>
            {value.html()}
          </div>
        ))}
      </div>
    )
  }

  editor(): JSX.Element {
    return (
      <VCard style={{ background: '#0f0', padding: '4px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {this.elements.map((value) =>
            value.editorWrapped(
              (data) => (this.elements[this.elements.indexOf(value)] = table.load(data)),
              () => this.elements.splice(this.elements.indexOf(value), 1)
            )
          )}
          <div
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <VBtn
              // @ts-ignore onClick在此处没有受到WebStorm支持
              onClick={() => {
                this.elements.push(new TableElementText({}))
              }}
              prependIcon="mdi-plus"
            >
              新增组件
            </VBtn>
          </div>
        </div>
      </VCard>
    )
  }

  get isFull(): boolean {
    return true
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

  editor(): JSX.Element {
    return (
      <>
        <div style="display: flex; align-items: center">
          <img
            src={`/static/worldflipper/icon/${this.icon}.png`}
            alt=""
            style={{ width: '28px', height: '28px', margin: '0 8px' }}
          />
          <VTextField v-model={this.icon} label="icon" density="compact" hideDetails />
        </div>
        <VTextField v-model={this.content} label="内容" density="compact" hideDetails />
      </>
    )
  }

  get isFull(): boolean {
    return true
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

  editor(): JSX.Element {
    return <div>{JSON.stringify(this.data())}</div>
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
    return h(TableComponentTextContent, {
      class: 'table-element-text',
      style: {
        fontSize: this.little_title ? '28px' : '22px',
        width: this.full ? '992px' : '480px'
      },
      content: this.content
    })
  }

  editor(): JSX.Element {
    return (
      <>
        <VTextarea v-model={this.content} hideDetails />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <VSwitch label="小标题" v-model={this.little_title} hideDetails />
          <VSwitch label="占据整行" v-model={this.full} hideDetails />
        </div>
      </>
    )
  }

  get isFull(): boolean {
    return this.full
  }
}

export class TableElementTableCard extends TableElement {
  readonly __type: string = 'TableCard'
  tableProfile: TableProfile

  constructor(data: any) {
    super()
    this.tableProfile = data['tableProfile'] || {}
  }

  editor(): JSX.Element {
    return <div>{JSON.stringify(this.data())}</div>
  }

  html(): JSX.Element {
    return h(TableCard, { tableProfile: this.tableProfile })
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

table.register('TableCard', TableElementTableCard)
