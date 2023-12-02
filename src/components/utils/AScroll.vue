<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const scrollContainerRef = ref<HTMLDivElement>()
const scrollBarRef = ref<HTMLDivElement>()
const scrollThumbRef = ref<HTMLDivElement>()

const scrollBarTop = ref<number>()
const scrollBarHeight = ref<number>()

function scrollTo(percent: number) {
  const container = scrollContainerRef.value
  // console.log(percent)
  if (container) {
    container.scrollTop = container.scrollHeight * percent
    calculateScrollBar(container)
  }
}

// const scrollScale = computed(() => {
//   const container = scrollContainerRef.value
//   if (container) return Math.min(container.offsetHeight / container.scrollHeight, 1)
//   else return 0
// })

function calculateScrollBar(container: HTMLDivElement) {
  const scrollScale = Math.min(container.offsetHeight / container.scrollHeight, 1)
  scrollBarTop.value = scrollScale * container.scrollTop
  scrollBarHeight.value = scrollScale * container.offsetHeight
}

const isDragThumb = ref<boolean>(false)
onMounted(() => {
  const container = scrollContainerRef.value
  if (container) {
    calculateScrollBar(container)
  }
  addEventListener('mouseup', () => (isDragThumb.value = false))
  addEventListener('mousemove', (event: MouseEvent) => {
    if (isDragThumb.value) {
      const bar = scrollBarRef.value
      const thumb = scrollThumbRef.value
      if (bar && thumb) {
        scrollTo((event.clientY - thumb.getBoundingClientRect().height / 2 - bar.getBoundingClientRect().y) / bar.clientHeight)
      }
    }
  })
})
</script>

<template>
  <div
    class="scroll-wrapper"
    @wheel.prevent="(event: WheelEvent) => {
  const container = scrollContainerRef
  if (container) {
    event.preventDefault()
    container.scrollTop += event.deltaY
    calculateScrollBar(container)
  }
}"
  >
    <div ref="scrollContainerRef" class="scroll-container">
      <slot />
    </div>
    <div ref="scrollBarRef" class="scroll-bar">
      <div
        ref="scrollThumbRef"
        class="scroll-thumb"
        @mousedown.prevent="() => (isDragThumb = true)"
        :style="{ top: `${scrollBarTop}px`, height: `${scrollBarHeight}px` }"
      />
    </div>
  </div>
</template>

<style scoped>
.scroll-wrapper {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 4px;
  //transition: box-shadow 0.2s ease;
}
.scroll-wrapper:hover {
  //box-shadow: 0 0 4px black;
}
.scroll-container {
  position: relative;
  height: 100%;
  overflow: auto;
}
.scroll-container::-webkit-scrollbar {
  //visibility: hidden;
  width: 0;
}
.scroll-bar {
  width: 6px;
  height: 100%;
  border-radius: 20px;
  background: #a9a9a9;
  background: linear-gradient(to bottom, #a9a9a9 0, #a9a9a940 40%, #a9a9a940 60%, #a9a9a9);
  background: transparent;
  opacity: 0;
  //opacity: 1;
  //box-shadow: 0 0 8px black;
  position: absolute;
  top: 0;
  right: 0;
  transition: opacity 0.2s;
}
.scroll-bar:hover {
  //background: #a0a0a0;
}
.scroll-thumb {
  position: absolute;
  background: #666;
  border-radius: inherit;
  top: 0;
  width: 100%;
  height: 0;
  cursor: pointer;
  //transition: top 0.3s ease;
}
.scroll-thumb:hover {
  background: #333;
}
.scroll-wrapper:hover > .scroll-bar {
  opacity: 100%;
}
</style>
