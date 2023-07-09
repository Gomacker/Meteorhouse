<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PartyReleaseCard from '@/components/card/PartyReleaseCard.vue'

const release_id = ref<string>()

onMounted(() => {
  const route = useRoute()
  release_id.value = String(route.params['release_id'])
})
</script>

<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column">
    <v-toolbar density="comfortable">
      <v-btn @click="$router.push('/partySearcher')">&langle; back</v-btn>
    </v-toolbar>
    <v-main style="background-color: greenyellow">
      <v-container style="width: 100%; max-width: 100%">
        <v-card v-if="false" style="width: 100%">
          <v-card-item>{{ release_id }}</v-card-item>
        </v-card>
        <v-row>
          <v-col cols="12" sm="8">
            <v-card min-height="70vh" rounded="lg">
              <!--  -->
            </v-card>
          </v-col>

          <v-col
            style="overflow: hidden; display: flex; flex-direction: column; align-items: center"
            cols="12"
            sm="4"
          >
            <PartyReleaseCard v-for="i in 10" :key="i" style="zoom: 1; margin: 8px" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped></style>
