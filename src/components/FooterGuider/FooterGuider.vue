<template>
  <div class="bottom">
    <div class="item" @click="clickItem('/Home')" :class="{active: $route.path==='/Home'}">
      <i style="font-size:1.1rem;padding-left:0.05rem;" class="iconfont icon-icon_huabanfuben"></i>
      <p>首页</p>
    </div>
    <div class="item" @click="clickItem('/Person')" :class="{active: $route.path==='/Person'}">
      <i style="font-size:1.1rem;padding-left:0.05rem;" class="iconfont icon-icon-test"></i>
      <p>我的</p>
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
  height: 2.4rem;
}
.item {
  margin: 0.2rem 21%;
  float: left;
}
.item p {
  margin: 0;
  font-size: 0.6rem;
}
.active {
  color: #3a8ee7;
}
</style>

