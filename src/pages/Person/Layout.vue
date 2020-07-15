<template>
  <div class="content" ref="loginForm">
    <div class="logo">
      <div class="clearfix"></div>
    </div>
    <div class="person" @click.prevent="logout">
      <img class="geren" src="./images/person1.png" alt />
      <span>退出登录</span>
      <img class="jiantou" src="./images/jiantou1.png" alt />
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import axios from "axios";
import { LAY_OUT } from "@/api/api";
export default {
  name: "sousuo",
  data() {
    return {};
  },
  created() {},
  methods: {
    logout() {
        LAY_OUT("/js/a/logout")
        .then(res => {
          this.$router.push("/Login");
        })
        .catch(e => {
          this.$toast("user.get fail: " + JSON.stringify(res));  
        });
    }
  }
};
</script>
<style lang="less" scoped>
.person {
  height: 2.2rem;
  width: 16rem;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
  background-color: #f5f5f5;

  .geren {
    width: 1.1rem;
    height: 1.1rem;
    margin-top: 0.55rem;
    margin-left: 0.6rem;
    margin-right: 0.4rem;
    float: left;
  }
  span {
    line-height: 2.2rem;
    font-size: 0.7rem;
    float: left;
    color: #262626;
  }
  .jiantou {
    float: right;
    width: 1.3rem;
    height: 1.3rem;
    margin-top: 0.5rem;
    margin-left: 0.4rem;
  }
}
</style>