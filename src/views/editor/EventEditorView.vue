<script setup lang="ts">
import { manager } from '@/stores/manager'
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'
import { ref } from 'vue'
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

// const events = ref<Map<string, Event>>(new Map())
const events = ref<Map<string, object>>(new Map())

axios.post('/api/v1/data/event/').then((r) => {
  events.value = new Map(Object.entries(r.data['events']))
})
const page = ref(1)
const opp = ref(40)
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <div v-for="e in events" :key="e[0]">
      <v-textarea :model-value="JSON.stringify(e[1], null, 2)"></v-textarea>
    </div>
  </div>
</template>

<style scoped></style>
