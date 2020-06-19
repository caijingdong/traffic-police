<template>
  <div class="hello">
    <!--首页头部-->
    <!-- <div class="all clearfix" @click="$router.push({ name: 'Search' })">
      <input class="header_search" readonly="“readonly”" type="text" value="智能搜索" />
      <div class="search"></div>
    </div>-->
    <!--首页轮播图-->
    <div class="banner">
      <img src="./assets/banner.png" alt />
    </div>
    <!--个人业务-->
    <div class="content">
      <div class="service">个人业务</div>
      <ul class="business">
        <li class="business_li" @click="$router.push({ name: 'Baseinfo' })">
          <img style="display:block;" src="./assets/icon_1.png" alt />
        </li>
        <li class="business_li" @click="$router.push({ name: 'Wages' })">
          <img style="display:block;" src="./assets/icon_2.png" alt />
        </li>
        <!--  <li class="business_li" @click="$router.push({ name: 'Qingwu' })">
          <img style="display:block;" src="./assets/qwap.png" alt />
        </li>-->
        <li class="business_li" @click="$router.push({ name: 'HelloWorld' })">
          <img style="display:block;" src="./assets/icon_4.png" alt />
        </li>
        <li class="business_li" @click="$router.push({ name: 'Khqk' })">
          <img style="display:block;" src="./assets/icon_3.png" alt />
        </li>
      </ul>
    </div>
    <!--空白-->

    <div class="blank"></div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
export default {
  name: "HelloWorld",
  data() {
    return {};
  },

  methods: {
    openPicker() {
      this.$refs.picker.open();
    },
 
  },

  created: function() {
    //this.getinfo();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.all {
  width: 15.25rem;
  height: 2rem;
  margin: 0 auto;
  margin-top: 0.2rem;
  .header_search {
    font-size: 0.6rem;
    width: 12.1rem;
    height: 1.5rem;
    border-radius: 0.4rem;
    float: left;
    text-align: left;
    padding-left: 1rem;
    line-height: 1.5rem;
    background-color: #f2f2f2;
    background-size: 0.8rem;
    border: none;
    color: #666;
  }
  .search {
    float: right;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.4rem;
    background-color: #f2f2f2;
    background: #f2f2f2 url("./assets/search.png") 0.4rem no-repeat;
    background-size: 0.7rem;
  }
}

.clearfix {
  clear: both;
}
/* .content{
  text-align: center;
  font-size: 0.6rem;
  width: 14rem;
  height: 1.1rem;
  margin-top:3rem;
  background-color: #2388d7;
  color: white;
} */
.banner {
  width: 15.25rem;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
.content {
  width: 15.25rem;
  margin: 0 auto;
  .service {
    margin: 0 auto;
    font-size: 0.7rem;
    height: 2rem;
    line-height: 2rem;
    color: black;
    font-weight: 900;
    img {
      margin: 0 auto;
      width: 100%;
    }
  }
  .business {
    display: flex;
    width: 15.25rem;

    justify-content: space-between;
    flex-wrap: wrap;
    .business_li {
      width: 48%;
      flex-direction: column;
      margin-bottom: 0.4rem;
      img {
        display: block;
        width: 100%;
        margin-bottom: 0.2rem;
      }
    }
    .wenzi {
      font-size: 0.6rem;
    }
  }
  .business:after {
    content: "";
    width: 30%;
  }
}
.blank {
  margin-top: 0.1rem;
  height: 15rem;
  background-color: #f6f5f4;
}
</style>
