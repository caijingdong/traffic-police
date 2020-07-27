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
    >
      <van-tab title="考勤情况">
        <van-tabs v-if="assess1.length > 0" v-model="activeName" color="#3270e1" sticky>
          <van-tab
            class="list"
            v-for="(assess,indexs) in assess1"
            :title="assess.year"
            :key="indexs"
          >
            <li class="item-list border">
              机构名称
              <span>{{assess.officeName}}</span>
            </li>
            <li class="item-list">
              年份
              <span>{{assess.year}}</span>
            </li>
            <li class="item-list">
              评定等级
              <span>{{assess.ratingValue}}</span>
            </li>

            <li class="item-list">
              1月
              <span></span>
            </li>
            <li class="item-list">
              2月
              <span></span>
            </li>
            <li class="item-list">
              3月
              <span></span>
            </li>
            <li class="item-list">
              4月
              <span></span>
            </li>
            <!--  </ul> -->
          </van-tab>
        </van-tabs>
        <EmptyPage v-if="show" >111</EmptyPage>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import qs from "qs";
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
      officeid: "",
      assess1: "",
      code: {},
      show:false
    };
  },
  methods: {
    getinfo() {
      this.axios({
        method: "post",
        url: "/js/a/ams/personnelfile/personnelFile/getCurrentUserPersonnelFile"
      })
        .then(res => {
          if (res.data.code === "0000") {
            this.personid = res.data.data.id;
          }else{
           this.show = true
          }
        })
        .catch(err => {});
    },
    getview() {
      this.axios({
        method: "get",
        url: "/js/a/ams/assessmentresult/assessmentResult/mobileData "
      })
        .then(res => {
          if (res.data.code === "0000") {
            this.assess1 = res.data.data;
            console.log(this.assess1)
            //this.getmonth();
/*             this.userdata = this.code.filter(item => {
              if (this.assess1[0].rating == item.dictValue) {
                return item;
              }
            });
            this.userdata = this.userdata[0].treeNames; */
          } else {
            this.show = true
          }
        })
        .catch(e => {
          // this.$toast("获取失败" + JSON.stringify(e));
        });
    },
    getValueobj() {
      this.axios({
        method: "post",
        url: "/js/mobile/getDictList",
        data: qs.stringify(
          {
            dictTypes: ["ams_level_evaluated"]
          },
          { indices: false }
        ),
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.code = res.data.data[0];
          } else {
          }
        })
        .catch(err => {
         
        });
    },
    getmonth() {
      this.axios({
        method: "get",
        url:
          "/js/a/ams/salary/personnel/personnelMonthlySalary/findPersonnelSituation",
        params: {
          "personnelFile.id": this.personid,
          "officeMonthlySalary.year": "2020"
        }
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          
        });
    }
  },
  created() {
    //this.getinfo();
    //this.getValueobj();
    this.getview();
  },
  computed: {
    reversedMessage: function() {
      // `this` 指向 vm 实例
      this.name = this.lists;
      // console.log(this.name)
      //console.log(this.lists);
      return name;
    }
  },
  mounted() {
    // this.getview();
  }
};
</script>
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
  .item-list {
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
