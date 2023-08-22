import { defineStore } from "pinia";
import { Character, Equipment } from "@/anise/worldflipper/object";
import axios from "axios";
import { plainToInstance } from "class-transformer";

export type WorldflipperObject = Character | Equipment | null | undefined

export const useWorldflipperDataStore = defineStore('worldflipperData', {
  state(): {
    version: string | undefined
    __characters: { [key: string]: any }
    __equipments: { [key: string]: any }
  } {
    return {
      version: undefined,
      __characters: {},
      __equipments: {}
    }
  },
  actions: {
    async init() {
      if (!(await this.check_update())) {
        return await this.update()
      }
      return false
    },
    async check_update() {
      const rsp = await axios.post('/api/v2/worldflipper/version')
      return rsp.status == 200 && rsp.data['version'] === this.version
    },
    async update() {
      const rsp = await axios.post('/api/v2/worldflipper/data')
      if (rsp.status == 200) {
        this.__characters = rsp.data['character']
        this.__equipments = rsp.data['equipment']
        this.version = rsp.data['version']
        return true
      }
      return false
    }
  },
  getters: {
    characters: (state) => {
      const keys = Object.keys(state.__characters)
      const characterEntries = Object.keys(state.__characters).map((key) => [
        key,
        plainToInstance(Character, { ...state.__characters[key], id: key } as object)
      ]) as [string, Character][]
      return new Map<string, Character>(characterEntries)
    },
    equipments: (state) => {
      const equipmentEntries = Object.keys(state.__equipments).map((key) => [
        key,
        plainToInstance(Equipment, { ...state.__equipments[key], id: key } as object)
      ]) as [string, Equipment][]

      return new Map<string, Equipment>(equipmentEntries)
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'worldflipperData',
        storage: localStorage,
        paths: ['version', '__characters', '__equipments']
      }
    ]
  }
})
