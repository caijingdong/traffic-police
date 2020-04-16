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
        <van-tabs v-model="activeName" color="#3270e1" sticky>
          <van-tab
            class="list"
            v-for="(assess,indexs) in assess1"
            :title="assess.year"
            :key="indexs"
          >
            <ul v-for="assess in assess1" :key="assess.id">
              <li class="listxx border">
                机构名称
                <span>{{office.officeName}}</span>
              </li>
              <li class="listxx">
                年份
                <span>{{assess.year}}</span>
              </li>
              <li class="listxx">
                评定等级
                <span>{{userdata}}</span>
              </li>

              <!-- <ul v-for="month in items" :key="month.message"> -->

              <li class="listxx">
                1月
                <span></span>
              </li>
              <li class="listxx">
                2月
                <span></span>
              </li>
              <li class="listxx">
                3月
                <span></span>
              </li>
              <li class="listxx">
                4月
                <span></span>
              </li>
            </ul>
            <!--  </ul> -->
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "HelloWorld",
  data() {
    return {
      active: "",
      activeName: "123",
      active1: "",
      active2: "2",
      currentTime: "12:00",
      message: "",
      value: "",
      officeid: "",
      lists: this.lists,
      endtime: "",
      business: "",
      assess1: "",
      office: "",
      year: "",
      userdata: "",
      code: {}
    };
  },
  methods: {
    getinfo() {
      this.axios({
        method: "post",
        url: "/js/a/ams/personnelfile/personnelFile/getCurrentUserPersonnelFile"
      })
        .then(res => {
          this.lists = res.data.data.name;
          this.personid = res.data.data.id;
          let office = res.data.data.office;
          this.officeid = office.id;
          //console.log("getinfo方法执行", this.lists);
          this.getview();
          this.getmonth();
        })
        .catch(e => {
          alert("获取信息失败");
        });
    },
    getview() {
      //console.log(this.lists, "getView-Method");
      this.axios({
        method: "get",
        /*  "/js/a/ams/assessmentresult/assessmentResult/viewData?name=" +
          this.lists +
          "&office='+this.officeid'" */
        url: "/js/a/ams/assessmentresult/assessmentResult/viewData",
        params: {
          name: this.personid
          //office: this.officeid
        }
      })
        .then(res => {
          //console.log(res.data);
          console.log("请求成功")
          this.assess1 = res.data.list;
          let doc = res.data.list[0];
          this.office = doc.office;
          this.getmonth();
          this.userdata = this.code.filter(item => {
            if (this.assess1[0].rating == item.dictValue) {
              return item;
            }
          });
          this.userdata = this.userdata[0].treeNames;
          
        })
        .catch(e => {});
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
          //console.log(res.data);
          //let code = res.data[2]

          this.code = res.data.data[0];

          //console.log(this.code);
        })
        .catch(err => {
          console.log(err);
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
          //console.log(res.data);
        })
        .catch(e => {});
    }
  },
  created() {
    this.getinfo();
    this.getValueobj();
  },
  computed: {
    reversedMessage: function() {
      // `this` 指向 vm 实例
      this.name = this.lists;
      // console.log(this.name)
      console.log(this.lists);
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
