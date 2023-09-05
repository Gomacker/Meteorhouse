<script setup lang="ts">

import TableComponentTextContent from "@/components/table/elements/TableComponentTextContent.vue";
import PartyCardEliya from "@/components/party/eliya/PartyCardEliya.vue";
import type { PartyRelease } from "@/anise/worldflipper/party";

defineProps<{
  partyRelease: PartyRelease,
  title: string,
  subtitle: string,
  partyStyle?: {
    showName?: boolean,
    showAwaken?: boolean,
    showReplacements?: boolean
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
      width: min-content;

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
        <TableComponentTextContent :content="title" :text_border="false" />
      </v-card-title>
      <TableComponentTextContent
        style="width: 480px; font-size: 15px; padding: 0 8px; overflow: hidden"
        :content="subtitle"
        :text_border="false"
      />
      <v-divider v-if="title || subtitle" style="margin: 2px" :thickness="2" />
      <PartyCardEliya
        :show_name="partyStyle?.showName"
        :show_awaken="partyStyle?.showAwaken"
        :always_show_replacements="partyStyle?.showReplacements"
        :party="partyRelease"
        eager
      />
    </div>
  </v-card>
</template>