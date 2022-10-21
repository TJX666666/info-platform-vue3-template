<template>
  <div class="header-box">
    <div class="icon-box">
      <el-icon><Place /></el-icon>
      <span class="logo-txt">虎年大吉</span>
    </div>

    <ul class="menu-box">
      <el-button
        @click="checkItem(_, index)"
        v-for="(_, index) in menuList"
        :key="index"
        :class="{ 'active-item': curitem === index }"
        >{{ _.name }}</el-button
      >
    </ul>
    <div class="login-btn">
      <el-button>登录</el-button>
      <el-button class="sign-in">注册</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
const curitem = ref(0);
const router = useRouter();
const menuList = ref([
  { name: "首页" },
  { name: "媒体库" },
  { name: "文案列表" },
  { name: "文案详情" },
]);

//menu选项卡切换
const checkItem = (_, index) => {
  curitem.value = index;
  let pass = "";
  switch (toRaw(_).name) {
    case "文案详情":
      pass = "CaseDetail";
      break;
    case "媒体库":
      pass = "MediaList";
      break;
    case "文案列表":
      pass = "CaseList";
      break;
    default:
      pass = "Home";
      break;
  }
  router.push({ name: pass });
};
</script>

<style lang="scss" scoped>
.header-box {
  width: 100%;
  background-color: $bg-color;
  height: $header-height;
  display: flex;
  justify-content: space-between;
  .icon-box {
    height: 100%;
    line-height: $header-height;
    margin-left: 50px;
    display: inline-block;
    flex: 3;
    .el-icon {
      font-size: 20px;
      vertical-align: middle;
      color: $text-color-inverse;
    }
    .logo-txt {
      font-size: 26px;
      vertical-align: middle;
      margin: 0 30px 0 5px;
      color: $text-color-inverse;
    }
  }

  .menu-box {
    height: $header-height;
    display: flex;
    align-items: center;
    .el-button {
      background-color: rgba(0, 0, 0, 0);
      border: none;
      color: $text-color-inverse;
    }
    .active-item {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      border-bottom: 2px solid $text-color-inverse;
    }
  }

  .login-btn {
    line-height: $header-height;
    margin: 0 50px;
    vertical-align: middle;
    .el-button {
      width: 90px;
      background-color: rgba(0, 0, 0, 0);
      color: $text-color-inverse;
    }
    .sign-in {
      color: $bg-color;
      background-color: rgb(255, 255, 255);
    }
  }
}
</style>