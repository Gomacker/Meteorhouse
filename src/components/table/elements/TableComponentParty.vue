<script setup lang="ts">
import TableComponentTextContent from '@/components/table/elements/TableComponentTextContent.vue'
import PartyCardEliya from '@/components/party/eliya/PartyCardEliya.vue'
import { TableElementParty } from "@/components/table/elements/WorldflipperElements";

const props = defineProps<{
  element: TableElementParty
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
      background: rgba(255 255 255 / 1);
      margin: 0 8px 16px;
      overflow: visible;
    "
  >
    <div
      style="
        padding: 0 4px 4px 4px;
        background: url('/static/worldflipper/dialog_deco2.png') 100% 100% no-repeat;
      "
    >
      <v-card-title
        style="
          width: 480px;
          font-size: 22px;
          line-height: 1.25;
          padding: 8px 8px 0;
          overflow: hidden;
        "
      >
        <TableComponentTextContent :content="element.title" :text_border="false" />
      </v-card-title>
      <TableComponentTextContent
        style="width: 480px; font-size: 15px; padding: 0 8px; overflow: hidden"
        :content="element.subtitle"
        :text_border="false"
      />
      <v-divider v-if="element.title || element.subtitle" style="margin: 2px" :thickness="2" />
      <PartyCardEliya
        :show_name="props.party_style?.show_name"
        :show_awaken="props.party_style?.show_awaken"
        :always_show_replacements="props.party_style?.show_replacements"
        :party="element.party"
      />
    </div>
  </v-card>
</template>

<style scoped></style>
