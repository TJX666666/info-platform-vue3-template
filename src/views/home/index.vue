<template>
  <div class="app-content">
    <!-- 跑马灯图片 -->
    <div class="block text-center" m="t-4">
      <el-carousel trigger="click" class="carousel-box">
        <el-carousel-item v-for="item in carouselurls" :key="item">
          <h3 class="small justify-center" text="2xl">
            <el-image :src="item" />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 类型列表card -->
    <div class="type-list">
      <el-row :gutter="20" justify="space-around">
        <el-col v-for="(item, index) in newTypeList" :key="index" :span="4">
          <el-card>
            <el-avatar :src="item.logo" />
            <div class="text">
              <h4>{{ item.title }}</h4>
              <span>{{ item.txt }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 另一个列表card -->
    <div class="other-list">
      <h1>深度内容更新</h1>
      <el-row :gutter="20" justify="space-around">
        <el-col :span="4" v-for="(item, i) in otherList" :key="i">
          <el-card shadow="always">
            <el-avatar :src="item.logo" /> {{ item.title }}
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script lang='ts' setup>
import { carouselurls, typeList } from "./list";
import { computed, onMounted } from "vue";
import { getMainMsg } from "@/http/api/index";
let txtArr: any = ref([]);
let newTypeList: any = ref(typeList);
let otherList: any = ref([]);
onMounted(() => {
  //单独请求数据复制到本地json中，只替换txt字段。
  getMainMsg({ page: 0, size: 5 }).then((res: any) => {
    txtArr = res.data.result.list;
    txtArr.forEach((item, i) => {
      newTypeList.value[i].txt = item.title;
      const passObj = {
        title: item.userName,
        logo: typeList[Math.floor(Math.random() * 5)].logo,
      };
      otherList.value.push(passObj);
    });
  });
});
</script>

<style lang='scss' scoped>
.carousel-box {
  height: calc(100vh - $header-height);

  :deep .el-carousel__container {
    height: calc(100vh - $header-height);
  }
  .el-image {
    :deep img {
      width: 100vw;
      height: calc(100vh - $header-height);
    }
  }
}

.type-list {
  height: 300px;
  padding: 80px 20px 0px;
  .el-card {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    :deep .el-card__body {
      text-align: center;
    }
    .text {
      margin-top: 14px;
      h4 {
        margin-bottom: 10px;
      }
    }
  }
}

.other-list {
  height: 500px;
  padding: 10px 20px;
  text-align: center;
  h1 {
    font-size: 28px;
    margin-bottom: 30px;
  }
  .el-card {
    border-radius: 25px;
    .el-avatar--circle {
      vertical-align: middle;
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: calc(100vh - $header-height);
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>