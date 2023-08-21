import chroma from 'chroma-js'
import type { JSX } from 'vue/jsx-runtime'

class TableProperty {
  public title: string
  private _main_color: chroma.Color
  private _sub_color: chroma.Color
  update_time: string
  public little_about: string
  public banner: string
  public background: string
  public footer: string

  constructor(data: any) {
    if (!data) data = {}
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
    const type = data['type']
    const E = this.elementMap.get(type)
    return E ? new E(data['data'] || {}) : new TableElementError(data['data'] || {})
  }
}

export const elementManager = new ElementManager()
export default elementManager

// export class TableElementRow extends TableElement {
//   public readonly elements: TableElement[]
//   constructor(data: any) {
//     super('Row')
//     this.elements = data.hasOwnProperty('elements')
//       ? Array.from(data['elements']).map((value) => TableElement.load(value))
//       : new Array<TableElement>()
//   }
//   data(): object {
//     return {
//       type: this.type,
//       data: {
//         elements: this.elements.map((value) => value.data())
//       }
//     }
//   }
//
//   html() {
//     return (
//       <div>
//         {this.elements.map(value => value.html())}
//       </div>
//     )
//   }
//
//   move_pre(index: number) {
//     if (this.elements[index - 1])
//       this.elements[index - 1] = this.elements.splice(index, 1, this.elements[index - 1])[0]
//   }
//   move_next(index: number) {
//     if (this.elements[index + 1])
//       this.elements[index + 1] = this.elements.splice(index, 1, this.elements[index + 1])[0]
//   }
//   insert_textarea(index: number) {
//     this.elements.splice(index, 0, new TableElementTextArea({}))
//   }
//   delete(index: number) {
//     this.elements.splice(index, 1)
//   }
// }

// export class TableElementHtml extends TableElement {
//   public readonly content: string
//   constructor(data: any) {
//     super('Html')
//     this.content = typeof data['content'] === 'string' ? data['content'] : ''
//   }
//   data(): object {
//     return {
//       type: this.type,
//       data: {
//         content: this.content
//       }
//     }
//   }
//   get isFull(): boolean {
//     return true
//   }
// }

// export class TableElementParty extends TableElement {
//   public readonly party_data: string
//   public show_name: boolean
//   public show_awaken: boolean
//
//   constructor(data: any) {
//     super('Party')
//     this.party_data = data['party']
//       ? JSON.stringify(data['party'], null, 2)
//       : JSON.stringify(PartyRelease.empty().data(), null, 2)
//     this.show_name = data['show_name']
//     this.show_awaken = data['show_awaken']
//   }
//
//   get party() {
//     try {
//       // console.log(this.party_data);
//       return PartyRelease.loads(JSON.parse(this.party_data))
//     } catch (e) {
//       // console.log('party_data_read_error');
//       return PartyRelease.empty()
//     }
//   }
//
//   data(): object {
//     return {
//       type: this.type,
//       data: {
//         party: this.party.data(),
//         show_name: this.show_name,
//         show_awaken: this.show_awaken
//       }
//     }
//   }
// }

// export class TableElementParty2 extends TableElementParty {
//   public title: string
//   public subtitle: string
//   constructor(data: any) {
//     super(data)
//     this.type = 'Party2'
//     this.title = data['title']
//     this.subtitle = data['subtitle']
//   }
//
//   data(): object {
//     const obj: any = super.data()
//     obj['data'] = Object.fromEntries(
//       Object.entries(obj['data']).concat(
//         Object.entries({
//           title: this.title,
//           subtitle: this.subtitle
//         })
//       )
//     )
//     return obj
//   }
// }

// export class TableElementPartyUnion extends TableElementParty {
//   public label: string
//   public title: string
//   public content: string
//   constructor(data: any) {
//     super(data)
//     this.type = 'PartyUnion'
//     this.label = data['label']
//     this.title = data['title']
//     this.content = data['content']
//   }
//
//   get isFull(): boolean {
//     return true
//   }
//
//   data(): object {
//     const obj: any = super.data()
//     obj['data'] = Object.fromEntries(
//       Object.entries(obj['data']).concat(
//         Object.entries({
//           label: this.label,
//           title: this.title,
//           content: this.content
//         })
//       )
//     )
//     return obj
//   }
// }

// export class TableElementWikiCard extends TableElement {
//   public object_type: 'Unit' | 'Armament'
//   public object_id: number
//   public lite: boolean
//   constructor(data: any) {
//     super('WikiCard')
//     this.object_type = ['Unit', 'Armament'].includes(data['type']) ? data['type'] : 'Unit'
//     this.object_id = typeof data['id'] === 'number' ? data['id'] : 0
//     this.lite = typeof data['lite'] === 'boolean' ? data['lite'] : false
//   }
//
//   get object(): Unit | Armament | undefined {
//     if (this.object_type === 'Unit') return manager.unit_data.get(this.object_id)
//     if (this.object_type === 'Armament') return manager.armament_data.get(this.object_id)
//     return undefined
//   }
//
//   data(): object {
//     return {
//       type: this.type,
//       data: {
//         type: this.object_type,
//         id: this.object_id,
//         lite: this.lite
//       }
//     }
//   }
// }

// export class TableElementObjectMap extends TableElement {
//   public id_list: string
//
//   constructor(data: any) {
//     super('ObjectMap')
//     this.id_list = typeof data['id_list'] == 'string' ? data['id_list'] : '["u1"]'
//   }
//
//   data(): object {
//     return {
//       type: this.type,
//       data: {}
//     }
//   }
// }

export class Table {
  public property: TableProperty
  public content: Array<TableElement>

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

  move_pre(index: number) {
    if (this.content[index - 1])
      this.content[index - 1] = this.content.splice(index, 1, this.content[index - 1])[0]
  }
  move_next(index: number) {
    if (this.content[index + 1])
      this.content[index + 1] = this.content.splice(index, 1, this.content[index + 1])[0]
  }
  insert_row(index: number) {
    // this.content.splice(index, 0, new TableElementContainer({}))
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
    replacements.forEach(([pattern, replacement]) => s = s.replace(pattern, replacement as string))
    ss[key] = s
  }
  return ss.map((value) => `<p>${value}</p>`).join('')
}
