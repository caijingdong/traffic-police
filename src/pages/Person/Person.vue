<template>
  <div class="wode">
    <!--我的背景头像-->
    <div class="backbj">
      <img class="touxiang" src="./images/touxiang.png" alt />
      <!--  <span v-if="$store.state.showname" @click="$router.push({ name: 'Login' })">admin</span> -->
      <span>{{lists.name}}</span>
    </div>
    <!--我的信息修改-->

    <div class="person" @click.prevent="logout">
      <img class="geren" src="./images/shezhi.png" alt />
      <span>退出登录</span>
      <img class="jiantou" src="./images/arrow.png" alt />
      <loading v-if="loading" ref="loading"></loading>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import loading from "@/components/loading/Loading.vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      lists: "",
      loading: false
    };
  },
  components: {
    loading
  },
  methods: {
    ceshi() {
      this.$store.state.showname = false;
    },
    logout() {
      this.loading = true;
      this.axios({
        method: "post",
        url: "/js/a/logout"
      })
        .then(res => {
          this.loading = false;
          this.$router.push("/Login");
        })
        .catch(e => {
          alert("1");
        });
    },
    getinfo() {
      this.axios({
        method: "get",
        url: "/js/a/ams/personnelfile/personnelFile/getCurrentUserPersonnelFile"
      })
        .then(res => {
          if (res.data.code == "0000") {
            let doc = res.data.data;
            this.personid = doc.id;
            this.lists = doc;
          } else {
          }
        })
        .catch(e => {
         this.$toast("user.get fail: " + JSON.stringify(res));
        });
    }
  },
  created() {
    this.getinfo();
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
    text-align: center;
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
