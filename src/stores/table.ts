import chroma from 'chroma-js'
import { Armament, manager, PartyRelease, Unit } from '@/stores/manager'

class TableProperty {
  // private readonly _data: any;
  public title: string
  private _main_color: chroma.Color
  private _sub_color: chroma.Color
  update_time: string
  public little_about: string
  public banner: string
  public background: string
  public footer: string

  constructor(data: any) {
    // this._data = data
    if (!data) data = {}
    this.title = 'title' in data ? data['title'] : ''
    this._main_color = 'main_color' in data ? chroma(data['main_color']) : chroma('white')
    this._sub_color = 'sub_color' in data ? chroma(data['sub_color']) : chroma('white')
    this.update_time = 'update_time' in data ? data['update_time'] : ''
    this.little_about = 'little_about' in data ? data['little_about'] : ''
    this.banner = 'banner' in data ? data['banner'] : ''
    this.background = 'background' in data ? data['background'] : ''
    this.footer = 'footer' in data ? data['footer'] : ''
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
  public type: string
  protected constructor(type: string) {
    this.type = type
  }
  data(): object {
    return {
      type: this.type,
      data: {}
    }
  }
  get full_row(): boolean {
    return false
  }

  static load(data: any): TableElement {
    // console.log(data)
    if (data.type === 'Row') {
      return new TableElementRow(data.data)
    }
    if (data.type === 'SubTitle') {
      return new TableElementSubTitle(data.data)
    }
    if (data['type'] === 'Html' || data['type'] === 'Origin') {
      return new TableElementHtml(data.data)
    }
    if (data['type'] === 'TextArea' || data['type'] === 'TextRegion') {
      return new TableElementTextArea(data.data)
    }
    if (data['type'] === 'Party') {
      // return new TableElementTextArea('')
      // return new TableElementAny(data.type, data.data)
      return new TableElementParty(data.data)
    }
    if (data['type'] === 'PartyUnion') {
      // return new TableElementTextArea('')
      // return new TableElementAny(data.type, data.data)
      return new TableElementPartyUnion(data.data)
    }
    if (data['type'] === 'WikiCard') {
      return new TableElementWikiCard(data.data)
    }
    return new TableElementAny(data.type, data.data)
  }
}

export class TableElementAny extends TableElement {
  private readonly d: any
  constructor(type: string, data: any) {
    super(type)
    this.d = data
  }
  data(): object {
    return {
      type: this.type,
      data: this.d
    }
  }
}

export class TableElementRow extends TableElement {
  public readonly elements: TableElement[]
  constructor(data: any) {
    super('Row')
    this.elements = Object.hasOwn(data, 'elements')
      ? Array.from(data['elements']).map((value) => TableElement.load(value))
      : new Array<TableElement>()
    // console.log(data)
  }
  data(): object {
    return {
      type: this.type,
      data: {
        elements: this.elements.map((value) => value.data())
      }
    }
  }

  move_pre(index: number) {
    if (this.elements[index - 1])
      this.elements[index - 1] = this.elements.splice(index, 1, this.elements[index - 1])[0]
  }
  move_next(index: number) {
    if (this.elements[index + 1])
      this.elements[index + 1] = this.elements.splice(index, 1, this.elements[index + 1])[0]
  }
  insert_textarea(index: number) {
    this.elements.splice(index, 0, new TableElementTextArea({}))
  }
  delete(index: number) {
    this.elements.splice(index, 1)
  }
}
export class TableElementSubTitle extends TableElement {
  public readonly content: string
  public readonly element: string
  constructor(data: any) {
    super('SubTitle')
    this.content = typeof data['content'] === 'string' ? data['content'] : ''
    this.element = typeof data['element'] === 'string' ? data['element'] : ''
    // console.log(data)
  }
  data(): object {
    return {
      type: this.type,
      data: {
        content: this.content,
        element: this.element
      }
    }
  }
}

export class TableElementHtml extends TableElement {
  public readonly content: string
  constructor(data: any) {
    super('Html')
    this.content = typeof data['content'] === 'string' ? data['content'] : ''
  }
  data(): object {
    return {
      type: this.type,
      data: {
        content: this.content
      }
    }
  }
}

export class TableElementParty extends TableElement {
  public readonly party_data: string
  public show_name: boolean
  public show_awaken: boolean

  constructor(data: any) {
    super('Party')
    this.party_data = data['party'] ? JSON.stringify(data['party'], null, 2) : JSON.stringify(PartyRelease.empty().data(), null, 2)
    this.show_name = data['show_name']
    this.show_awaken = data['show_awaken']
  }

  get party() {
    try {
      // console.log(this.party_data);
      return PartyRelease.loads(JSON.parse(this.party_data))
    } catch (e) {
      // console.log('party_data_read_error');
      return PartyRelease.empty()
    }
  }

  data(): object {
    return {
      type: this.type,
      data: {
        party: this.party.data(),
        show_name: this.show_name,
        show_awaken: this.show_awaken
      }
    }
  }
}

export class TableElementPartyUnion extends TableElementParty {
  public label: string
  public title: string
  public content: string
  constructor(data: any) {
    super(data)
    this.type = 'PartyUnion'
    this.label = data['label']
    this.title = data['title']
    this.content = data['content']
  }

  get full_row(): boolean {
    return true
  }

