<template>
  <div class="police">
    <div class="title">辅警信息</div>
    <div class="police-list">
      <ul class="item-list">
        <li v-for="item in policeData" :key="item.id">
          <div class="item-top">
            <div class="head-left">
              <img style="display:block;" src="../assets/img/police.png" alt />
            </div>
            <div class="text-right">
              <span style="color:#333333;font-size:0.8rem;font-weight:bold;">
                {{item.name}}
                <br />
              </span>
              <span>{{item.typesOfIdentity}}</span>
             
            </div>
             <div class="waitleave">{{item.waitAudit}}条未审核</div>
          </div>
          <div class="item-bottom">
            <ul>
              <li @click="goDetail(item.id)">
                <div class="item-person">
                  <img style="display:block;" src="../assets/img/head.png" alt />
                </div>个人档案
              </li>
              <li @click="goLeavelist(item.id)">
                <div class="item-person">
                  <img style="display:block;" src="../assets/img/approve.png" alt />
                </div>审批信息
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//import qs from "qs";
//import { formatDate } from "../js/format.js";
import { POLICE_GET_DATA } from "@/api/api";
export default {
  name: "HelloWorld",
  data() {
    return {
      policeData: ""
    };
  },
  methods: {
    getccNameInfo() {
      POLICE_GET_DATA(
        "/js/a/ams/personnelfile/personnelFile/auxiliaryPoliceListData"
      ).then(res => {
        this.policeData = res.data;
      });
    },
    goDetail(id) {
      this.$router.push("/Personinfo/" + id);
    },
    goLeavelist(id) {
      this.$router.push("/Policeleave/" + id);
    }
  },
  created() {
    this.getccNameInfo();
  },
  mounted() {},

  computed: {
    reversedMessage: function() {
      // `this` 指向 vm 实例
      return this.office.officeName;
      /*       const arr = this.code.filter(item => {
        if(this.lists.politicsStatusKey == item.dictValue) {
          return item
        }
      }) */
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.police {
  .title {
    width: 100%;
    height: 1.8rem;
    background-color: #3270e1;
    color: white;
    text-align: center;
    line-height: 1.8rem;
    font-size: 0.8rem;
  }
  .police-list {
    ul {
      .item-top {
        border-bottom: 1px solid #f0f0f0;
        height: 3.6rem;
        .head-left {
          float: left;
          width: 2.5rem;
          height: 2.5rem;
          margin: 0.5rem 0 0 0.4rem;
          img {
            width: 100%;
          }
        }
        .text-right {
          float: left;
          margin: 0.7rem 0 0 0.3rem;
          span {
            float: none;
            font-size: 0.7rem;
            margin-top: 1rem;
          }

        }
        .waitleave {
          float: right;
          color: #d92222;
          font-size: 0.7rem;
          margin: 0;
          padding: 0;
          margin-right: 0.4rem;
          margin-top: 2rem;
        }
      }
      .item-bottom {
        height: 2rem;
        border-bottom: 0.4rem solid #f0f0f0;
        ul {
          li {
            width: 49%;
            float: left;
            font-size: 0.7rem;
            line-height: 2rem;
            height: 2rem;
            color: #56585a;
            .item-person {
              float: left;
              width: 0.8rem;
              margin: 0.56rem 0.2rem 0 2rem;
              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>