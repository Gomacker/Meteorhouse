import {ref} from "vue";
import type {Armament, Unit} from "@/stores/manager";

export const target_list = ref<any>([])
export const origin_list = ref<any>([])

export const dragged_object = ref<Unit | Armament | object>({})