<template>
  <div class="bottom-box">
    <div class="content-left">
      <div class="icon-box">
        <el-icon><Place /></el-icon>
        <span class="logo-txt">虎年大吉</span>
      </div>
      <p class="p1">
        平台介绍信息平台介绍信息平台介绍信息平台介绍信息平台介绍信息平台介
        绍信息平台介绍信息平台介绍信息平台介绍信息平台介绍信息平台介绍信息
        平台介绍信息平台介绍信息平台介绍信息平台介绍信息平台介绍信息平台介绍
        信息平台介绍信息平台介绍信息平台介绍信息平台介绍信息
      </p>
      <p class="p2">联系电话:188888822002</p>
    </div>
    <div class="content-right">
      <p>联系我们</p>
      <el-image
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgoss4.veer.com%2Fcreative%2Fvcg%2Fveer%2F612%2Fveer-302970284.jpg&refer=http%3A%2F%2Fgoss4.veer.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668927769&t=aa8b660e21772f0bc546e92d87147fa5"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss"  scoped>
.bottom-box {
  height: 200px;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 20px;
  background: #f0f0f0;
  .content-left {
    height: 100%;
    width: 500px;
    ::v-deep p {
      font-size: 14px;
      font-family: "SimHei";
      color: $bg-color-grey;
      margin: 10px 0;
      padding: 0 10px;
      line-height: 20px;
    }
  }
  .content-right {
    height: 100%;
    width: 300px;
    .el-image {
      height: 100px;
      width: 100px;
      margin-top: 20px;
    }
  }
}
</style>