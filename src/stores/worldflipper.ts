import { defineStore } from 'pinia'
import { Character, Equipment } from '@/anise/worldflipper/object'
import axios from 'axios'
import { plainToInstance } from 'class-transformer'
import worldflipperService from '@/services/worldflipperService'

export type WorldflipperObject = Character | Equipment | null | undefined

export const useWorldflipperDataStore = defineStore('worldflipperData', {
  state(): {
    version: string | undefined
    __characters: { [key: string]: any }
    __equipments: { [key: string]: any }
    mhMode: boolean
  } {
    return {
      version: undefined,
      __characters: {},
      __equipments: {},
      mhMode: false
    }
  },
  actions: {
    async init() {
      return !(await this.check_update()) && await this.update()
    },
    async check_update() {
      const rsp = await worldflipperService.fetchDataVersion()
      return rsp['version'] === this.version
    },
    async update() {
      try {

        const rsp = await worldflipperService.fetchBasicData()
        this.__characters = rsp['character']
        this.__equipments = rsp['equipment']
        this.version = rsp['version']
        return rsp['version']
      }catch (err) {
        return null
      }
    }
  },
  getters: {
    characters: (state) => {
      const characterEntries = Object.keys(state.__characters).map((key) => {

        return [
          key,
          new Character({ ...state.__characters[key], id: key })
          // plainToInstance(Character, {data: { ...state.__characters[key], id: key }} as object)
        ]
      }) as [string, Character][]
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
        paths: ['version', '__characters', '__equipments', 'mhMode']
      }
    ]
  }
})
