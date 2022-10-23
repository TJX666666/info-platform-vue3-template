<template>
  <div class="data-box" v-if="isUser">
    <el-form status-icon ref="ruleFormRef" label-width="100px" :model="formLabelModel" :rules="rules" style="max-width: 460px">
      <el-form-item prop="account">
        <el-input v-model="formLabelModel.account" placeholder="请输入用户名" :prefix-icon="User" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="formLabelModel.email" placeholder="请输入邮箱" :prefix-icon="Iphone">
          <template #append>
            <el-button v-show="state.sendAuthCode" @click="getCode">发送验证码</el-button>
            <el-button v-show="!state.sendAuthCode"
              ><span class="auth_text_blue">{{ state.second }} </span>s</el-button
            >
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="emailcode">
        <el-input v-model="formLabelModel.emailcode" placeholder="请输入邮箱" :prefix-icon="ChatSquare" />
      </el-form-item>
      <el-form-item prop="setPwd">
        <el-input type="password" autocomplete="off" v-model="formLabelModel.setPwd" placeholder="请输入密码" :prefix-icon="Lock" />
      </el-form-item>
      <el-form-item prop="confirmPwd">
        <el-input type="password" autocomplete="off" v-model="formLabelModel.confirmPwd" placeholder="请再次确认密码" :prefix-icon="Lock" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
      <el-form-item>
        <span>已有账号，</span>
        <span @click="toLogin" style="cursor: pointer; color: red; font-size: 20px">去登录</span>
      </el-form-item>
    </el-form>
  </div>
  <!-- <div class="data-box" v-else>
    <el-form label-width="100px" :model="formLabelModel" style="max-width: 460px">
      <el-form-item>
        <el-input v-model="formLabelModel.account" placeholder="请输入用户名" :prefix-icon="User" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="formLabelModel.setPwd" placeholder="请输入密码" :prefix-icon="Lock" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="formLabelModel.confirmPwd" placeholder="请再次确认密码" :prefix-icon="Lock" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div> -->
</template>

<script setup lang="ts">
import { User, Iphone, Lock, ChatSquare } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { sendCode } from "@/http/api/index";
const isUser = ref(true); //控制是否已有账号 false为直接登录界面 true为注册界面
const toLogin = () => {
  isUser.value = false;
};
interface FormData {
  account: string;
  email: string;
  emailcode: string;
  setPwd: string;
  confirmPwd: string;
}
//表单数据
const formLabelModel: FormData = reactive({
  account: "",
  email: "",
  emailcode: "",
  setPwd: "",
  confirmPwd: "",
});
const ruleFormRef = ref<FormInstance>();

//发送验证码
const send = () => {
  console.log(formLabelModel.email);
  sendCode(formLabelModel.email).then((res) => {
    console.log(res);
  });
};
//手机验证码
/*定义 data 数据*/
const state = reactive({
  sendAuthCode: true /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */,
  second: 60 /* 一分钟 倒计时*/,
  timer: null /* 倒计时 计数器,防止点击的时候触发多个setInterval*/,
});
/*-----------------------------------验证码----------------------------*/
/**
 * 发送验证码 === `点击按钮操作,点击按钮操作,点击按钮操作`
 * */
const getCode = () => {
  if (formLabelModel.email === "") return;
  if (state.sendAuthCode) {
    state.sendAuthCode = false;
    send();
    let interval = window.setInterval(function () {
      setStorage(state.second);
      if (state.second-- <= 0) {
        /* 如果 倒计时完毕 重新赋值*/
        state.second = 60;
        state.sendAuthCode = true;
        window.clearInterval(interval);
      }
    }, 1000);
  }
};
/**
 * 存储 验证码 防止刷新
 * `用处`: 防止页面刷新 发送验证码状态改变
 * */
const setStorage = (parm) => {
  localStorage.setItem("dalay", parm);
  localStorage.setItem("_time", new Date().getTime() + "");
};
/**
 * 获取 缓存 数据
 * `用处`: 防止页面刷新 发送验证码状态改变
 * */
const getStorage = () => {
  let localDelay: any = {};
  localDelay.delay = localStorage.getItem("dalay");
  localDelay.sec = localStorage.getItem("_time");
  return localDelay;
};
/**
 *  判断
 *  */
const judgeCode = () => {
  // 获取缓存中的数据
  let localDelay = getStorage();
  let secTime = parseInt((new Date().getTime() - localDelay.sec) / 1000 + "");
  if (secTime > localDelay.delay) {
    state.sendAuthCode = true;
  } else {
    state.sendAuthCode = false;
    let _delay = localDelay.delay - secTime;
    state.second = _delay;
    state.timer = setInterval(() => {
      if (_delay > 1) {
        _delay--;
        setStorage(_delay);
        state.second = _delay;
        state.sendAuthCode = false;
      } else {
        // 让浏览器打开的时候,显示剩余的时间
        state.sendAuthCode = true;
        window.clearInterval(state.timer);
      }
    }, 1000);
  }
};
/**
 * 页面执行
 */
judgeCode();

//自定义验证两次密码输入规则
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (formLabelModel.confirmPwd !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("confirmPwd", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请确认密码"));
  } else if (value !== formLabelModel.setPwd) {
    callback(new Error("两次输入密码不同!"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 8, max: 20, message: "长度应大于8小于20", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱，用于接受验证码", trigger: "blur" },
    // { min: 11, max: 11, message: "手机号输入错误", trigger: "blur" },
  ],
  emailcode: [
    { required: true, message: "请输入邮箱验证码", trigger: "blur" },
    // { min: 4, max: 6, message: "长度应大于4小于6", trigger: "blur" },
  ],
  setPwd: [{ validator: validatePass, trigger: "blur" }],
  confirmPwd: [{ validator: validatePass2, trigger: "blur" }],
});
const onSubmit = () => {
  console.log("submit!");
};
</script>

<style lang="scss" scoped>
.data-box {
  .el-form-item {
    width: 400px;
    justify-content: center;
    align-items: center;
    :deep .el-form-item__content {
      margin: 0 40px;
      margin-left: 40px !important;
    }
  }
}
</style>
