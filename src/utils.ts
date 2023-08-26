import { onUnmounted, ref } from 'vue'
import axios from 'axios'
import { PartyRelease } from "@/anise/worldflipper/party";

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

export class APIService {
  public async searchParty(partyId: string): Promise<PartyRelease | undefined> {
    const response = await axios.post(
      '/api/v2/worldflipper/api/party/refer',
      {},
      { params: { party_id: partyId }, timeout: 10000 }
    )
    if (response.status === 200) {
      const partyData = response.data
      if (partyData) return PartyRelease.load(partyData)
    }
    return undefined
  }
}

export const apiService = new APIService()
