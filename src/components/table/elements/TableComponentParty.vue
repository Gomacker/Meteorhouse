<script setup lang="ts">
import type { TableElementParty } from '@/components/table/elements/WorldflipperElements'
import TableComponentPartyCard from '@/components/table/elements/TableComponentPartyCard.vue'

defineProps<{
  element: TableElementParty
  partyStyle?: {
    showName?: boolean
    showAwaken?: boolean
    showReplacements?: boolean
  }
}>()
</script>

<template>
  <TableComponentPartyCard
    :party-release="element.party"
    :title="element.title"
    :subtitle="element.subtitle"
   :party-style="partyStyle"
  />
</template>
