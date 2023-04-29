<script setup lang="ts">
const props = defineProps({
  quest_name: {
    type: String,
    default: '未知副本'
  },
  room_number: {
    type: String,
    default: '------'
  },
  background_url: {
    type: String
  },
  image_url: {
    type: String
  }
})
</script>

<template>
  <div>
    <div
      @dragstart.prevent
      :style="{ background: `url(${props.background_url})` }"
      style="
        border-radius: 8px;
        width: 480px;
        height: 160px;
        background-size: 100%;
        background-position-y: 0;
        image-rendering: pixelated;
        overflow: hidden;
        padding: 12px;
        margin: 16px;
        box-shadow: 0 8px 0 rgba(0, 0, 0, 0.15);
        /*box-shadow: 0 8px 0 rgb(90, 57, 95);*/
        /*filter: drop-shadow(0 0 8px rgb(90, 57, 95));*/
      "
    >
      <div
        style="
          image-rendering: auto;
          display: flex;
          justify-content: space-between;
          height: 100%;
          box-shadow: 0 0 8px black;
          backdrop-filter: blur(2px);
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 8px;
        "
      >
        <div
          style="
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            font-family: Arial, '黑体', sans-serif;
            font-weight: bolder;
            flex-direction: column;
          "
        >
          <div style="font-size: 24px; text-align: center">
            {{ quest_name }}
          </div>
          <div style="font-size: 44px; font-weight: bold">
            {{ props.room_number.substring(0, 3) }} {{ props.room_number.substring(3, 6) }}
          </div>
        </div>
        <img @dragstart.prevent style="min-width: 173px; height: 100%; border-radius: 8px; user-select: none;" :src="image_url" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
