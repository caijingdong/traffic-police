<template>
  <div class="launch">
    <div class="launch-wrapper">
      <div class="item-wrapper" v-if="leaveList.length > 0" @click="goDetailLeave(item.id)"  v-for="item in leaveList" :key="item.id">
        <div  class="item">
          <div class="item-img">
            <span class="img">{{name}}</span>
          </div>
          <div class="item-content">
            <div class="title-wrapper">
              <h2 class="title">请假申请</h2>
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
              <p v-if="item.status == 4" class="waited">待审核</p>
              <p v-if="item.status == 0" class="success">通过</p>              
              <p v-if="item.status == 5" class="closed">驳回</p>
            </div>
          </div>
        </div>
       
      </div>

      <div class="border"></div>
      <loading v-if="loading" ref="loading"></loading>
      <EmptyPage v-if="leaveList.length == 0" ></EmptyPage>
    </div>
  </div>
</template>
<script >
import loading from "@/components/loading/Loading.vue";
import EmptyPage from "@/components/EmptyPage/EmptyPage.vue";
import { LEAVE_GET_DATA } from "@/api/api";
import axios from "axios";
export default {
   components: {
    loading,
    EmptyPage
  },
  created() {
    this.getLeavelist();
  },

  data() {
    return {
      ty: 1,
      travelData: [],
      nowName: {},
      personid: "",
      leaveList:"",
      name:{},
      user:{},
      loading: false,
      id: this.$route.params.id,
      leaveid:"",
     // waitLeave:[]
    };
  },
  methods: {
    getLeavelist() {   
      this.axios({
        method: "get",
        url: "/js/a/ams/takeleave/takeLeave/takeLeaveListData",
         params: {
          "personnelFile.id": this.id
        }
      })
        .then(res => {
          this.leaveList = res.data
          let arr = [] 
          this.leaveList.forEach(element => {
            arr.push(element.user)           
          });
         this.name = arr[0].userName         
        })
        .catch(e => {
          
        });
    },
    goDetailLeave(id){
      this.$router.push("/Leaveinfo/" + id)
    }
  },
    computed: {
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