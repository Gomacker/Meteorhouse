<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const username_input = ref<string>('')
const password_input = ref<string>('')
const router = useRouter()
function login() {
  axios
    .post('/api/v1/login/', {
      username: username_input.value,
      password: password_input.value
    })
    .then((r) => {
      console.log(r.data)
      if (r.data['result'] === 'success') {
        ElMessage.success('成功')
        const user = useUserStore()
        // console.log(r.)
        user.login(r.data['username'], '')
        location.reload()
        router.go(0)
      } else {
        ElMessage.error('失败')
      }
    })
    .catch(() => {
      ElMessage.error('失败(失败)')
    })
}
function get_token() {
    axios.post('/api/v1/token_get/').then(r => test_token.value = r.data['token'])
}
const test_token = ref<string>('')
</script>
<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
    <el-card>
        <el-button @click="get_token">测试</el-button>
        {{ test_token }}
    </el-card>
    <el-card style="width: 60%; border-radius: 16px" body-style="padding: 16px;">
      <el-form>
        <el-form-item label="账号">
          <el-input v-model="username_input"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password v-model="password_input"></el-input>
        </el-form-item>
      </el-form>
      <div style="display: flex; justify-content: space-between">
        <div />
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-card>
    <div style=""></div>
  </div>
</template>

<style scoped></style>
