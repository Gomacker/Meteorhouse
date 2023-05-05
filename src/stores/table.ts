import chroma from 'chroma-js'

// class TableProperty {
//     private readonly _data: any;
//     // public title: string;
//     // public main_color: chroma;
//     // public sub_color: chroma;
//     // public little_about: string;
//     // public banner: string;
//     // public background: string;
//     // public footer: string;
//     constructor(data: any) {
//         this._data = data
//         // this.title = data['title']
//         // this.main_color = chroma(data['main_color'])
//         // this.sub_color = chroma(data['sub_color'])
//         // this.little_about = data['little_about']
//         // this.banner = data['banner']
//         // this.background = data['background']
//         // this.footer = data['footer']
//     }
//
//     get title(): string {
//         return 'title' in this._data ? this._data['title'] : ''
//     }
//
//     set title(title: string) {
//         this._data['title'] = title
//     }
//
//     get main_color(): chroma.Color {
//         return 'main_color' in this._data ? chroma(this._data['main_color']) : chroma('white')
//     }
//
//     set main_color(color: chroma.Color) {
//         this._data['main_color'] = color.hex()
//     }
//
//     get sub_color(): chroma.Color {
//         return 'sub_color' in this._data ? chroma(this._data['sub_color']) : chroma('white')
//     }
//
//     set sub_color(color: chroma.Color) {
//         this._data['sub_color'] = color.hex()
//     }
//
//     get little_about(): string {
//         return 'little_about' in this._data ? this._data['little_about'] : ''
//     }
//
//     set little_about(title: string) {
//         this._data['little_about'] = title
//     }
//
//     get banner(): string {
//         return 'banner' in this._data ? this._data['banner'] : ''
//     }
//
//     set banner(banner: string) {
//         this._data['banner'] = banner
//     }
//
//     get background(): string {
//         return 'background' in this._data ? this._data['background'] : ''
//     }
//
//     set background(background: string) {
//         this._data['background'] = background
//     }
//
//     get footer(): string {
//         return 'footer' in this._data ? this._data['footer'] : ''
//     }
//
//     set footer(footer: string) {
//         this._data['footer'] = footer
//     }
//
//     data() {
//         return {
//             title: this.title,
//             main_color: this.main_color.hex(),
//             sub_color: this.sub_color.hex(),
//             little_about: this.little_about,
//             banner: this.banner,
//             background: this.background,
//             footer: this.footer,
//         }
//     }
// }

class TableProperty {
  // private readonly _data: any;
  public title: string
  private _main_color: chroma.Color
  private _sub_color: chroma.Color
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
      little_about: this.little_about,
      banner: this.banner,
      background: this.background,
      footer: this.footer
    }
  }
}

abstract class TableElement {
  public readonly type: string
  protected _data: any
  protected constructor(data: { type: string; data: any }) {
    this.type = data['type']
    this._data = data['data']
  }
  data(): object {
    return {
      type: this.type,
      data: this._data
    }
  }
  static load(): TableElement {
    return new TableElementTextArea({})
  }
}

class TableElementTextArea extends TableElement {
  constructor(data: any) {
    super({ type: 'TextArea', data: data })
  }

  get content(): string {
    return Object.hasOwn(this._data, 'content') ? this._data['content'] : ''
  }

  get full_row(): boolean {
    return Object.hasOwn(this._data, 'full_row') ? this._data['full_row'] : false
  }

  data(): object {
    return {
      type: this.type,
      data: {
          content: this.content,
          full_row: this.full_row,

      }
    }
  }
}

export class Table {
  public property: TableProperty
  public content: any

  constructor(data: any) {
    this.property = new TableProperty(data['property'])
    this.content = data['content']
  }
  data() {
    return {
      property: this.property.data(),
      content: this.content
      // content: this.content
    }
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
