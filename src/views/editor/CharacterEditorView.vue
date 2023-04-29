<template>
  <div>
    <el-menu

      mode="horizontal"
      style="display: flex; justify-content: space-between; align-items: center;"
    >
      <el-menu-item
        style="user-select: none;"
        :disabled="!get_last_id(selected_unit_id)"
        index="goto_last"
        @click="selected_unit_id = get_last_id(selected_unit_id)"
      >
        <el-icon><ArrowLeft /></el-icon>
        上一个
        {{ get_last_id(selected_unit_id) }}
      </el-menu-item>
      <el-menu-item style="display: flex; width: 33%; flex-direction: column; padding: 16px;">
          <UnitPicOrigin :size="60" :unit="manager.unit_data.get(selected_unit_id)"/>
          <div>
              {{ manager.unit_data.get(selected_unit_id).extraction_id }}
          </div>
      </el-menu-item>
      <el-menu-item
        style="user-select: none;"
        :disabled="!get_next_id(selected_unit_id)"
        index="goto_next"
        @click="selected_unit_id = get_next_id(selected_unit_id)"
      >
        {{ get_next_id(selected_unit_id) }}
        下一个
        <el-icon><ArrowRight /></el-icon>
      </el-menu-item>
    </el-menu>
    <!--    <el-scrollbar>-->
    <UnitWikiCard
      style="width: 100%; border-radius: 0;"
      :unit="manager.unit_data.get(selected_unit_id)"
    ></UnitWikiCard>
    <!--    </el-scrollbar>-->
  </div>
</template>

<script lang="ts">
import { manager } from '@/stores/manager'
import UnitWikiCard from '@/components/card/UnitWikiCard.vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import UnitPicOrigin from "@/components/objects/unit/UnitPicOrigin.vue";
// import {ref} from "vue";

// const selected_unit_ = ref(1)

export default {
  name: 'CharacterEditorView',
  components: {UnitPicOrigin, ArrowRight, ArrowLeft, UnitWikiCard },
  computed: {
    manager() {
      return manager
    }
  },
  data: () => {
    return {
      selected_unit_id: 1
    }
  },
  methods: {
    get_last_id(selected_id: number) {
      const key_list = Array.from(manager.unit_data.keys())
      return key_list[key_list.indexOf(selected_id) - 1]
    },
    get_next_id(selected_id: number) {
      const key_list = Array.from(manager.unit_data.keys())
      return key_list[key_list.indexOf(selected_id) + 1]
    }
  }
}
</script>

<style scoped></style>
