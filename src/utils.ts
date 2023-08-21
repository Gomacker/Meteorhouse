import { onUnmounted, ref } from "vue";

export function useDefer() {
  const frameCount = ref(0)
  let rafId = 0
  function updateFrameCount() {
    rafId = requestAnimationFrame(() => {
      frameCount.value++
      updateFrameCount()
    })
  }
  updateFrameCount()
  onUnmounted(() => cancelAnimationFrame(rafId))
  return function defer(n: number, before: boolean = false) {
    return before ? frameCount.value <= n : frameCount.value >= n
  }
}
