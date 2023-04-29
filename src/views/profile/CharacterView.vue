<template>
  <div>
    <div v-if="manager.unit_data.get($route.params['unit_id'])">
      <UnitWikiCard :unit="manager.unit_data.get($route.params['unit_id'])" style="box-shadow: 0 0 16px black;"></UnitWikiCard>
      {{ JSON.stringify(manager.unit_data.get($route.params['unit_id'])) }}
    </div>
    <el-empty v-else>
      <template #description>
        Oops，没有找到这个角色哦
      </template>
    </el-empty>
  </div>
</template>

<script lang="ts">
import {manager} from "@/stores/manager";
import UnitWikiCard from "@/components/card/UnitWikiCard.vue";
import {useRoute} from "vue-router";

const route = useRoute()

export default {
  name: "CharacterView",
  components: {UnitWikiCard},
  computed: {
    manager() {
      return manager
    }
  },
  data() {
    return {
      route
    }
  }
}
</script>

<style scoped>

</style>