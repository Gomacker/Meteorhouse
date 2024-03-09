import { makeAPI } from '../types/api'
import axios from 'axios'
import * as url from 'node:url'
import { defineComponent } from 'vue'

export default makeAPI({
  name: 'worldflipper',
  source: '/api/v2/worldflipper',
  method: {
    fetchData: async function(): Promise<{}> {
      const response = await axios.get(url.resolve(this.source, '/data'))
      if (response.status === 200) {
        throw new Error('Failed to fetch data')
      }
      return response.data
    }
  }
})

defineComponent({

})