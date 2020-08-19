<template>
  <div class="launch">
    <div class="launch-wrapper">
      <div class="item-wrapper">
        <div class="item">
          <div class="item-content">
            <div class="block">
              <span class="lt">请假类型：</span>
              <span class="ls">{{leaveinfo.leaveTypeValue}}</span>
            </div>

            <div class="block">
              <span class="lt">开始时间：</span>
              <span class="ls">{{leaveinfo.startTime}}</span>
            </div>
            <div class="block">
              <span class="lt">结束时间：</span>
              <span class="ls">{{leaveinfo.endTime}}</span>
            </div>
            <div class="block">
              <span class="lt">请假时长：</span>
              <span class="ls">{{leaveinfo.leaveDays}}</span>
            </div>
            <div class="block">
              <span class="lt">请假理由：</span>
              <span class="ls">{{leaveinfo.remarks}}</span>
            </div>
            <div class="block">
              <span class="lt">附件：</span>
              <ul>
                <!--  <li @click="preView(i)" class="pictures" v-for="(item,i) in imgs" :key="i">
                  <img :src="imgurl + item" />
                </li>-->
                <van-image
                  width="4rem"
                  height="4rem"
                  fit="cover"
                  :src="item"
                  v-for="(item,i) in pics"
                  :key="i"
                  @click="preView(i)"
                  style="margin-right:10px"
                />
              </ul>
            </div>
            <!--<van-image-preview v-model="showpic" :images="pics" @change="onChange">
 <template v-slot:index>第{{ index }}页</template>
            </van-image-preview>-->
          </div>
        </div>
      </div>

      <div class="button" @click="passData(12)">通过</div>
      <div class="back" @click="passData(2)">驳回</div>
    </div>
  </div>
</template>
<script >
import axios from "axios";
import { pathway } from "@/api/common";
import { ImagePreview } from "vant";
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  created() {
    //this.getLeavelist();
    this.getLeaveinfo();
  },
  data() {
    return {
      //showpic: true,
      //index: 0,
      show: false,
      ty: 1,
      travelData: [],
      nowName: {},
      personid: "",
      leaveinfo: "",
      name: "",
      id: this.$route.params.id,
      imgs: [],
      imgurl: "http://115.223.34.119:9095",
      //imgurl: "http://192.168.1.88:8080",
      pics: [],
    };
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    getLeaveinfo() {
      const params = { id: this.id };
      this.axios({
        method: "post",
        url: "/js/a/ams/takeleave/takeLeave/personalListData",
        params,
      })
        .then((res) => {
          this.leaveinfo = res.data.list[0];
          this.imgs = [].concat(this.leaveinfo.imgUrl.split(","));
          console.log(this.imgs)
          let poped = this.imgs.pop();
          let arr = [];
          this.imgs.forEach((item) => {
            this.pics.push(this.imgurl + item);
          });
          console.log(this.pics);
        })
        .catch((e) => {
          this.$toast("user.get fail1: " + JSON.stringify(e));
        });
    },
    passData(flowStateKey) {
      const params = { id: this.id, flowStateKey };
      this.axios({
        method: "post",
        url: "/js/a/ams/takeleave/takeLeave/takeLeaveAudit",
        params,
      })
        .then((res) => {
          if (flowStateKey === 12) {
            this.$toast("审核通过");
            this.$router.push({ name: "Policeinfo" });
          } else if (flowStateKey === 2) {
            this.$toast("驳回成功");
            this.$router.push({ name: "Policeinfo" });
          }
        })
        .catch((e) => {
          this.$toast("user.get fail1: " + JSON.stringify(e));
        });
    },
    preView(i) {
      ImagePreview({
        images: this.pics,
        showIndex: true,
        loop: true,
        startPosition: i,
      });
    },
  },
};
</script>
<style scoped lang="less">
.pictures {
  width: 100px;
  img {
    width: 100%;
  }
}
h1,
h2,
p {
  padding: 0;
  margin: 0;
}
.launch {
  padding-bottom: 4rem;
  .launch-wrapper {
    .item-wrapper {
      .item {
        padding: 0.6rem;
        display: flex;
        margin-bottom: 2rem;
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
          .block {
            display: block;
            font-size: 0.6rem;
            line-height: 2rem;
            text-align: left;
            color: #888;
            border-bottom: 1px solid #e5e5e5;
            .lt {
              flex: 0, 0, 60px;
              color: black;
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
  .button {
    bottom: 60px;
    width: 6rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: 0.8rem;
    background-color: #1a96dd;
    color: white;
    border-radius: 0.4rem;
    float: left;
    margin: 0 1.3rem;
  }
  .back {
    bottom: 60px;
    width: 6rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: 0.8rem;
    background-color: #df1b40;
    color: white;
    border-radius: 0.4rem;
    float: left;
  }
}
</style>