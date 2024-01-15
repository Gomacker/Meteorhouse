<script setup lang="ts">
import moment from 'moment/moment'
import type { QuestEvent } from '@/components/worldflipper/event/QuestEventBanner.vue'
import { ref } from 'vue'
import d from './test_data.json'
import QuestEventCard, { type QuestEventSet } from '@/components/worldflipper/event/QuestEventCard.vue'

function from_json(d: any): QuestEventSet {
  return {
    time: d.time ? moment(d.time) : undefined,
    time_legacy: d.time_legacy ? moment(d.time_legacy) : undefined,
    description: d.description,
    quest: d.quest
  }
}
const event_list = ref<Array<QuestEventSet>>(d.map((value) => from_json(value)))
</script>

<template>
  <div>
    <div>
      <template v-for="e in event_list" :key="e">
        <QuestEventCard :event_set="e" />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
