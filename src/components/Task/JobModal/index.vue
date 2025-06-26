<template>
  <a-modal v-model:open="props.isShowModal" title="配置" @ok="onSubmit" @cancel="onClose">
    <div class="modal">
      <div class="modal-porperty">func</div>
      <a-select
        v-model:value="data.func"
        :options="options"
        :style="{ width: '450px' }"
      />
      <div class="modal-porperty">trigger</div>
      <a-input
        v-model:value="data.trigger"
        type="text"
        :style="{ width: '450px' }"
        disabled
      />
      <div class="modal-porperty">seconds</div>
      <a-input-number v-model:value="data.seconds" style="width: 450px" />
      <div class="modal-porperty">id</div>
      <a-input
        v-model:value="data.id"
        type="text"
        :style="{ width: '450px' }"
        disabled
      />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { addJob } from "../../../utils/http";
import { message } from "ant-design-vue";

let emit = defineEmits(["update:isShowModal"]);
const props = defineProps({
  isShowModal: {
    type: Boolean,
    required: true,
  },
  dataList: {
    type: Array,
    required: true,
  },
});

const data = ref({
  func: "",
  trigger: "interval",
  seconds: 5,
  id: "",
  kwargs: {},
});

const options = [
  {
    label: "publish_meter_job",
    value: "xport.app.task:publish_meter_job",
  },
  {
    label: "publish_ac_job",
    value: "xport.app.task:publish_ac_job",
  },
];

const dataCheck = () => {
  let flag = false;

  if (data.value.func === "") {
    return true;
  }

  props.dataList.forEach((item: any) => {
    if (item.func === data.value.func) {
      message.error("任务已存在，请勿重复添加");
      flag = true;
    }
  });

  return flag;
};

const onSubmit = async () => {
  try {
    if (dataCheck()) return;

    const res: any = await addJob(data.value);

    if (res.job === data.value.id) {
      emit("update:isShowModal", false);
    }
  } catch (e) {
    console.error("Failed to delete jobs:", e);
  }
};

const onClose = () => {
  emit("update:isShowModal", false);
};

watch(
  () => data.value.func,
  (newVal) => {
    if (newVal === "xport.app.task:publish_meter_job") {
      data.value.id = "publish_meter_job";
    } else if (newVal === "xport.app.task:publish_ac_job") {
      data.value.id = "publish_ac_job";
    }
  }
);
</script>

<style lang="less" scoped>
.modal {
  
  &-porperty {
    font-weight: 400;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 17px;
    text-align: left;
    font-style: normal;
    margin-bottom: 6px;
    margin-top: 12px;
  }
}
</style>
