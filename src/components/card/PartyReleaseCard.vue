<script setup lang="ts">
import { PartyRelease } from '@/stores/manager'
import { ArrowDownBold, DocumentCopy } from '@element-plus/icons-vue'
import PartyCard from '@/components/party/PartyCardEliya.vue'
import ClipboardA from 'clipboard'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const props = defineProps({
  party_release: {
    type: PartyRelease,
    require: true,
    default: PartyRelease.empty()
  },
  extra_option: {
    type: Boolean,
    require: false,
    default: true
  },
  event: {
    type: Boolean,
    require: false,
    default: false
  }
})

function copy_party(id_: string) {
  const cb = new ClipboardA('#copy-' + id_)
  cb.on('success', () => {
    ElMessage.success('复制成功')
    cb.destroy()
  })
}

const show_dialog = ref(false)
</script>

<template>
  <el-card
    class="party-card"
    style="margin: 8px 4px; min-width: 498px; width: 498px; height: fit-content"
    body-style="padding: 0;"
  >
    <div
      style="padding: 12px 8px 8px"
      :style="{
        background: props.event
          ? 'linear-gradient(to bottom, rgb(56 255 173 / 70%) 24px, transparent 82px, transparent)'
          : 'transparent'
      }"
    >
      <div style="display: flex; justify-content: space-between">
        <div>
          <span style="font-weight: bold; font-size: 18px">{{ props.party_release.title }}</span
          ><span style="color: darkgray">({{ props.party_release.id }})</span>
        </div>
        <!--      <div><span style="color: gray;"></span></div>-->
        <div>
          <el-popover placement="right">
            <template #default>
              <p>Oops...</p>
              <p>还没有来源记录</p>
              <p style="color: lightgrey">上传id: {{ props.party_release.updater_id }}</p>
            </template>
            <template #reference>
              <el-alert
                show-icon
                type="warning"
                :closable="false"
                style="padding: 0 4px; height: 24px; width: 76px; min-width: 76px"
              >
                来源
              </el-alert>
            </template>
          </el-popover>
        </div>
      </div>
      <el-divider style="margin: 4px 0"></el-divider>
      <!--    <hr style="border-color: red;"/>-->
      <PartyCard :party="party_release"></PartyCard>
      <div v-if="props.extra_option" style="display: flex; justify-content: space-between">
        <div>
          <el-button size="small" type="primary" @click="() => {} /*show_ensure*/" plain>
            提交来源
          </el-button>
          <el-dialog v-model="show_dialog" title="提交来源">
            <el-form-item label="链接">
              <el-input v-model="submit_url" @keydown.enter="submit_source"></el-input>
            </el-form-item>
            <div style="display: flex; flex-direction: row-reverse">
              <el-button type="primary" @click="submit_source"> 提交 </el-button>
            </div>
          </el-dialog>
        </div>
        <div>
          <el-button-group style="margin: 0 2px">
            <!--            <el-button size="default" style="color: deeppink; padding-right: 64px;">-->

            <el-button disabled size="small" style="color: deeppink">
              <div style="width: 100%; height: 100%; position: absolute"></div>
              <div>❤ 0</div>
            </el-button>
            <el-button disabled size="small" type="primary" plain>
              添加记录
              <el-icon><ArrowDownBold /></el-icon>
            </el-button>
          </el-button-group>
          <el-button
            size="small"
            type="warning"
            :data-clipboard-text="
              JSON.stringify({
                party: props.party_release.party.data(),
                params: {} /*props.party_release.params.data()*/
              })
            "
            :id="'copy-' + props.party_release?.id"
            @click="
              () => {
                if (props.party_release instanceof PartyRelease) {
                  copy_party(props.party_release.id)
                }
              }
            "
            style="margin: 0 2px"
          >
            <el-icon><DocumentCopy /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style>
.el-alert .el-icon svg {
  height: 0.5em;
  width: 0.5em;
}
.el-alert .el-alert__description {
  margin: 5px 0;
}
</style>

<style scoped></style>
