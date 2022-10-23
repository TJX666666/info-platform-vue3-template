<template>
  <!-- <div @click="goIndex" class="login">登录</div> -->
  <div class="login-box">
    <div class="image-box">
      <el-image
        src="https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg"
        fit="cover"
      />
    </div>
    <div class="behavior-box">
      <div class="main-box">
        <div class="icon-box">
          <el-icon><Place /></el-icon>
          <span class="logo-txt">虎年大吉</span>
        </div>
        <form-component />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createApp } from "vue";
import FormComponent from "./FormComponent.vue";
const app = createApp({});
app.component({
  FormComponent,
});
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

// const goIndex = () => {
//     const blackUrl: string = (route.query.redirect as "") || "/";
//     router.replace(blackUrl);
// };
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  justify-content: space-between;
}
.image-box {
  flex: 1;
  width: 50vw;
  height: 100vh;
  .el-image {
    height: 100%;
  }
}

.behavior-box {
  flex: 1;
  width: 50vw;
  background-color: $border-color;
  display: flex;
  justify-content: center;
  align-items: center;
  .main-box {
    width: 400px;
    height: 600px;
    border: 1px solid red;
  }
  .icon-box {
    line-height: $header-height;
    margin: 0 auto;
    text-align: center;
    .el-icon {
      font-size: 20px;
      vertical-align: middle;
      color: #000;
    }
    .logo-txt {
      font-size: 26px;
      vertical-align: middle;
      margin: 0 30px 0 5px;
      color: #000;
    }
  }
}
</style>
