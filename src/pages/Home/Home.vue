<template>
  <div class="home">
    <div class="banner">
      <img src="./assets/img/banner.png" alt />
    </div>
    <!--个人业务-->
    <div class="content">
      <div class="service">个人业务</div>
      <ul class="business">
        <li class="business_li" @click="$router.push({ name: 'Baseinfo' })">
          <div class="img_li">
            <img style="display:block;" src="./assets/img/icon_person.png" alt />
          </div>
          <div class="plain_li">
            <h1>基本信息</h1>
            <p>个人档案</p>
          </div>
        </li>
        <li class="business_li" @click="$router.push({ name: 'Wages' })">
          <div class="img_li">
            <img style="display:block;" src="./assets/img/icon_7.png" alt />
          </div>
          <div class="plain_li">
            <h1>工资明细</h1>
            <p>每月工资详细</p>
          </div>
        </li>
        <li class="business_li" @click="$router.push({ name: 'Applyleave' })">
          <div class="img_li">
            <img style="display:block;" src="./assets/img/icon_8.png" alt />
          </div>
          <div class="plain_li">
            <h1>请销假管理</h1>
            <p>休假、出入境申请</p>
          </div>
        </li>
        <li class="business_li" @click="$router.push({ name: 'Khqk' })">
          <div class="img_li">
            <img style="display:block;" src="./assets/img/icon_9.png" alt />
          </div>
          <div class="plain_li">
            <h1>考核情况</h1>
            <p>年终考核情况</p>
          </div>
        </li>
        <li
          v-if="personid == true"
          class="business_li"
          @click="$router.push({ name: 'Policeinfo' })"
        >
          <div class="img_li">
            <img style="display:block;" src="./assets/img/icon_10.png" alt />
          </div>
          <div class="plain_li">
            <h1>民警信息</h1>
            <p>考察信息</p>
          </div>
        </li>
      </ul>
    </div>
    <!--空白-->

    <div class="blank"></div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { ID_GET} from "@/api/api";
export default {
  name: "HelloWorld",
  data() {
    return {
      personid: ""
    };
  },
  methods: {
    getNameId() {
      ID_GET("/js/a/ams/takeleave/takeLeave/isPolice")
        .then(res => {
          this.personid = res.data;
          //console.log(res)
          //console.log("获取成功" + this.personid);
        })
        .catch(e => {
          this.$toast("info.get fail: " + JSON.stringify(e));
        });
    }
  },

  created: function() {
    this.getNameId();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1,
p {
  margin: 0;
  padding: 0;
}
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
  /*   .search {
    float: right;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.4rem;
    background-color: #f2f2f2;
    background: #f2f2f2 url("./assets/search.png") 0.4rem no-repeat;
    background-size: 0.7rem;
  } */
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
    text-align: center;
    img {
      margin: 0 auto;
      width: 0.8rem;
      display: block;
    }
  }
  .business {
    display: flex;
    width: 15.25rem;
    justify-content: space-between;
    flex-wrap: wrap;
    .business_li {
      width: 49%;
      height: 2.8rem;
      flex-direction: column;
      margin-bottom: 0.4rem;
      background-color: #f9f9fb;
      border-radius: 0.25rem;
      .plain_li {
        float: left;
        margin: 0.6rem 0 0.2rem 0.3rem;
        h1 {
          font-size: 0.6rem;
          font-weight: normal;
          color: black;
          margin-bottom: 0.1rem;
        }
        p {
          font-size: 0.6rem;
        }
      }

      .img_li {
        width: 1.8rem;
        float: left;
        margin: 0.54rem 0 0 0.4rem;

        img {
          display: block;
          width: 100%;
          margin-bottom: 0.2rem;
        }
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