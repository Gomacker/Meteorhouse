import { defineComponent } from 'vue'
import './table.css'
import type { TableElement } from "@/components/table/table";

const component = defineComponent({
  props: { content: Array<TableElement> },
  setup(props) {
    return () => (
      <div class="table-container">
        {props.content?.map(value => value.html())}
      </div>
    )
  }
})

export default component
