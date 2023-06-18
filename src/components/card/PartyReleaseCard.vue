<script setup lang="ts">
import { PartyRelease } from '@/stores/manager'
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

function copy_release_id(id_: string) {
  const cb = new ClipboardA('#copy-id-' + id_)
  cb.on('success', () => {
    ElMessage.success('复制成功')
    cb.destroy()
  })
}

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
  <v-card v-ripple class="party-card elevation-6">
    <div style="padding: 12px 8px 8px; background: transparent">
      <div style="display: flex; justify-content: space-between">
        <div>
          <span style="font-weight: bold; font-size: 18px">{{ props.party_release.title }}</span>
          <v-chip
            v-if="false"
            v-ripple
            style="user-select: none; margin: 0 4px; color: white; flex-shrink: 0"
            color="warning"
            density="comfortable"
          >
            无盘子码
          </v-chip>
          <v-chip
            v-ripple
            style="
              user-select: none;
              margin: 0 4px;
              height: 20px;
              color: white;
              flex-shrink: 0;
              background: dimgray;
              cursor: default;
              vertical-align: text-bottom;
            "
            density="comfortable"
            @click="
              () => {
                if (props.party_release instanceof PartyRelease) {
                  copy_release_id(props.party_release.id)
                }
              }
            "
            :data-clipboard-text="props.party_release?.id"
            :id="'copy-id-' + props.party_release?.id"
          >
            {{ props.party_release.id }}
          </v-chip>
        </div>
        <div>
          <v-menu open-delay="0" location="end" open-on-hover>
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="party-card-source-tag">
                <v-icon icon="mdi-magnify"></v-icon>
                <span>来源</span>
              </div>
            </template>
            <v-card style="padding: 16px">
              <p>Oops...</p>
              <p>还没有来源记录</p>
              <p style="color: lightgrey">上传id: {{ props.party_release.updater_id }}</p>
            </v-card>
          </v-menu>
        </div>
      </div>
      <v-divider :thickness="2" style="margin: 2px 0" />
      <PartyCard :party="party_release"></PartyCard>
      <div v-if="props.extra_option" style="display: flex; justify-content: space-between">
        <div>
          <v-dialog v-model="show_dialog" width="auto">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="flat" color="blue" size="small"> 提交来源 </v-btn>
            </template>
            <v-card>
              <v-card-text> 好吧，确实在摸 </v-card-text>
            </v-card>
          </v-dialog>
          <!--          <el-dialog v-model="show_dialog" title="提交来源">-->
          <!--            <el-form-item label="链接">-->
          <!--              <el-input v-model="submit_url" @keydown.enter="submit_source"></el-input>-->
          <!--            </el-form-item>-->
          <!--            <div style="display: flex; flex-direction: row-reverse">-->
          <!--              <el-button type="primary" @click="submit_source"> 提交 </el-button>-->
          <!--            </div>-->
          <!--          </el-dialog>-->
        </div>
        <div>
          <v-btn-group style="height: 28px" variant="flat" density="compact">
            <v-btn disabled="" size="small" color="pink">❤ 0</v-btn>
            <v-menu open-on-click :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-btn disabled="" v-bind="props" size="small">
                  添加记录
                  <v-icon icon="mdi-chevron-down" />
                </v-btn>
              </template>
              <v-card>
                <v-card-text>aa</v-card-text>
              </v-card>
            </v-menu>
          </v-btn-group>
          <v-btn
            variant="flat"
            color="warning"
            size="small"
            :data-clipboard-text="JSON.stringify(props.party_release?.data())"
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
            <v-icon icon="mdi-content-copy" />
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.party-card {
  min-width: 498px;
  width: 498px;
}
.party-card-source-tag {
  background-color: rgb(253, 246, 236);
  padding: 4px;
  font-size: 12px;
  border-radius: 4px;
  width: 60px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
</style>
