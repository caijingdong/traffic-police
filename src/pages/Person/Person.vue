<template>
  <div class="wode">
    <!--我的背景头像-->
    <div class="backbj">
      <img class="touxiang" src="./images/touxiang.png" alt />
      <span v-if="$store.state.showname" @click="$router.push({ name: 'Login' })">admin</span>
      <span v-else >admin</span>
    </div>
    <!--我的信息修改-->
    <div class="person">
      <img class="geren" src="./images/person.png" alt />
      <span >个人信息</span>
      <img class="jiantou" src="./images/arrow.png" alt />
    </div>
     <div class="person" @click="$router.push({ name: 'Layout' })">
      <img class="geren" src="./images/shezhi.png" alt />
      <span>设置</span>
      <img class="jiantou" src="./images/arrow.png" alt />
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      password: "",
      username: "",
      currentTime: "12:00",
      message: "",
      value: "",
      endtime: "",
      business: "",
     
      fileList: [
        { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: "https://cloud-image", isImage: true }
      ]
    };
  },
  methods: {
    ceshi(){
      this.$store.state.showname = false
    }
    




  },
  created(){
   // this.ceshi()
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.backbj {
  height: 8rem;
  background: url("./images/bj.png") no-repeat;
  background-size: 16rem;
  display: flex;
  flex-direction: column;
  .touxiang {
    width: 3rem;
    height: 3rem;
    align-self: center;
    margin-top: 2rem;
  }
  span {
    color: white;
  }
}
.person {
  height: 2.2rem;
  width: 16rem;
  border-bottom: 1px solid #ececec;

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
    color:#262626;
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
