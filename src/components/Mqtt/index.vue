<template>
  <div class="container">
    <div class="container-top">
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="left"
      >
        <a-form-item>
          <a-button type="primary" @click="onclick">提交</a-button>
        </a-form-item>
        <a-form-item label="Host">
          <a-input v-model:value="formState.host" />
        </a-form-item>
        <a-form-item label="Port">
          <a-input-number
            v-model:value="formState.port"
            :min="1"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="Sub AC Topic">
          <a-input v-model:value="formState.sub_ac_topic" />
        </a-form-item>
        <a-form-item label="Pub AC Topic">
          <a-input v-model:value="formState.pub_ac_topic" />
        </a-form-item>
        <a-form-item label="Pub Meter Topic">
          <a-input v-model:value="formState.pub_meter_topic" />
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRaw } from "vue";
import type { UnwrapRef } from "vue";
import { getMqtt, updateMqtt } from "../../utils/http";
import { message } from "ant-design-vue";

const formState: UnwrapRef<any> = reactive({
  host: "47.103.19.245",
  port: 1888,
  sub_ac_topic: "/cloud/YANHUA/AC/001/cmd/set",
  pub_ac_topic: "/edge/YANHUA/AC/001/rtg",
  pub_meter_topic: "/edge/YANHUA/Meter/003/rtg",
});

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

onMounted(() => {
  // 初始化逻辑
  initData();
});

const initData = async () => {
  // 数据初始化逻辑
  try {
    const res: any = await getMqtt();

    if (res.status === "OK") {
      formState.host = res.data.host;
      formState.port = res.data.port;
      formState.sub_ac_topic = res.data.sub_ac_topic;
      formState.pub_ac_topic = res.data.pub_ac_topic;
      formState.pub_meter_topic = res.data.pub_meter_topic;
    }
  } catch (e) {
    console.error("Failed to read job:", e);
  }
};
const onclick = async () => {
  console.log("submit!", toRaw(formState));
  try {
    const res: any = await updateMqtt(toRaw(formState));

    if (res.status === "OK") {
      message.success("更新成功");
    }
  } catch (e) {
    console.error("Failed to read job:", e);
  } finally {
    initData();
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;

  &-top {
    padding: 12px;
  }

  &-property {
    height: 56px;

    display: flex;
    align-items: center;
    font-size: 16px;

    color: #ffffff;
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
