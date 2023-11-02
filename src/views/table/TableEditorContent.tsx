import { defineComponent } from 'vue'
import table, { Table } from '@/components/table/table'
import { VBtn } from 'vuetify/components'
import { TableElementContainer, TableElementText } from '@/components/table/elements/BasicElements'

export default defineComponent({
  props: {
    table: {
      type: Table,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {props.table.content.map((value, index) =>
          value.editorWrapped(
            (data) => props.table.changeValue(value, table.load(data)),
            () => {
              const index = props.table.content.indexOf(value)
              props.table.delete(index)
            },
            () => {
              const index = props.table.content.indexOf(value)
              props.table.movePre(index)
            },
            () => {
              const index = props.table.content.indexOf(value)
              props.table.moveNext(index)
            },
            () => {
              const index = props.table.content.indexOf(value)
              props.table.insertPre(index, new TableElementContainer({}))
            },
            () => {
              const index = props.table.content.indexOf(value)
              props.table.insertNext(index, new TableElementContainer({}))
            },
            index % 2 ? '#fff' : 'lightgrey'
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
              // eslint-disable-next-line vue/no-mutating-props
              props.table.content.push(new TableElementText({}))
            }}
            prependIcon="mdi-plus"
          >
            新增组件
          </VBtn>
        </div>
      </div>
    )
  }
})
