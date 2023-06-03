<script setup lang="ts">
import UnitPicOrigin from '@/components/objects/unit/UnitPicOrigin.vue'
import { ele2color, ele2name, ele_id2ele, manager } from '@/stores/manager'
import { ref } from 'vue'
import chroma from 'chroma-js'

const divider_status = true
const ele2border_color = {
  0: 'rgb(234,53,75)',
  1: 'rgb(68,137,255)',
  2: 'rgb(244,204,36)',
  3: 'rgb(119,217,47)',
  4: 'rgb(136,136,136)',
  5: 'rgb(90,57,95)'
}

let filter_list = []
// filter_list = [
//   111004, 111005, 111009, 111015, 111021, 111039, 121003, 121008, 131003, 131013, 131014, 131020,
//   131026, 141021, 141027, 141039, 151004, 151009, 151021, 151027, 161008, 161015, 161033, 161051
// ]
// filter_list = [
//   111003, 111007, 111033, 111057, 121002, 121005, 121015, 121051, 131001, 131011, 131038, 141002,
//   141007, 141033, 151002, 151006, 151012, 151033, 161001, 161006, 161027, 161057
// ]
// filter_list = [
//   111001, 111027, 111051, 121004, 121007, 121039, 131002, 131005, 131032, 131050, 141004, 141006,
//   141015, 141057, 151003, 151005, 151011, 151013, 161002, 161021, 161045
// ]
// filter_list = [
//   111002, 111006, 111045, 121001, 121006, 121033, 131004, 131012, 131044, 141001, 141005, 141008,
//   141045, 151001, 151007, 151014, 151039, 161004, 161007, 161039, 161069
// ]
// filter_list = [
//   111001, 111002, 111003, 111006, 111007, 111027, 111033, 111045, 111051, 121001, 121002, 121004,
//   121005, 121006, 121007, 121015, 121033, 121039, 131001, 131002, 131004, 131005, 131011, 131012,
//   131032, 131038, 131044, 141001, 141002, 141004, 141005, 141006, 141007, 141008, 141015, 141033,
//   141045, 151001, 151002, 151003, 151005, 151006, 151007, 151011, 151012, 151013, 151014, 151033,
//   151039, 161001, 161002, 161004, 161005, 161006, 161007, 161021, 161027, 161039, 161045, 161057
// ]
// filter_list = filter_list.concat([
//   111004, 111005, 111009, 111015, 111021, 111039, 121003, 121008, 131003, 131013, 131014, 131020,
//   131026, 141021, 141027, 141039, 151004, 151009, 151021, 151027, 161008, 161015, 161033, 161051
// ])
// filter_list = [
//   111039, 111021, 111015, 111009, 111005, 111004, 121008, 121003, 131026, 131020, 131014, 131013,
//   131003, 141039, 141027, 141021, 151027, 151021, 151009, 151004, 161051, 161033, 161015, 161008,
//   111057, 111051, 111045, 111033, 111027, 111006, 111007, 111001, 111002, 111003, 121051, 121039,
//   121033, 121015, 121007, 121006, 121005, 121004, 121001, 121002, 131050, 131044, 131038, 131032,
//   131012, 131011, 131005, 131004, 131001, 131002, 141057, 141045, 141033, 141015, 141008, 141007,
//   141006, 141005, 141002, 141004, 141001, 151039, 151033, 151013, 151014, 151012, 151011, 151007,
//   151006, 151005, 151001, 151002, 151003, 161069, 161057, 161045, 161039, 161027, 161021, 161007,
//   161006, 161005, 161004, 161001, 161002
// ].reverse()
let highlight_filter: number[]
// highlight_filter = [
//   111033, 111045, 111051, 121033, 121039, 131032, 131038, 131044, 141045, 151033, 151039, 161039,
//   161045, 161057
// ]
highlight_filter = [
  111004, 111005, 111009, 111015, 111021, 111039, 121003, 121008, 131003, 131013, 131014, 131020,
  131026, 141021, 141027, 141039, 151004, 151009, 151021, 151027, 161008, 161015, 161033, 161051
]
const pindou_test = [
  { name: 'A1', color: 'fff5ca' },
  { name: 'A2', color: 'ffffcc' },
  { name: 'A3', color: 'fff297' },
  { name: 'A4', color: 'fff651' },
  { name: 'A5', color: 'ffdb4d' },
  { name: 'A6', color: 'fcc73b' },
  { name: 'A7', color: 'fe8443' },
  { name: 'A8', color: 'e5c62d' },
  { name: 'A9', color: 'fbaa72' },
  { name: 'A10', color: 'fd9443' },
  { name: 'A11', color: 'ffcf7c' },
  { name: 'A12', color: 'fdbc9e' },
  { name: 'A14', color: 'ff7443' },
  { name: 'A16', color: 'fff49e' },
  { name: 'A17', color: 'fde676' },
  { name: 'A18', color: 'ffb67b' },
  { name: 'A19', color: 'fa9285' },
  { name: 'A20', color: 'fee27e' },
  { name: 'B1', color: 'eaf149' },
  { name: 'B2', color: 'b6eb45' },
  { name: 'B3', color: '9af5a8' },
  { name: 'B4', color: '51ff51' },
  { name: 'B5', color: '6fd363' },
  { name: 'B6', color: '79ebc7' },
  { name: 'B7', color: '3bb48b' },
  { name: 'B8', color: '13904c' },
  { name: 'B9', color: '28523a' },
  { name: 'B10', color: 'ace1d9' },
  { name: 'B11', color: '52641d' },
  { name: 'B12', color: '206a4f' },
  { name: 'B13', color: 'c7ff85' },
  { name: 'B14', color: 'd0ed39' },
  { name: 'B15', color: '205726' },
  { name: 'B16', color: 'ccffaa' },
  { name: 'B17', color: 'b6c130' },
  { name: 'B18', color: 'e4f954' },
  { name: 'B19', color: '00d0a1' },
  { name: 'B20', color: 'c4ffd7' },
  { name: 'B21', color: '157c74' },
  { name: 'B22', color: '0d5349' },
  { name: 'B23', color: '32451d' },
  { name: 'B24', color: 'e4fb9f' },
  { name: 'B25', color: '5c9083' },
  { name: 'B26', color: 'a9a44e' },
  { name: 'C1', color: 'e0ffe2' },
  { name: 'C2', color: 'b9f6ed' },
  { name: 'C3', color: 'a8e1fc' },
  { name: 'C4', color: '84d2ff' },
  { name: 'C5', color: '24b9e4' },
  { name: 'C6', color: '78bdf8' },
  { name: 'C7', color: '3c8aec' },
  { name: 'C8', color: '195dc4' },
  { name: 'C9', color: '2e26cc' },
  { name: 'C10', color: '30d9ed' },
  { name: 'C11', color: '00c4d0' },
  { name: 'C12', color: '1a3758' },
  { name: 'C13', color: 'b4d7ff' },
  { name: 'C14', color: 'e0fff9' },
  { name: 'C15', color: '00cbd2' },
  { name: 'C16', color: '0a5491' },
  { name: 'C17', color: '7be7f4' },
  { name: 'C18', color: '264257' },
  { name: 'C19', color: '259bb9' },
  { name: 'C20', color: '157cbf' },
  { name: 'C21', color: 'deeefe' },
  { name: 'C22', color: '7fc0d4' },
  { name: 'D1', color: 'b9cffe' },
  { name: 'D2', color: '9ca6db' },
  { name: 'D3', color: '224eb1' },
  { name: 'D4', color: '2e4770' },
  { name: 'D5', color: 'c56fb8' },
  { name: 'D6', color: 'aa76e4' },
  { name: 'D7', color: '7e4dc7' },
  { name: 'D8', color: 'e0cdff' },
  { name: 'D9', color: 'c9befd' },
  { name: 'D10', color: '351d4f' },
  { name: 'D11', color: 'c1c2ff' },
  { name: 'D12', color: 'daafe4' },
  { name: 'D13', color: 'c64dae' },
  { name: 'D14', color: '9735b3' },
  { name: 'D15', color: '46297d' },
  { name: 'D16', color: 'e3e4ff' },
  { name: 'D17', color: 'c9d9fd' },
  { name: 'D18', color: 'b87bd5' },
  { name: 'D19', color: 'e8cbfa' },
  { name: 'D20', color: 'a73ae9' },
  { name: 'D21', color: '8b339b' },
  { name: 'D22', color: '595093' },
  { name: 'D23', color: 'efe7fc' },
  { name: 'D24', color: '7f77ea' },
  { name: 'D25', color: '423bc0' },
  { name: 'E1', color: 'ffd1cc' },
  { name: 'E2', color: 'ffcaea' },
  { name: 'E3', color: 'fb8dc5' },
  { name: 'E4', color: 'ee78ac' },
  { name: 'E5', color: 'f653a6' },
  { name: 'E6', color: 'fd2f81' },
  { name: 'E7', color: 'a2176a' },
  { name: 'E8', color: 'ffd8e8' },
  { name: 'E9', color: 'ea8cda' },
  { name: 'E10', color: 'bf3974' },
  { name: 'E11', color: 'fee7e2' },
  { name: 'E12', color: 'fcafdd' },
  { name: 'E13', color: 'a61284' },
  { name: 'E14', color: 'fdd2bf' },
  { name: 'E15', color: 'f3d1d7' },
  { name: 'E16', color: 'fff3eb' },
  { name: 'E17', color: 'fae8f8' },
  { name: 'E18', color: 'fdd1ea' },
  { name: 'E19', color: 'f6d3f3' },
  { name: 'E20', color: 'f4d7e9' },
  { name: 'E21', color: 'd6b3b9' },
  { name: 'E22', color: 'c685b0' },
  { name: 'E23', color: 'a089a3' },
  { name: 'F1', color: 'fda098' },
  { name: 'F2', color: 'fa6a62' },
  { name: 'F3', color: 'ec4a59' },
  { name: 'F4', color: 'ff452c' },
  { name: 'F5', color: 'ff0000' },
  { name: 'F6', color: 'b53710' },
  { name: 'F7', color: '811530' },
  { name: 'F8', color: 'bb082f' },
  { name: 'F9', color: 'e67088' },
  { name: 'F10', color: '8c420c' },
  { name: 'F11', color: '6f3329' },
  { name: 'F12', color: 'f9425e' },
  { name: 'F13', color: 'd14b30' },
  { name: 'F14', color: 'fdaca9' },
  { name: 'F15', color: 'dd0c2c' },
  { name: 'F16', color: 'fddedc' },
  { name: 'F17', color: 'fbaf9f' },
  { name: 'F18', color: 'e0804d' },
  { name: 'F19', color: 'c64b60' },
  { name: 'G1', color: 'fee5c7' },
  { name: 'G2', color: 'fcceb7' },
  { name: 'G3', color: 'f9c2a4' },
  { name: 'G4', color: 'dcb99a' },
  { name: 'G5', color: 'f2a76d' },
  { name: 'G6', color: 'ee9867' },
  { name: 'G7', color: '91664e' },
  { name: 'G8', color: '4d312c' },
  { name: 'G9', color: 'eabb85' },
  { name: 'G10', color: 'bf9143' },
  { name: 'G11', color: 'e4c896' },
  { name: 'G12', color: 'ddb986' },
  { name: 'G13', color: 'd19058' },
  { name: 'G14', color: '856a54' },
  { name: 'G15', color: 'f5f3dc' },
  { name: 'G16', color: 'f2dfce' },
  { name: 'G17', color: '5d5249' },
  { name: 'G18', color: 'ffedd9' },
  { name: 'G19', color: 'eca450' },
  { name: 'G20', color: 'b0623e' },
  { name: 'G21', color: 'cb906e' },
  { name: 'H2', color: 'ffffff' },
  { name: 'H3', color: 'aeaeae' },
  { name: 'H4', color: '979296' },
  { name: 'H5', color: '606060' },
  { name: 'H6', color: '353537' },
  { name: 'H7', color: '000000' },
  { name: 'H8', color: 'f7e6f0' },
  { name: 'H9', color: 'e6e3dc' },
  { name: 'H10', color: 'e5e2f3' },
  { name: 'H11', color: 'cecdcb' },
  { name: 'H12', color: 'fff2e2' },
  { name: 'H13', color: 'ece1cb' },
  { name: 'H14', color: 'c5ced8' },
  { name: 'H15', color: '9facc7' },
  { name: 'H16', color: '241d1a' },
  { name: 'H17', color: 'f6f4f5' },
  { name: 'H18', color: 'fffdf1' },
  { name: 'H19', color: 'f8f3eb' },
  { name: 'H20', color: 'a0acb1' },
  { name: 'M1', color: 'ccd7c9' },
  { name: 'M2', color: '91aa94' },
  { name: 'M3', color: '718898' },
  { name: 'M4', color: 'dacec2' },
  { name: 'M5', color: 'dbd6b6' },
  { name: 'M6', color: 'c8b999' },
  { name: 'M7', color: 'c1aca7' },
  { name: 'M8', color: 'b09699' },
  { name: 'M9', color: 'ab9787' },
  { name: 'M10', color: 'bb9fb9' },
  { name: 'M11', color: '9b809f' },
  { name: 'M12', color: '5a474c' },
  { name: 'M13', color: 'dda89a' },
  { name: 'M14', color: 'c0725d' },
  { name: 'M15', color: '86848a' }
]
const a = 'A'

