<script setup lang="ts">

import TableComponentTextContent from "@/views/table/TableComponentTextContent.vue";
import PartyCardEliya from "@/components/party/eliya/PartyCardEliya.vue";
import {TableElement, TableElementParty2} from "@/stores/table";


const props = defineProps<{
  element: TableElementParty2
  party_style?: {
    show_name?: boolean
    show_awaken?: boolean
    show_replacements?: boolean
  }
}>()
</script>

<template>
  <v-card
      v-ripple
      class="elevation-6"
      style="
                      border-radius: 6px;
                      background: rgba(250 250 250 / 1);
                      margin: 0 2px 8px;
                    "
  >
    <div
        style="
                        padding: 0 4px 4px 4px;
                        background: url('/static/worldflipper/dialog_deco2.png') 100% 100% no-repeat;
                      "
    >
      <v-card-title style="width: 480px; padding: 8px 12px 0; overflow: hidden">
        <TableComponentTextContent
            :content="'我是Title[highlight]特性[end][novice]测试[end]'"
            :text_border="false"
        />
      </v-card-title>
      <div style="width: 480px; font-size: 14px; padding: 0 12px; overflow: hidden">
        <TableComponentTextContent
            :content="'我是subtitle[novice]特性[end][highlight]测试[end]'"
            :text_border="false"
        />
      </div>
      <v-divider style="margin: 2px" :thickness="2" />
      <PartyCardEliya
          :show_name="props.party_style?.show_name || element.show_name"
          :show_awaken="props.party_style?.show_awaken || element.show_awaken"
          :always_show_replacements="props.party_style?.show_replacements"
          :party="get_party_from_id()"
          :replacements="get_replacements_data(element)"
      >
      </PartyCardEliya>
    </div>
  </v-card>
</template>

<style scoped>

</style>