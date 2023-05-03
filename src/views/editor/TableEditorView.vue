<script setup lang="ts">
import TableComponentEditor from '@/components/editor/TableComponentEditor.vue'
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div
      style="
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        background-color: rgba(0 0 0 / 0.5);
        color: white;
        padding: 0 8px;
      "
    >
      <el-button type="primary" size="small">保存</el-button>
      <el-select style="margin-left: 8px" size="small">
        <el-option value="aa"> </el-option>
      </el-select>
      <el-button style="margin-left: 8px" type="warning" size="small">读取</el-button>
      <div style="margin-left: 8px">this is header bar</div>
    </div>
    <el-scrollbar view-style="height: 100%;">
      <div
        style="
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: flex-start;
          align-content: flex-start;
          justify-content: center;
          padding: 8px;
          height: 100%;
        "
      >
        <el-card style="width: 99.5%; margin: 0.25%" body-style="padding: 8px;">
          <el-form label-width="50px" size="small" label-position="left">
            <el-form-item style="margin-bottom: 4px" label="标题">
              <el-input></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 4px" label="颜色">
              <div v-if="false" style="display: flex">
                <div style="display: flex; align-items: center">
                  <span>主颜色</span>
                  <el-color-picker color-format="hex" show-alpha></el-color-picker>
                </div>
                <div style="display: flex; margin-left: 16px; align-items: center">
                  <span>副颜色 </span>
                  <el-color-picker></el-color-picker>
                </div>
              </div>
            </el-form-item>
            <el-form-item style="margin-bottom: 4px" label=""> </el-form-item>
          </el-form>
        </el-card>
        <TableComponentEditor type="TextArea" />
        <TableComponentEditor type="PartyRelease" />
        <TableComponentEditor type="Html" />
        <TableComponentEditor type="PartyCombine" />
        <TableComponentEditor type="EventCard" />
        <TableComponentEditor type="WikiCard" />
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped></style>
