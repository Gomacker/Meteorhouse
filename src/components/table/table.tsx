import chroma from "chroma-js";
import type { JSX } from "vue/jsx-runtime";
import { VCard, VCardItem, VDivider, VSelect } from "vuetify/components";
import TableEditorWrapperMenu from "@/components/table/elements/TableEditorWrapperMenu.vue";
import { h } from "vue";

export interface TableProfile {
  id: string
  name: string
  image: string
  weight: number
}

class TableProperty {
  public title: string
  private _main_color: chroma.Color
  private _sub_color: chroma.Color
  update_time: string
  public little_about: string
  public banner: string
  public background: string
  public footer: string
  public image: string;
  public name: string;
  public public: boolean;
  public weight: number;

  constructor(data: any) {
    if (!data) data = {}
    this.name = data['name'] || ''
    this.image = data['image'] || ''
    this.public = data['public'] || false
    this.weight = data['weight'] || 0
    this.title = data['title'] || ''
    this._main_color = chroma(data['main_color'] || 'white')
    this._sub_color = chroma(data['sub_color'] || 'white')
    this.update_time = data['update_time'] || ''
    this.little_about = data['little_about'] || ''
    this.banner = data['banner'] || ''
    this.background = data['background'] || ''
    this.footer = data['footer'] || ''
  }

  get main_color(): string {
    return chroma(this._main_color).hex()
  }

  set main_color(s: string) {
    this._main_color = chroma(s)
  }

  get_color_main(alpha: number): string {
    return this._main_color.alpha(alpha).hex()
  }

  get sub_color(): string {
    return chroma(this._sub_color).hex()
  }

  set sub_color(s: string) {
    this._sub_color = chroma(s)
  }

  get_color_sub(alpha: number): string {
    return this._sub_color.alpha(alpha).hex()
  }

  data() {
    return {
      name: this.name,
      image: this.image,
      public: this.public,
      weight: this.weight,
      title: this.title,
      main_color: this.main_color,
      sub_color: this.sub_color,
      update_time: this.update_time,
      little_about: this.little_about,
      banner: this.banner,
      background: this.background,
      footer: this.footer
    }
  }
}

export abstract class TableElement {
  abstract readonly __type: string
  data(): object {
    return {
      type: this.__type,
      data: this._data()
    }
  }

  protected _data(): object {
    const obj = JSON.parse(JSON.stringify(this))
    delete obj.__type
    return obj
  }
  abstract html(): JSX.Element
  abstract editor(): JSX.Element

  editorWrapped(onChangeType: (data: any) => void, onDelete: () => void, background: string = '#fff'): JSX.Element {
    return (
      <VCard
        style={{
          width: this.isFull ? '100%' : '50%',
          margin: '4px 0',
          transition: 'all 0.4s ease',
          background: background
        }}
      >
        <VCardItem>
          <div style="display: flex; align-items: center">
            <VSelect
              modelValue={this.__type}
              items={Array.from(elementManager.items().keys())}
              onUpdate:modelValue={(value) => {
                return onChangeType({ type: value, ...this._data() })
              }}
              hideDetails
              density="compact"
              label="类型"
            />
            {h(TableEditorWrapperMenu, { element: this, delete: onDelete })}
          </div>
          <VDivider style={{ margin: '4px' }} />
          <div>{this.editor()}</div>
        </VCardItem>
      </VCard>
    )
  }
  get isFull(): boolean {
    return false
  }
}

class TableElementError extends TableElement {
  readonly __type: string = 'Error'
  private readonly __data: any

  constructor(data: any) {
    super()
    this.__data = data
  }

  protected _data(): object {
    return this.__data
  }

  html(): JSX.Element {
    return <div style={{ color: 'blue' }}>未解析的组件：{JSON.stringify(this.data())}</div>
  }

  editor(): JSX.Element {
    return (
      <div style={{ color: 'blue' }}>
        这是一个未解析的组件，当保存时，它将被保存为Type Error：{JSON.stringify(this.data())}
      </div>
    )
  }
}

class ElementManager {
  private elementMap: Map<string, new (data: any) => TableElement>

  constructor() {
    this.elementMap = new Map()
    this.register('Error', TableElementError)
  }

