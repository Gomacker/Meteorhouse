import { ref } from 'vue'

export const is_login = ref<boolean>(false)
export const user_name = ref<string>('')
export const user_avatar = ref<string>('')
export const permissions = ref({
  summary_table_editor: false,
  resource_manager: false
})
