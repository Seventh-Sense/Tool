<template>
  <div class="page" style="color: white">
    <div class="page-header">
      <div
        @click="onclick"
        style="font-size: 32px; font-weight: bold; cursor: pointer"
      >
        数据上传管理 <span style="font-size: 20px;">V{{ version }}</span>
      </div>
    </div>

    <div class="page-container">
      <a-row :gutter="16">
        <a-col :span="12">
          <div class="page-card card-one">
            <div class="page-card-title">任务</div>
            <Task />
          </div>
        </a-col>
        <a-col :span="12">
          <div class="page-card card-half" style="margin-bottom: 20px">
            <div class="page-card-title">MQTT</div>
            <Mqtt style="flex-grow: 1" />
          </div>
          <div class="page-card card-half">
            <div class="page-card-title"></div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import Mqtt from "@/components/Mqtt/index.vue";
import Task from "@/components/Task/index.vue";
import { onMounted, ref } from "vue";
import { getVersion } from "../../utils/http";

const onclick = () => {
  window.location.reload();
};

const version = ref("1.0.0");

onMounted(() => {
  // 页面加载时的逻辑

  getVersion()
    .then((res: any) => {
      if (res.Version) {
        version.value = res.Version;
      }
    })
    .catch((error: any) => {
      console.error("Error fetching version:", error);
    });
});
</script>

<style lang="less" scoped>
@card-height: calc(100vh - 56px - 14px - 14px);
@card-half: calc((100vh - 56px - 14px - 14px - 20px) / 2);

.page {
  padding: 0;
  width: 100%;
  height: 100vh;
  background-image: radial-gradient(
    farthest-side at 0% 0%,
    #383477ff,
    #19162aff
  );

  &-header {
    height: 56px;
    padding: 0 12px;
    background: rgba(0, 0, 0, 0.13);
    backdrop-filter: blur(30px);
    display: flex;
    align-items: center;
  }

  &-container {
    padding: 14px;
  }

  &-card {
    width: 100%;
    background: #181621;
    border-radius: 12px;
    backdrop-filter: blur(16px);
    display: flex;
    flex-direction: column;

    &-title {
      height: 56px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
      flex-shrink: 0;
    }
  }
}

.card-one {
  height: @card-height;
}

.card-half {
  height: @card-half;
}
</style>
