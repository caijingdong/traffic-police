<template>
  <div class="hello">
    <van-tabs
      v-model="active"
      offset-top="0px"
      swipeable
      background="#3270e1"
      color="#3270e1"
      title-active-color="white"
      title-inactive-color="#b1c8f2"
      ref="resize"
      title-style="78px"
    >
      <van-tab title="工资详情" >         
        <van-tabs v-if="doc.length > 0" v-model="activeName" color="#3270e1" sticky>
          <van-tab           
            class="list"
            :name="item.c"
            v-for="(item,indexs) in doc"
            :title="item.year +  '月' + item.month +  '月'"
            :key="indexs"
          >
            <li class="listxx">
              工资
              <span>{{item.salary}}</span>
            </li>
            <li class="listxx">
              岗位补贴
              <span>{{item.postAllowance}}</span>
            </li>
            <li class="listxx">
              层级工资
              <span>{{item.wageLevel}}</span>
            </li>
            <li class="listxx">
              加班补贴
              <span>{{item.overtimeAllowance}}</span>
            </li>
            <li class="listxx">
              绩效奖
              <span>{{item.meritPay}}</span>
            </li>
            <li class="listxx">
              职位津贴
              <span>{{item.jobAllowance}}</span>
            </li>
            <li class="listxx">
              其他补贴
              <span>{{item.otherExpenses}}</span>
            </li>
            <li class="listxx">
              勤务
              <span>{{item.checkOnWorkAttendance}}</span>
            </li>
            <li class="listxx">
              合计
              <span>{{item.total}}</span>
            </li>
            <li class="listxx">
              社保
              <span>{{item.insuranceDeduction}}</span>
            </li>
            <li class="listxx">
              公积金
              <span>{{item.accumulationFund}}</span>
            </li>
            <li class="listxx">
              实发工资
              <span>{{item.realWages}}</span>
            </li>
            <li class="listxx">
              考核情况
              <span>{{item.situation}}</span>
            </li>
          </van-tab>
          
        </van-tabs>
        <EmptyPage v-if="show"></EmptyPage>
      </van-tab>
    </van-tabs>
    <p>{{doc.id}}</p>
  </div>
</template>
<script>
import EmptyPage from "@/components/EmptyPage/EmptyPage.vue";
export default {
  name: "HelloWorld",
    components: {
    EmptyPage
  },
  data() {
    return {
      active: "",
      activeName: "123",
      currentTime: "12:00",
      message: "",
      value: "",
      doc: "",
      newslist: {},
      lists: [],
      show:false
    };
  },
  methods: {
    getinfo() {
      this.axios({
        method: "get",
        url: "/js/a/ams/salary/personnel/personnelMonthlySalary/mobileData"
      })
        .then(res => {
          if (res.data.code == "0000") {
            let doc = res.data.data;
            this.doc = doc;
            console.log(this.doc)
          } else {
            this.show = true
            
          }
        })
        .catch(e => {
          this.$toast("获取信息失败" + JSON.stringify(e));
        });
    },
    getin() {
      this.doc = this.doc;
    }
  },
  created() {
    this.getinfo();
    this.getin();
  },
  mounted() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
ul,
li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.list {
  width: 15rem;
  margin: 0 auto;
  .listxx {
    font-size: 0.7rem;
    text-align: left;
    color: #595959;
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #e5e5e5;
    span {
      float: right;
      text-align: right;
      line-height: 2rem;
    }
  }
}
/* .van-tabs--line /deep/ .van-tabs__wrap {
  //height: 2.2rem ;
  //line-height: 2.2rem ;
  //padding-top:0.8rem;
} */
/deep/ .van-tab {
  //line-height: 2.2rem ;
  font-size: 0.7rem;
}
</style>
