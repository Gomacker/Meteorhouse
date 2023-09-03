import { defineComponent } from 'vue'
import table, { Table } from '@/components/table/table'

export default defineComponent({
  props: {
    table: {
      type: Table,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div>
        {props.table.content.map((value, index) =>
          value.editorWrapped(
            (data) => props.table.changeValue(value, table.load(data)),
            () => {
              const index = props.table.content.indexOf(value)
              props.table.delete(index)
            },
            index % 2 ? '#fff' : 'lightgrey'
          )
        )}
      </div>
    )
  }
})
