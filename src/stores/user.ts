import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

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
    isLogin(): boolean {
      return !!this.username
    },
    async authenticate() {
      const response = await axios.post('/auth/authenticate')
      if (response.status === 200) {
        this.username = response.data['username']
        this.nickname = response.data['nickname']
        this._isLogin = true
        return this
      }
    },
    tokenLogin(token: string): void {
      axios.post('/auth/tokenLogin', { token }).then((response) => {
        console.log(response)
      })
    },
    login(username: string, password: string): Promise<void> {
      // axios.post('/auth/login', { username, password }).then((response) => {
      return new Promise((resolve, reject) => {
        axios.post('/api/v1/login/', { username, password }).then((response) => {
          response.status == 200 ? resolve() : reject()
        }).catch(() => {
          reject()
        })
      })
    },
    anonymous(): void {
    }
  },
  persist: {
    enabled: true,
    strategies: [{ key: 'user', storage: localStorage, paths: ['username', 'token'] }]
  }
})
