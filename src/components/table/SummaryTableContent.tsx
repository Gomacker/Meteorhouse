import { defineComponent } from 'vue'
import './table.css'
import type { TableElement } from "@/components/table/table";

const component = defineComponent({
  props: { content: Array<TableElement> },
  setup(props) {
    return () => (
      <>
        {props.content?.map(value => value.html())}
      </>
    )
  }
})

export default component
