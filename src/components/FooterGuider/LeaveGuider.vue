<template>
  <div class="bottom">
    <div class="item" @click="clickItem('/Leave/HelloWorld')" :class="{active: $route.path==='/Leave/HelloWorld'}">
      <i style="font-size:1.1rem;" class="iconfont icon-qingjia1"></i>
      <p>请假</p>
    </div>
    <div class="item" @click="clickItem('/Leave/list')" :class="{active: $route.path==='/Leave/list'}">
      <i style="font-size:1.1rem;" class="iconfont icon-shenpi"></i>
      <p>审批</p>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "bottom",
  methods: {
    clickItem: function(path) {
      this.$router.push(path);
    }
  }
};
</script>
 
<style scoped>
.bottom {
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #f5f5f5;
  background-color: #fff;
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
}
.item {
  margin: 5px 20%;
  float: left;
}
.item p {
  margin: 0;
  font-size: 15px;
}
.active {
  color: #3a8ee7;
}
</style>

