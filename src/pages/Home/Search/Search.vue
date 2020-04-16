<template>
  <div class="hello">
    <div class="all clearfix">
      <input
        v-model="selectVal"
        class="header_search"
        type="text"
        placeholder="搜索所在的个人信息"
        @blur="queryData"
        @input="queryData"
      />
    </div>

    <button @click="reset()">取消{{ count }}</button>

    <div class="org">
      <div v-for="(item,index) in orgList" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      password: "",
      username: "",
      currentTime: "12:00",
      message: "",
      value: "",
      endtime: "",
      business: "",
      selectVal: "", //搜索关键字

      //orgList:搜索后显示的列表，初始值应该从后台拿取
      orgList: [
        "基本信息",
        "工资明细",
        "勤务安排",
        "请消假管理",
        "考核情况",
        "上海银行贷款部"
      ],
      //全部的数据列表
      normal: [
        "江苏银行",
        "江苏农业银行",
        "上海银行",
        "苏州银行",
        "南京银行",
        "上海银行贷款部"
      ],
      selectVal: "", //搜索关键字

      fileList: [
        { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
        { url: "https://cloud-image", isImage: true }
      ]
    };
  },
  methods: {
    getBusiness() {
      const that = this;
      dd.ready(function() {
        dd.biz.util.chosen({
          source: [
            {
              key: "病假", //显示文本
              value: "123" //值，
            },
            {
              key: "事假",
              value: "234"
            },
            {
              key: "婚假",
              value: "234"
            }
          ],

          onSuccess: function(result) {
            that.business = result.key;
            //onSuccess将在点击完成之后回调
            /*
        {
            key: '选项2',
            value: '234'
        }
        */
          },
          onFail: function(err) {}
        });
      });
    },
    queryData() {
      //并没有输入关键字时，就不要再搜索了
      if (this.selectVal === "" || this.selectVal == null) {
        this.orgList = JSON.parse(JSON.stringify(this.orgList));
        return;
      }
      //搜索
      let list = this.orgList.filter(item => item.indexOf(this.selectVal) >= 0);
      this.orgList = list;
    },
    reset() {
      this.orgList = JSON.parse(JSON.stringify(this.normal));
    }
  },
   computed: {
    count () {
      return this.$store.state.count
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
span {
  width: 3rem;
  text-align: left;
}
.anniu {
  text-align: center;
  font-size: 1rem;
  width: 14rem;
  height: 2rem;
  margin: 0 auto;
  margin-top: 4rem;
  line-height: 2rem;
  background-color: #2388d7;
  color: white;
}
.biaoti {
  padding: 0;
  text-align: left !important;
}
.all {
  width: 16rem;
  height: 2rem;
  margin: 0 auto;
  margin-top: 0.2rem;
  .header_search {
    font-size: 0.6rem;
    width: 11.8rem;
    height: 1.5rem;
    border-radius: 100rem;
    text-align: left;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    margin: 0 auto;
    line-height: 1.5rem;
    background-color: #f2f2f2;
    background-size: 0.2rem;
    border: none;
    color: #808080;
    background: #f2f2f2 url("../assets/search1.png") 0.6rem no-repeat;
    background-size: 0.7rem;
  }
}

.clearfix {
  clear: both;
}
</style>
