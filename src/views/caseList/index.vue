<template>
  <div class="main-box">
    <!-- 顶部的menu -->
    <el-card class="box-card">
      <div class="flex-box">
        <div class="txt">擅长类型</div>
        <ul>
          <li class="normal" v-for="(i, index) in typeList1" :key="index">
            <el-button
              :class="{ 'active-class': i.id === curId }"
              class="btn"
              @click="clickActive(index)"
              >{{ i.name }}</el-button
            >
          </li>
        </ul>
      </div>
      <div class="flex-box">
        <div class="txt">擅长行业</div>
        <ul>
          <li class="normal" v-for="(i, index) in typeList2" :key="index">
            <el-button
              :class="{ 'active-class': i.id === curId2 }"
              class="btn"
              @click="clickActive2(index)"
              >{{ i.name }}</el-button
            >
          </li>
        </ul>
      </div>
    </el-card>
    <!-- 中间的list -->
    <div class="box-list">
      <el-card v-for="item in listBox" :body-style="{ padding: '20px' }">
        <img :src="item.url" class="image" />
        <div style="padding: 14px">
          <span>{{ item.title }}</span>
          <div class="bottom">
            <el-button text class="button">{{ item.type }}</el-button>
          </div>
        </div>
      </el-card>
    </div>

    <div class="list-box"></div>
  </div>
</template>

<script setup lang="ts">
import { typeList1, typeList2 } from "./data";
import { getImages } from "@/http/api";
const curId = ref(0);
const clickActive = (i) => {
  curId.value = i;
};
const curId2 = ref(0);
const clickActive2 = (i) => {
  curId2.value = i;
};

const listBox = ref([]);
onMounted(() => {
  let pageObj = {
    page: 0,
    size: 20,
  };
  getImages(pageObj).then((res) => {
    console.log(res);
    listBox.value = res.data.result.list;
  });
});
</script>

<style lang="scss" scoped>
.main-box {
  .box-card {
    width: 80vw;
    padding: 20px 50px;
    margin: 20px auto;
    .flex-box {
      display: flex;
    }
    .txt {
      width: 100px;
      line-height: 35px;
      font-weight: 600;
    }
    .btn {
      border-radius: 20px;
    }
    .el-button {
      color: #000;
      font-weight: 500;
      margin: 0px 10px 10px;
      border: none;
    }
    .active-class {
      color: #fff;
      background: $color-primary;
    }
    ul {
      display: flex;
      text-align: center;
      flex-wrap: wrap;
      width: 900px;
    }
    // .el-col :active {
    //   background: $color-primary;
    //   color: #fff;
    // }
    // .el-col :visited {
    //   background: none;
    // }
    // .el-col :focus {
    //   color: #fff;
    //   background: $color-primary;
    // }
  }
  .box-list {
    width: 80vw;
    padding: 20px 50px;
    margin: 20px auto;
    .el-card {
      margin: 0px 0 20px;
    }
  }
}
</style>