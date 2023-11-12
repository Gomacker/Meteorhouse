<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

enum EventType {
  default,
  event_box_gacha,
}

class Event {
  // type: EventType;
  type: string;
  title: string;
  constructor(data: any) {
    // this.type = EventType(data['type'])
    this.type = data['type']
    this.title = data['title']
  }

}

const testData = ref()

onMounted(() => {
  axios.get('https://wf-calendar.miaowm5.com/data/info.json').then(
    response => {
      if (response.status === 200) {
        testData.value = response.data
      }
    }
  )
})
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    {{ testData }}
  </div>
</template>

<style scoped></style>