const unit_list = ref<Array<number>>(new Array<number>())
</script>

<template>
  <div>
    <div style="position: sticky; top: 0; z-index: 1">
      {{ JSON.stringify(unit_list) }}
<!--      {{ JSON.stringify(pindou_test) }}-->
    </div>
    <div
      id="card"
      style="
        background: url('/static/worldflipper/ui/background_cut_official.png');
        background-size: 136px;
        background-position-x: -10px;
        background-position-y: -10px;
        image-rendering: pixelated;
        width: 1036px;
        color: var(--color-text);
        /*min-width: 720px;*/
      "
    >
      <div
        v-if="true"
        style="
          image-rendering: auto;
          padding: 20px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5));
        "
      >
        <div
          style="
            /*background: red;*/
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            /*justify-content: space-evenly;*/
            image-rendering: auto;
          "
        >
          <template
            v-for="(u, index) in filter_list.length > 0 ? filter_list.map((v) => manager.unit_data.get(v)) : Array.from(manager.unit_data.values())"
            :key="index"
          >
            <div
              @click="
                () => {
                  if (unit_list.includes(u.id)) {
                    unit_list.splice(unit_list.indexOf(u.id), 1)
                  } else unit_list.push(u.id)
                  unit_list.sort((a, b) => a - b)
                }
              "
              style="
                margin: 2px;
                padding: 4px 2px;
                width: 110px;
                border-radius: 8px;
                user-select: none;
                transition: box-shadow 0.2s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
              "
              class="unit-lite-info"
            >
              <UnitPicOrigin :unit="u" :size="90" />
              <div
                style="
                  margin-top: 1px;
                  text-align: center;
                  font-weight: bold;
                  font: 21px Arial, '黑体', serif;
                "
              >
                {{ u.name_zh }}
              </div>
            </div>
          </template>
        </div>
      </div>
      <div
        v-else-if="false"
        style="
          image-rendering: auto;
          /*align-items: center;*/
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        "
      >
        <div
          v-for="element_id in 6"
          :key="element_id"
          :style="{
            color: element_id - 1 == 4 ? 'rgb(50,50,50)' : 'rgb(250,250,250)',
            background: chroma(ele2color[element_id - 1]).alpha(0.9)
          }"
          style="display: flex; margin: 16px; width: 46%; border-radius: 12px"
        >
          <div
            style="
              background-color: white;
              width: 31px;
              border-top-left-radius: 13px;
              border-bottom-left-radius: 13px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border: 3px solid;
              box-sizing: content-box;
            "
            :style="{
              'border-color': ele2border_color[element_id - 1]
              // 'color': element_id === 'light' ? 'rgb(136,136,136)' : 'white'
            }"
          >
            <img
              style="width: 28px; height: 28px; image-rendering: auto"
              :src="`/static/worldflipper/icon/${ele_id2ele[element_id - 1]}.png`"
              alt=""
            />
            <div
              style="
                background-color: #fff;
                font-size: 24px;
                width: 24px;
                line-height: 28px;
                font-weight: bold;
                color: black;
              "
            >
              {{ ele2name[element_id - 1] }}
            </div>
          </div>
          <div
            style="
              /*background: red;*/
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              padding: 16px 8px;
              align-content: center;
              /*justify-content: space-evenly;*/
            "
          >
            <template
              v-for="(u, index) in filter_list
                .map((v) => manager.unit_data.get(v))
                .filter((t) =>
                  filter_list.length > 0
                    ? filter_list.includes(t.id) && t.element_id === element_id - 1
                    : true
                )"
              :key="index"
            >
              <template v-if="highlight_filter.includes(u.id) && divider_status">
                {{
                  (() => {
                    divider_status = false
                    return undefined
                  })()
                }}
                <el-divider style="margin: 4px 0" />
              </template>
              <template v-else-if="!divider_status && !highlight_filter.includes(u.id)">
                {{
                  (() => {
                    divider_status = true
                    return undefined
                  })()
                }}
              </template>
              <div
                @click="
                  () => {
                    if (unit_list.includes(u.id)) {
                      unit_list.splice(unit_list.indexOf(u.id), 1)
                    } else unit_list.push(u.id)
                    unit_list.sort((a, b) => a - b)
                  }
                "
                style="
                  margin: 2px;
                  padding: 4px 2px;
                  width: 96px;
                  border-radius: 8px;
                  user-select: none;
                  transition: box-shadow 0.2s ease;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
                class="unit-lite-info"
              >
                <UnitPicOrigin
                  :style="{
                    filter: highlight_filter.includes(u.id) ? `drop-shadow(0 0 8px)` : ''
                  }"
                  :unit="u"
                  :size="90"
                />
                <div
                  style="margin-top: 1px; text-align: center; font-weight: bold; font-size: 18px"
                >
                  {{ u.name_zh }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div
        v-else
        style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap"
      >
        <div style="display: flex; flex-wrap: wrap; width: 480px; margin: 32px 0;" v-for="c in ['A','B','C','D','E','F','G','H','M']" :key="c">

          <template v-for="(pd, index) in pindou_test.filter(v => v.name[0] === c)" :key="index">
            <div
              :style="{ background: `#${pd.color}` }"
              style="
              display: flex;
              margin: 4px;
              width: 64px;
              height: 64px;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              border-radius: 12px;
            "
            >
              {{ pd.name }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unit-lite-info:hover {
  box-shadow: 0 0 8px black;
}
</style>
