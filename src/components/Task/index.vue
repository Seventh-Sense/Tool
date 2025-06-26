<template>
  <div class="container">
    <div class="container-top">
      <a-button type="primary" @click="onClick">创建</a-button>
    </div>
    <a-collapse v-model:activeKey="activeKey" accordion>
      <a-collapse-panel v-for="job in jobList" :header="job.name">
        <div class="container-list">
          <div v-for="(value, key) in job">
            <div class="container-list-key">{{ key }}</div>
            <div class="container-list-value">{{ value }}</div>
          </div>
        </div>
        <template #extra><DeleteOutlined @click="onDelete(job)" /></template>
      </a-collapse-panel>
    </a-collapse>
    <JobModal v-if="jobShow" v-model:isShowModal="jobShow" :dataList="jobList" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRaw, ref, watch } from "vue";
import { readAllJobs, deleteJob } from "../../utils/http";
import { DeleteOutlined } from "@ant-design/icons-vue";
import JobModal from "@/components/Task/JobModal/index.vue";

const jobShow = ref(false);
const jobList = ref<any>([]);

const activeKey = ref(["1"]);

onMounted(() => {
  // 初始化逻辑
  initData();
  console.log("Mounted", jobList.value);
});

const initData = async () => {
  // 数据初始化逻辑
  try {
    const res: any = await readAllJobs();

    if (res && res.length > 0) {
      jobList.value = res;
    }
  } catch (e) {
    console.error("Failed to read job:", e);
  }
};

const onDelete = async (task: any) => {
  try {
    const res: any = await deleteJob(task.id);

    if (res && res.job === task.id) {
      jobList.value = jobList.value.filter((item: any) => item.id !== task.id);
    }
  } catch (e) {
    console.error("Failed to delete jobs:", e);
  }
};

const onClick = () => {
  jobShow.value = true;
};

watch(
  () => jobShow.value,
  (newVal) => {
    if (!newVal) {
      initData();
    }
  }
);
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;

  &-top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 12px;
  }

  &-property {
    height: 56px;

    display: flex;
    align-items: center;
    font-size: 16px;

    color: #ffffff;
  }

  &-list {
    background: rgba(255, 255, 255, 0.07);
    border-radius: 8px;
    padding: 12px 18px;

    &-key {
      font-weight: 400;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 17px;
      text-align: left;
      font-style: normal;
      margin-bottom: 4px;
    }

    &-value {
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      line-height: 20px;
      text-align: left;
      font-style: normal;
      margin-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    }
  }

  &-bottom {
    height: 56px;
    padding: 0 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

::v-deep(.ant-form-item-control) {
  max-width: none !important;
}
</style>
