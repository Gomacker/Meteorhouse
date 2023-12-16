<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const username_input = ref<string>('')
const password_input = ref<string>('')
const router = useRouter()
const user = useUserStore()
function login() {
  const result = user.login(username_input.value, password_input.value)
  result.then(value => {
    alert(`登录成功 ${value}`)
    window.location.assign('/')
    // router.push('/')
  }).catch(reason => alert('登录失败'))
}
</script>
<template>
  <div
    style="
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <v-card elevation="12" min-width="360px">
      <v-card-text style="font-size: 20px; font-weight: 600; background: #afafaf">
        Login
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-text-field
            density="comfortable"
            variant="outlined"
            v-model="username_input"
            label="账号"
          />
          <v-text-field
            density="comfortable"
            variant="outlined"
            type="password"
            v-model="password_input"
            label="密码"
          />
        </v-form>
        <div style="display: flex; justify-content: space-between">
          <div />
          <v-btn color="primary" @click="login">登录</v-btn>
        </div>
      </v-card-text>
    </v-card>
    <div style=""></div>
  </div>
</template>

<style scoped></style>
