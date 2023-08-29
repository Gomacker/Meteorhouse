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
        {props.table.content.map((value) =>
          value.editorWrapped((data) => props.table.changeValue(value, table.load(data)))
        )}
      </div>
    )
  }
})
