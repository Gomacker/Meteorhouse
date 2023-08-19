<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const event_list = ref<Array<any>>([])

axios.post('/api/timeline_data/').then((r) => {
  event_list.value = r.data
})
</script>

<template>
  <div style="height: fit-content">
    <v-card-text>
      <p>//TODO fix 图源权限爆了</p>
      <p>//TODO fix 大部分没有结束时间导致无法判断范围</p>
    </v-card-text>
    <v-timeline style="padding-left: 16px; height: max-content" side="end">
      <v-timeline-item v-for="(i, time) in event_list" :key="i">
        <template v-slot:opposite>
          {{ time }}
        </template>
        <div style="display: flex; flex-wrap: wrap">
          <v-card
            style="margin: 4px; width: 240px; height: fit-content; user-select: none;"
            :style="{background: j['background_color']}"
            elevation="2"
            v-ripple
            v-for="j in i['content']"
            :key="j"
          >
            <v-img style="background: lightgray" @dragstart.prevent :aspect-ratio="16 / 9" :src="j['image_url'].replace('/assets', '/static').replace(/\?w=\d+&h=\d+/, '') + '?w=1'" />
            <v-card-item style="font-weight: bold">{{ j['title'] }}</v-card-item>
            <v-card-text style="color: gray">{{ j['description'] }}</v-card-text>
          </v-card>
        </div>
      </v-timeline-item>
    </v-timeline>
    <div style="display: flex; justify-content: center; padding-bottom: 32px">
      <v-btn color="blue">加载更多</v-btn>
    </div>
  </div>
</template>

<style scoped></style>
