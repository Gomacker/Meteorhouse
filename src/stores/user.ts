import { defineStore } from 'pinia'
import axios from "axios";


export const useUserStore = defineStore('userStore', {
  state(): {
    nickname: string | undefined
    username: string | undefined
    token: string | undefined
    _isLogin: boolean
  } {
    return {
      nickname: undefined,
      username: undefined,
      token: undefined,
      _isLogin: false
    }
  },
  actions: {
    isLogin(): boolean { return this._isLogin; },
    async authenticate() {
      const response = await axios.post('/auth/authenticate')
      if (response.status === 200) {
        this.username = response.data['username']
        this.nickname = response.data['nickname']
        this._isLogin = true
        return this
      }
    },
    login(username: string, token: string): void {
      this.username = username
      this.token = token
    },
    anonymous(): void {

    }
  },
  persist: {
    enabled: true,
    strategies: [{ key: 'user', storage: localStorage, paths: ['token'] }]
  }
})

