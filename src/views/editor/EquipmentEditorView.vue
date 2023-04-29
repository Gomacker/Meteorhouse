<template>
  <div>
      <ArmamentWikiCard style="box-shadow: 0 0 8px black;" :armament="manager.armament_data.get(5090023)"/>
      <template v-for="a in manager.armament_data" :key="a[0]">
          <div style="margin-bottom: 32px;">{{ a[0] }}: {{ a[1] }}</div>
      </template>
  </div>
</template>

<script lang="ts">
import {manager} from "@/stores/manager";
import ArmamentWikiCard from "@/components/card/ArmamentWikiCard.vue";

export default {
    name: "EquipmentEditorView",
    components: {ArmamentWikiCard},
    computed: {
        manager() {
            return manager
        }
    }
}
</script>

<style scoped>

</style>