import { defineComponent } from 'vue'

class Code {
  constructor(public content: string) {
    // const reg = /\[(\w+)((?::\w+[^]]*)|(?:\s+(\w+=[^]]*))*)]/g
    // const reg = /\[(\w+)(?:\s+(\w+=[^]]*))*]/g
    const reg = /(?<=\[)([^]]+)(?=])/g
    const typeReg = /(?<=\[)([^\s\]]+)(?=(?:\s+(\w+=[^]]*))*])/
    const type = [...content.match(typeReg) || []]
    const matches = [...content.match(reg) || []]
    console.log(content.substring(1, content.length - 1));
  }

  code_load(type: string, params: Record<string, string>) {
    // 根据 type 和 params 处理指令，这里只是示意
    console.log(type)
    const processedDirective = `Processed: ${type} with params ${JSON.stringify(params)}`
    this.content += processedDirective
    return this
  }

  html() {
    return <div>{this.content}</div>
  }
}

class TextLoader {
  constructor(public text: string) {}

  get() {
    const directiveRegex = /\[.*?]/g
    const directiveTypeRegex = /(\S+)\s*((\w+="[^"]*")\s*)*/

    let bracketed = (this.text.match(directiveRegex) || []).map((value) => new Code(value))
    const unbracketed = this.text.split(directiveRegex)
    const contentList: (Code | string)[] = []
    for (let i = 0; i < unbracketed.length; i++) {
      if (unbracketed[i]) contentList.push(unbracketed[i])
      if (i < bracketed.length) contentList.push(bracketed[i])
    }
    let resultHtml: JSX.Element | undefined = undefined
    for (const c of contentList) {
      if (c instanceof Code)
        resultHtml = (
          <>
            {resultHtml}
            <span style={{ color: 'white' }}>{c.content}</span>
          </>
        )
      else
        resultHtml = (
          <>
            {resultHtml}
            <span style={{ color: 'red' }}>{c}</span>
          </>
        )
    }

    return (
      <>
        Processed Content: {resultHtml}
      </>
    )
  }
}

const component = defineComponent({
  props: {
    content: String,
    text_border: {
      type: Boolean,
      default: true
    },
    html_access: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    if (props.content) {
      // const statement = {}
      // const rows = props.content.split('m')
      // const content = <></>
      // for (const row of rows) {
      //   const codes = row.match(/\[.*?]/g) || []
      //   const contents = row.split(/\[.*?]/g)
      //   const rowContent = <p>{row.match(/\[.*?]/g)}</p>
      // }
      return () => <div style={{ whiteSpace: 'pre-wrap' }}>{new TextLoader(props.content || '').get()}</div>
    } else return
  }
})

export default component
