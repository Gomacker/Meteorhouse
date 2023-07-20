import { defineStore } from 'pinia'
import { Character, Equipment } from '@/anise/worldflipper/object'
import axios from 'axios'
import { plainToInstance } from 'class-transformer'

export const useWorldflipperDataStore = defineStore('worldflipperData', {
  state(): {
    version: string | undefined
    __characters: {}
    __equipments: {}
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
      const rsp = await axios.post('/api/v2/data_version/')
      return rsp.status == 200 && rsp.data['version'] === this.version
    },
    async update() {
      const rsp = await axios.post('/api/v2/data/')
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
      return new Map<string, Character>(
        Object.entries(state.__characters).map((value: [string, any]): [string, Character] => [
          value[0],
          <Character>(
            (<unknown>plainToInstance(Character, Object.assign(value[1], { id: value[0] })))
          )
        ])
      )
    },
    equipments: (state) => {
      return new Map<string, Equipment>(
        Object.entries(state.__equipments).map((value: [string, any]): [string, Equipment] => [
          value[0],
          <Equipment>(
            (<unknown>plainToInstance(Equipment, Object.assign(value[1], { id: value[0] })))
          )
        ])
      )
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