  data(): object {
    return Object.fromEntries(
      new Map(
        Object.entries(super.data()).concat(
          Object.entries({
            label: this.label,
            title: this.title,
            content: this.content
          })
        )
      )
    )
  }
}

export class TableElementWikiCard extends TableElement {
  public object_type: 'Unit' | 'Armament'
  public object_id: number
  public lite: boolean
  constructor(data: any) {
    super('WikiCard')
    this.object_type = ['Unit', 'Armament'].includes(data['type']) ? data['type'] : 'Unit'
    this.object_id = typeof data['id'] === 'number' ? data['id'] : 0
    this.lite = typeof data['lite'] === 'boolean' ? data['lite'] : false
  }

  get object(): Unit | Armament | undefined {
    if (this.object_type === 'Unit') return manager.unit_data.get(this.object_id)
    if (this.object_type === 'Armament') return manager.armament_data.get(this.object_id)
    return undefined
  }

  data(): object {
    return {
      type: this.type,
      data: {
        type: this.object_type,
        id: this.object_id,
        lite: this.lite
      }
    }
  }
}

export class TableElementTextArea extends TableElement {
  public content: string
  public little_title: boolean
  public full: boolean

  constructor(data: any) {
    // super('TextArea')
    super('TextRegion')
    this.content = typeof data['content'] === 'string' ? data['content'] : ''
    this.little_title = typeof data['little_title'] === 'boolean' ? data['little_title'] : false
    this.full = typeof data['full'] === 'boolean' ? data['full'] : false
  }

  get full_row(): any {
    return this.full
  }

  data(): object {
    return {
      type: this.type, // for legacy
      // type: this.type,
      data: {
        content: this.content,
        full: this.full,
        little_title: this.little_title
      }
    }
  }
}

export class Table {
  public property: TableProperty
  public content: Array<TableElement>

  constructor(data: any) {
    this.property = new TableProperty(data['property'])
    this.content = data['content']
      ? Array.from(data['content']).map((value) => TableElement.load(value))
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
    this.content.splice(index, 0, new TableElementRow({}))
  }
  delete(index: number) {
    this.content.splice(index, 1)
  }
}

export function format_content(content: string, icon_size: number = 24): string {
  let s = '<p>'
  s += content.replaceAll('\n', '</p><p>')
  s += '</p>'
  s = s.replaceAll(
    '火属性',
    '<img style="width: ' +
      icon_size +
      'px; vertical-align: text-bottom; margin: 0 2px;" src="/static/worldflipper/icon/desc_fire.png" alt=""/>'
  )
  s = s.replaceAll(
    '水属性',
    '<img style="width: ' +
      icon_size +
      'px; vertical-align: text-bottom; margin: 0 2px;" src="/static/worldflipper/icon/desc_water.png" alt=""/>'
  )
  s = s.replaceAll(
    '雷属性',
    '<img style="width: ' +
      icon_size +
      'px; vertical-align: text-bottom; margin: 0 2px;" src="/static/worldflipper/icon/desc_thunder.png" alt=""/>'
  )
  s = s.replaceAll(
    '风属性',
    '<img style="width: ' +
      icon_size +
      'px; vertical-align: text-bottom; margin: 0 2px;" src="/static/worldflipper/icon/desc_wind.png" alt=""/>'
  )
  s = s.replaceAll(
    '風属性',
    '<img style="width: ' +
      icon_size +
      'px; vertical-align: text-bottom; margin: 0 2px;" src="/static/worldflipper/icon/desc_wind.png" alt=""/>'
  )
  s = s.replaceAll(
    '光属性',
    '<img style="width: ' +
      icon_size +
      'px; vertical-align: text-bottom; margin: 0 2px;" src="/static/worldflipper/icon/desc_light.png" alt=""/>'
  )
  s = s.replaceAll(
    '暗属性',
    '<img style="width: ' +
      icon_size +
      'px; vertical-align: text-bottom; margin: 0 2px;" src="/static/worldflipper/icon/desc_dark.png" alt=""/>'
  )
  s = s.replaceAll(
    '闇属性',
    '<img style="width: ' +
      icon_size +
      'px; vertical-align: text-bottom; margin: 0 2px;" src="/static/worldflipper/icon/desc_dark.png" alt=""/>'
  )
  s = s.replaceAll(
    '作为主要角色编成：',
    '<img style="width: ' +
      icon_size +
      'px; vertical-align: text-bottom; margin: 0 2px;" src="/static/worldflipper/icon/desc_main.png" alt=""/>'
  )

  s = s.replaceAll('攻击力 +', '<span style="color: rgb(255, 128, 0)">攻击力</span> +')
  s = s.replaceAll('攻击力提升(', '<span style="color: rgb(255, 128, 0)">攻击力提升</span>(')
  s = s.replaceAll('技能伤害 +', '<span style="color: rgb(0, 128, 255)">技能伤害</span> +')
  s = s.replaceAll('技能伤害提升(', '<span style="color: rgb(0, 128, 255)">技能伤害提升</span>(')
  s = s.replaceAll('强化弹射伤害 +', '<span style="color: rgb(0,159,79)">强化弹射伤害</span> +')
  s = s.replaceAll(
    '强化弹射伤害提升(',
    '<span style="color: rgb(0,159,79)">强化弹射伤害提升</span>('
  )
  s = s.replaceAll('直接攻击伤害 +', '<span style="color: rgb(169,45,255)">直接攻击伤害</span> +')
  s = s.replaceAll(
    '直接攻击伤害提升(',
    '<span style="color: rgb(169,45,255)">直接攻击伤害提升</span>('
  )
  s = s.replaceAll('能力伤害 +', '<span style="color: rgb(255, 0, 128)">能力伤害</span> +')
  s = s.replaceAll('能力伤害提升(', '<span style="color: rgb(255, 0, 128)">能力伤害提升</span>(')
  return s
}
