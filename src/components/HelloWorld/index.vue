<template>
  <div class="container">
    <div v-if="!show" class="box">
      <div class="logo">
        <svg-icon name="logo" :size="80"></svg-icon>
      </div>
      <div class="title">XControl by LUBANX</div>
      <div class="form">
        <div class="label">请输入机器码</div>
        <a-input v-model:value="machine" placeholder="请输入" allowClear />
        <div class="label" style="margin-top: 22px">请选择授权时间</div>
        <a-space>
          <a-config-provider
            :theme="{
              algorithm: theme.darkAlgorithm,
            }"
          >
            <a-date-picker
              v-model:value="expire"
              :format="dateFormat"
              style="width: 368px"
              allowClear
              placeholder="请输入"
            />
          </a-config-provider>

          <a-button class="generate-btn" @click="onClick">生成授权码</a-button>
        </a-space>
      </div>
    </div>
    <div v-else class="box-l">
      <div class="box-l-top">
        <a-space>
          <svg-icon name="check" :size="40"></svg-icon>
          <a-space direction="vertical">
            <span
              style="
                font-size: 16px;
                color: rgba(255, 255, 255, 0.93);
                font-weight: bold;
              "
            >
              授权码生成成功
            </span>
            <span
              style="
                font-size: 14px;
                color: rgba(255, 255, 255, 0.93);
                font-weight: 400;
              "
            >
              您输入的Key正确
            </span>
          </a-space>
        </a-space>
      </div>
      <div style="padding: 16px">
        <a-space direction="vertical" style="width: 100%">
          <a-config-provider
            :theme="{
              algorithm: theme.darkAlgorithm,
            }"
          >
            <a-input v-model:value="code" disabled />
          </a-config-provider>

          <a-space>
            <a-button class="back-btn" @click="onBack">返回</a-button>
            <a-button class="copy-btn" @click="onCopy">复制到粘贴板</a-button>
          </a-space>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs, { Dayjs } from "dayjs";
import { message, theme } from "ant-design-vue";
import { generateLicense } from "@/utils/http";

const dateFormat = "YYYY-MM-DD";
const machine = ref<string>("");
const expire = ref<any>();

//
const show = ref<boolean>(false);
const code = ref<string>("");

const onClick = () => {
  if (
    machine.value !== "" &&
    expire.value !== null &&
    expire.value !== undefined
  ) {
    generateLicense({
      code: machine.value,
      expiry: dayjs(expire.value).format(dateFormat),
    })
      .then((res: any) => {
        if (res.data.status === "OK") {
          code.value = res.data.result;
          show.value = true;
        } else {
          message.error("请求失败！");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  } else {
    message.error("请填写正确的值！");
  }
};

const onBack = () => {
  code.value = "";
  machine.value = "";
  expire.value = null;
  show.value = false;
};

const onCopy = async () => {
  try {
    await navigator.clipboard.writeText(code.value);
  } catch (err) {
    console.error("复制到剪贴板失败:", err);
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/picture/bg.png");
  background-repeat: no-repeat;
  background-position: center;
}

.box {
  width: 512px;
  height: 320px;
  background-color: rgba(0, 0, 0, 0.53);
  backdrop-filter: blur(50px);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.logo {
  width: 80px;
  height: 80px;
}

.title {
  color: rgba(255, 255, 255, 0.93);
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
  margin-bottom: 19px;
}
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  margin-bottom: 14px;
  text-align: left;
}

.box-l {
  width: 386px;
  height: 189px;
  background-color: rgba(0, 0, 0, 0.53);
  backdrop-filter: blur(50px);
  border-radius: 18px;
}

.box-l-top {
  height: 84px;
  width: 100%;
  background-color: rgba(53, 233, 96, 0.53);
  backdrop-filter: blur(50px);
  border-radius: 18px 18px 0 0;
  padding: 12px;
  display: flex;
  align-items: center;
}

.generate-btn {
  background: rgba(102, 102, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
}

::v-deep(.ant-input-affix-wrapper) {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

::v-deep(.ant-input) {
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
}

::v-deep(.ant-input-disabled) {
  border: 1px solid rgba(255, 255, 255, 0.6);
}

::v-deep(.ant-picker) {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

::v-deep(.ant-picker-input) > input {
  color: rgba(255, 255, 255, 0.6);
}

.back-btn {
  width: 175px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.13);
}

.copy-btn {
  width: 175px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  background-color: #35e960;
}
</style>
