import table, { TableElement } from "@/components/table/table"
import type { JSX } from "vue/jsx-runtime"
import { h } from "vue"
import TableComponentTextContent from "@/components/table/elements/TableComponentTextContent.vue"
import { VBtn, VCard, VSwitch, VTextarea, VTextField } from "vuetify/components"
import TableCard from "@/views/table/TableCard.vue"
import type { TableProfile } from "@/components/table/table"

export class TableElementContainer extends TableElement {
  readonly __type: string = "Container"
  private elements: Array<TableElement>

  constructor(data: any) {
    super()
    this.elements = ((data["elements"] || []) as any[]).map((value) => table.load(value))
  }

  protected _data(): object {
    return {
      elements: this.elements.map((value) => value.data()),
    }
  }

  movePre(index: number) {
    if (this.elements[index - 1])
      this.elements[index - 1] = this.elements.splice(index, 1, this.elements[index - 1])[0]
  }

  moveNext(index: number) {
    if (this.elements[index + 1])
      this.elements[index + 1] = this.elements.splice(index, 1, this.elements[index + 1])[0]
  }

  insertPre(index: number, element: TableElement) {
    this.elements.splice(index, 0, element)
  }

  insertNext(index: number, element: TableElement) {
    this.elements.splice(index + 1, 0, element)
  }

  html(): JSX.Element {
    return h(
      "div",
      {
        class: "table-element-container",
        style: { padding: this.elements.length === 1 && this.elements[0].__type === "Html" ? "0" : "16px 0" },
      },
      this.elements.map((value, index) =>
        h(
          "div",
          { key: index, style: { width: value.isFull ? "1008px" : "504px" } },
          [value.html()],
        ),
      ),
    )
  }

  editor(): JSX.Element {
    return (
      <VCard style={{ background: "#333", padding: "2px" }}>
        {h(
          "div",
          { style: "display: flex; flex-wrap: wrap; justify-content: center" },
          [
            ...this.elements.map(value =>
              value.editorWrapped(
                (data) => (this.elements[this.elements.indexOf(value)] = table.load(data)),
                () => this.elements.splice(this.elements.indexOf(value), 1),
                () => this.movePre(this.elements.indexOf(value)),
                () => this.moveNext(this.elements.indexOf(value)),
                () => this.insertPre(this.elements.indexOf(value), new TableElementText({})),
                () => this.insertNext(this.elements.indexOf(value), new TableElementText({})),
              ),
            ),
            h(
              "div",
              {
                style: {
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              },
              [
                <VBtn
                  onClick={() => {
                    this.elements.push(new TableElementText({}))
                  }}
                  prependIcon="mdi-plus"
                >
                  新增组件
                </VBtn>,
              ],
            ),
          ],
        )}
      </VCard>
    )
  }

  get isFull(): boolean {
    return true
  }
}

export class TableElementTitle extends TableElement {
  readonly __type: string = "Title"
  private icon: string
  private content: string

  constructor(data: any) {
    super()
    this.icon = data["icon"] || data["element"] || "none"
    this.content = data["content"] || ""
  }

  html(): JSX.Element {
    return h(
      "div",
      { class: "table-element-title" },
      [
        h(
          "img",
          {
            style: "width: 36px; margin: 0 4px",
            src: `/static/worldflipper/icon/${this.icon}.png`,
            alt: "",
          },
        ),
        <TableComponentTextContent
          style="font-weight: bold"
          text_border={false}
          content={this.content}
        />,
      ],
    )
  }

  editor(): JSX.Element {
    return (
      <>
        {h(
          "div",
          { style: "display: flex; align-items: center" },
          [
            h(
              "img",
              {
                style: "width: 28px; height: 28px; margin: 0 8px",
                src: `/static/worldflipper/icon/${this.icon}.png`,
                alt: "",
              },
            ),
            <VTextField v-model={this.icon} label="icon" density="compact" hideDetails />,
          ],
        )}
        <VTextField v-model={this.content} label="内容" density="compact" hideDetails />
      </>
    )
  }

  get isFull(): boolean {
    return true
  }
}

export class TableElementHtml extends TableElement {
  readonly __type: string = "Html"
  public content: string

  constructor(data: any) {
    super()
    this.content = data["content"]
  }

  html(): JSX.Element {
    return h("div", { innerHTML: this.content })
    // return <div innerHTML={this.content}></div>
  }

  editor(): JSX.Element {
    return h("div", [<VTextField v-model={this.content}></VTextField>])
    // return (
    //   <div>
    //     <VTextField v-model={this.content}></VTextField>
    //   </div>
    // )
  }

  get isFull(): boolean {
    return true
  }
}

export class TableElementText extends TableElement {
  readonly __type: string = "Text"
  public content: string
  public little_title: boolean
  public full: boolean

  constructor(data: any) {
    super()
    this.content = typeof data["content"] === "string" ? data["content"] : ""
    this.little_title = !!data["little_title"]
    this.full = !!data["full"]
  }

  html(): JSX.Element {
    return h(TableComponentTextContent, {
      class: "table-element-text",
      style: {
        fontSize: this.little_title ? "28px" : "22px",
        width: this.full ? "992px" : "480px",
      },
      content: this.content,
    })
  }

  editor(): JSX.Element {
    return (
      <>
        <VTextarea v-model={this.content} hideDetails />
        {h(
          "div",
          { style: "display: flex; flex-wrap: wrap" },
          [
            <VSwitch label="小标题" v-model={this.little_title} hideDetails />,
            <VSwitch label="占据整行" v-model={this.full} hideDetails />,
          ],
        )}
      </>
    )
  }

  get isFull(): boolean {
    return this.full
  }
}

export class TableElementTableCard extends TableElement {
  readonly __type: string = "TableCard"
  tableProfile: TableProfile

  constructor(data: any) {
    super()
    this.tableProfile = data["tableProfile"] || {}
  }

  editor(): JSX.Element {
    return h("div", [JSON.stringify(this.data())])
    // return <div>{JSON.stringify(this.data())}</div>
  }

  html(): JSX.Element {
    return h(TableCard, { tableProfile: this.tableProfile })
  }
}

table.register("Container", TableElementContainer)
table.register("Row", TableElementContainer)

table.register("Title", TableElementTitle)
table.register("SubTitle", TableElementTitle)

table.register("Html", TableElementHtml)
table.register("Origin", TableElementHtml)

table.register("Text", TableElementText)
table.register("TextArea", TableElementText)
table.register("TextRegion", TableElementText)

table.register("TableCard", TableElementTableCard)
