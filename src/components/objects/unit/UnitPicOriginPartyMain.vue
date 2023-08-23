<!--<script lang="ts" setup>-->

<!--import {Unit} from "@/stores/manager";-->

<!--const props = defineProps({-->
<!--  unit: Unit,-->
<!--  awakened: Boolean-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <div style="display: inline-block;" :title="props.unit ? `${props.unit.anise_id}:${props.unit.extraction_id}:${props.unit.id}` : 'Unknown'">-->
<!--    <svg-->
<!--        v-if="props.unit"-->
<!--        style="-->
<!--        display: block;-->
<!--        "-->
<!--        :height="458"-->
<!--        :width="220"-->
<!--        xmlns="http://www.w3.org/2000/svg"-->
<!--    >-->
<!--      <g>-->
<!--&lt;!&ndash;        <image&ndash;&gt;-->
<!--&lt;!&ndash;            :href="'/static/worldflipper/ui/unit_background.png'"&ndash;&gt;-->
<!--&lt;!&ndash;            id="background"&ndash;&gt;-->
<!--&lt;!&ndash;            :height="props.size - frame_width * 2"&ndash;&gt;-->
<!--&lt;!&ndash;            :width="props.size - frame_width * 2"&ndash;&gt;-->
<!--&lt;!&ndash;            :y="frame_width" :x="frame_width"&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->
<!--        <image-->
<!--            :href="'/static/worldflipper/ui/party/party_thumbnail_tile_bg.png'"-->
<!--            id="frame"-->
<!--            style="image-rendering: pixelated;"-->
<!--            :height="392"-->
<!--            :width="186"-->
<!--            :y="17" :x="18"-->
<!--        />-->
<!--        <image-->
<!--            v-if="props.unit.extraction_id"-->
<!--            :href="`/static/worldflipper/unit/party_main/${props.awakened ? 'awakened' : 'base'}/${props.unit.extraction_id}.png`"-->
<!--            id="unit_pic"-->
<!--            :height="392"-->
<!--            :width="186"-->
<!--            :y="17" :x="18"-->
<!--        />-->
<!--        <image-->
<!--            :href="'/static/worldflipper/ui/party/main.png'"-->
<!--            id="frame"-->
<!--            :height="460"-->
<!--            :width="222"-->
<!--            y="0" x="0"-->
<!--        />-->
<!--        <image-->
<!--            :href="'/static/worldflipper/icon/' + props.unit.element + '.png'"-->
<!--            id="element_icon"-->
<!--            :height="44"-->
<!--            :width="44"-->
<!--            :y="19" :x="158"-->
<!--        />-->
<!--        <text-->
<!--            :font-size="26"-->
<!--            :y="404" :x="22"-->
<!--        >-->
<!--          {{ props.unit.name_zh }}-->
<!--        </text>-->
<!--      </g>-->
<!--    </svg>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--export default {-->
<!--  name: "UnitPicOriginPartyMain"-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->