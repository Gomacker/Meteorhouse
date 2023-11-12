import { defineStore } from 'pinia'

export const useSettings = defineStore('settings', {
  state() {
    return {
      showMagicCircle: true
    }
  },
  persist: {
    enabled: true,
    strategies: [{ key: 'settings', storage: localStorage, paths: ['showMagicCircle'] }]
  }
})
