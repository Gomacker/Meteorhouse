import { defineStore } from "pinia"
import type { CharacterData } from "@/anise/worldflipper/object"

export const useCardCreator = defineStore("cardCreator", {
  state(): { characters: { [key: string]: CharacterData } } {
    return {
      characters: {},
    }
  },
  actions: {},
  getters: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: "customCharacter",
        storage: localStorage,
        paths: ["characters"],
      },
    ],
  },
})