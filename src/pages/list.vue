<template>
  <div class="launch">
    <div class="launch-wrapper">
      <div class="item-wrapper"  v-for="item in leaveList" :key="item.id">
        <div class="item">
          <div class="item-img">
            <span class="img">{{name}}</span>
          </div>
          <div class="item-content">
            <div class="title-wrapper">
              <h2 class="title">我的请假申请</h2>
              <span class="timer"></span>
            </div>
            <div class="block">
              <span class="lt">请假类型：</span>
              <span class="ls">{{item.leaveTypeValue}}</span>
            </div>
            <div class="block">
              <span class="lt">开始时间：</span>
              <span class="ls">{{item.startTime}}</span>
            </div>
            <div class="block">
              <span class="lt">结束时间：</span>
              <span class="ls">{{item.endTime}}</span>
            </div>
            <div class="info">
              <p v-if="item.status == 4" class="success">待审核</p>
              <p v-if="item.status == 0"  class="waited">通过</p>              
              <p v-if="item.status == 5" class="closed">驳回</p>
            </div>
          </div>
        </div>
       
      </div>

      <div class="border"></div>
      <loading v-if="loading" ref="loading"></loading>

      <!--  <div class="no-data" v-if="!travelData || travelData.length === 0">暂无数据</div> -->
    </div>
  </div>
</template>
<script >
// 引入 api
import loading from "../components/loading/Loading.vue";
import { mapMutations } from "vuex";

import axios from "axios";
import { MY_GET_DATA } from "./Person/api/api";

//import * as dd from "dingtalk-jsapi";
export default {
   components: {
    loading
  },
  created() {
    this.getLeavelist();
    this.getinfo()
    // mock数据
  },

  data() {
    return {
      ty: 1,
      travelData: [],
      nowName: {},
      personid: "",
      leaveList:"",
      name:"",
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    getLeavelist() {
      /* MY_GET_DATA("/js/a/ams/takeleave/takeLeave/findData", {"personnelFile.id": this.personid}) */
      this.axios({
        method: "post",
        url: "/js/a/ams/takeleave/takeLeave/findData",
       /*  params: {
          "personnelFile.id": this.personid
        } */
      })
        .then(res => {
          //console.log("postData:执行完毕");
          console.log(res.data)
          this.leaveList = res.data.list
        })
        .catch(e => {
          this.$toast("user.get fail: " + JSON.stringify(e));
        });
    },
    getinfo() {
      this.loading = true;
      this.axios({
        method: "get",
        url: "/js/a/ams/personnelfile/personnelFile/getCurrentUserPersonnelFile"
      })
        .then(res => {
          if (res.data.code == "0000") {
            //console.log("请求以后的标记");
            let doc = res.data.data;
             this.name = doc.name
            this.personid = doc.id;
            console.log(this.name)
            this.getLeavelist();
            this.loading = false;
            /*            // console.log(doc);
            this.lists = doc;
            this.office = this.lists.office;
            //this.officename = this.office.officeName
            this.info1 = doc.familyMembers;
            this.record1 = doc.personnelRecords;
            this.train1 = doc.trainingRecords;
            this.dada = this.code.filter(item => {
              if (this.lists.politicsStatusKey == item.dictValue) {
                return item;
              }
            });
            this.dada = this.dada[0].treeNames;
            this.getEquepment();
            //this.code = this.code
            //console.log(this.code);
            //console.log(this.record); */
          } else {
            this.$toast("user.get fail: " + JSON.stringify(res));
          }
        })
        .catch(e => {
          this.$toast("user.get fail: " + JSON.stringify(e));
        });
    }
  }
};
</script>
<style scoped lang="less">
h1,
h2,
p {
  padding: 0;
  margin: 0;
}
.launch {
 
  padding-bottom:4rem;
  .launch-wrapper {
    .item-wrapper {
      .item {
        border-bottom: 1px solid #ececec;
        padding: 0.6rem;
        display: flex;
        height: 4rem;
        .item-img {
          width: 1rem;
          flex: 0, 0, 15px;
          .img {
            display: block;
            width: 2.2rem;
            height: 2.2rem;
            line-height: 2.2rem;
            background-color: #358de7;
            border-radius: 50%;
            font-size: 0.5rem;
            text-align: center;
            color: #fff;
          }
        }
        .item-content {
          flex: 1;
          .title-wrapper {
            display: flex;
            padding-bottom: 0.3rem;
            .title {
              flex: 1;
              font-size: 0.6rem;
              line-height: 0.8rem;
              text-align: left;
              margin-left: 2rem;
            }
            .timer {
              display: flex;
              flex: 0, 0, 0;
              text-align: right;
              color: #999;
              width: 2rem;
              padding-top: 0.1rem;
              font-size: 0.5rem;
            }
          }
          .block {
            display: block;
            font-size: 0.6rem;
            line-height: 0.7rem;
            text-align: left;
            margin-left: 2rem;
            color: #888;
            .lt {
              flex: 0, 0, 60px;
            }
            .ls {
              flex: 1;
            }
          }
          .info {
            line-height: 25px;
            font-size: 14px;
            text-align: left;
            margin-left: 2rem;
            .success {
              color: #5cb85c;
            }

            .waited {
              color: #f0ad4e;
            }

            .closed {
              color: #d9534f;
            }
          }
        }
      }
    }
  }
}
.border {
  height: 1px;
}
</style>