  register(id: string, E: new (data: any) => TableElement) {
    this.elementMap.set(id, E)
  }

  load(data: any): TableElement {
    import('@/components/table/elements/BasicElements')
    import('@/components/table/elements/WorldflipperElements')
    const type = data['__type'] || data['type']
    const E = this.elementMap.get(type)
    return E ? new E(data['data'] || {}) : new TableElementError(data['data'] || {})
  }

  items() {
    return new Map(
      Array.from(new Set(this.elementMap.values())).map((value) => [new value({}).__type, value])
    )
  }
}

export const elementManager = new ElementManager()
export default elementManager

export class Table {
  public property: TableProperty
  public content: Array<TableElement>
  public id: string = ''

  constructor(data: any) {
    this.property = new TableProperty(data['property'])
    this.content = data['content']
      ? Array.from(data['content']).map((value) => elementManager.load(value))
      : []
  }
  public data() {
    return {
      property: this.property.data(),
      content: this.content.map((value) => value.data())
    }
  }

  changeValue(value: TableElement, newValue: TableElement) {
    this.content[this.content.indexOf(value)] = newValue
  }

  move_pre(index: number) {
    if (this.content[index - 1])
      this.content[index - 1] = this.content.splice(index, 1, this.content[index - 1])[0]
  }
  move_next(index: number) {
    if (this.content[index + 1])
      this.content[index + 1] = this.content.splice(index, 1, this.content[index + 1])[0]
  }
  insert_pre(index: number, element: TableElement) {
    this.content.splice(index, 0, element)
  }
  delete(index: number) {
    this.content.splice(index, 1)
  }
}

const replacements = [
  [/火属性/g, '<img class="icon-desc" src="/static/worldflipper/icon/desc_fire.png" alt=""/>'],
  [/水属性/g, '<img class="icon-desc" src="/static/worldflipper/icon/desc_water.png" alt=""/>'],
  [/雷属性/g, '<img class="icon-desc" src="/static/worldflipper/icon/desc_thunder.png" alt=""/>'],
  [/[风風]属性/g, '<img class="icon-desc" src="/static/worldflipper/icon/desc_wind.png" alt=""/>'],
  [/光属性/g, '<img class="icon-desc" src="/static/worldflipper/icon/desc_light.png" alt=""/>'],
  [/[暗闇]属性/g, '<img class="icon-desc" src="/static/worldflipper/icon/desc_dark.png" alt=""/>'],
  [
    /作为主要角色编成：/g,
    '<img class="icon-desc" src="/static/worldflipper/icon/desc_main.png" alt=""/>'
  ],
  [/攻击力 \+/g, '<span style="color: rgb(255, 128, 0)">攻击力</span> +'],
  [/攻击力提升\(/g, '<span style="color: rgb(255, 128, 0)">攻击力提升</span>('],
  [/技能伤害 \+/g, '<span style="color: rgb(0, 128, 255)">技能伤害</span> +'],
  [/技能伤害提升\(/g, '<span style="color: rgb(0, 128, 255)">技能伤害提升</span>('],
  [/强化弹射伤害 \+/g, '<span style="color: rgb(0, 159, 79)">强化弹射伤害</span> +'],
  [/强化弹射伤害提升\(/g, '<span style="color: rgb(0, 159, 79)">强化弹射伤害提升</span>('],
  [/直接攻击伤害 \+/g, '<span style="color: rgb(169, 45, 255)">直接攻击伤害</span> +'],
  [/直接攻击伤害提升\(/g, '<span style="color: rgb(169, 45, 255)">直接攻击伤害提升</span>('],
  [/能力伤害 \+/g, '<span style="color: rgb(255, 0, 128)">能力伤害</span> +'],
  [/能力伤害提升\(/g, '<span style="color: rgb(255, 0, 128)">能力伤害提升</span>(']
]

export function format_content(content: string): string {
  const ss = content.split('\n')
  for (const key in ss) {
    let s = ss[key]
    replacements.forEach(
      ([pattern, replacement]) => (s = s.replace(pattern, replacement as string))
    )
    ss[key] = s
  }
  return ss.map((value) => `<p>${value}</p>`).join('')
}
