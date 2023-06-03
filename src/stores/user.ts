import { ref } from 'vue'
import { defineStore } from 'pinia'

export function check_anonymous() {
  const user = useUserStore()
  if (!user.anonymous_token) {
  }
}

export const useUserStore = defineStore('userStore', {
  state(): {
    username: string | undefined
    token: string | undefined
    anonymous_token: string | undefined
  } {
    return {
      username: undefined,
      token: undefined,
      anonymous_token: undefined
    }
  },
  actions: {
    is_login(): boolean {
      return !!this.username
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
    strategies: [{ key: 'user', storage: localStorage, paths: ['username', 'token', 'anonymous_token'] }]
  }
})

export const is_login = ref<boolean>(false)
export const user_name = ref<string>('')
export const user_avatar = ref<string>('')
export const permissions = ref({
  summary_table_editor: false,
  resource_manager: false
})