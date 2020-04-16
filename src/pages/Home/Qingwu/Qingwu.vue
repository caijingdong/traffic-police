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
      <van-tab title="勤务安排">
        <van-tabs v-model="activeName" color="#3270e1" sticky>
          <van-tab
            class="list"
            :name="item.c"
            v-for="(item,indexs) in items"
            :title="item.message"
            :key="indexs"
          >
            <!--             <li class="listxx">
              月份
              <span>{{item.message}}</span>
            </li>
            <li class="listxx">
              基础性绩效工资
              <span>{{item.title1}}</span>
            </li>
            <li class="listxx">
              岗位工资
              <span>{{item.sex}}</span>
            </li>
            <li class="listxx">
              个人所得税
              <span>{{item.school}}</span>
            </li>
            <li class="listxx">
              住房公积金
              <span>{{item.card}}</span>
            </li>
            <li class="listxx">
              年终奖金
              <span>{{item.zhiye}}</span>
            </li>-->
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      // msg: "Welcome to Your Vue.js App",
      // password: "",
      active: "",
      activeName: "123",
      active1: "",
      active2: "2",
      currentTime: "12:00",
      message: "",
      value: "",
      //id:this.$route.params.id,
      newslist: {},
      lists: [],
      items: [
        {
          message: "2020-1月",
          title2: "1月",
          title1: "文字",
          sex: "4000",
          school: "2000",
          card: "10000",
          zhiye: "29999"
        },
        {
          message: "2020-2月",
          title2: "2月",
          title1: "文字",
          sex: "2999",
          school: "29999",
          card: "299992",
          zhiye: "29999"
        },
        {
          message: "2020-3月",
          title2: "3月",
          title1: "299993",
          sex: "29999",
          school: "29999",
          card: "330",
          zhiye: "29999"
          // c:"123"
        },
        {
          message: "2020-4月",
          title2: "4月",
          title1: "444",
          sex: "29999",
          school: "29999",
          card: "330327112412",
          zhiye: "29999"
        },
        {
          message: "2020-5月",
          title2: "5月",
          title1: "555",
          sex: "29999",
          school: "29999",
          card: "3312",
          zhiye: "29999"
        },
        {
          message: "2020-6月",
          title2: "6月",
          title1: "666",
          sex: "女1",
          school: "29999",
          card: "12412",
          zhiye: "29999"
        },
        {
          message: "2020-7月",
          title2: "7月",
          title1: "666",
          sex: "女1",
          school: "29999",
          card: "12412",
          zhiye: "29999"
        },
        {
          message: "2020-8月",
          title2: "8月",
          title1: "666",
          sex: "女1",
          school: "29999",
          card: "12412",
          zhiye: "29999",
          c: "123"
        }
      ],
      items1: [
        {
          message: "个人信息",
          title: "杨学东",
          title1: "男",
          sex: "52",
          school: "13000232141",
          card: "本科",
          zhiye: "643552335325235",
          xingming: "姓名",
          xingbie: "性别",
          dqnl: "当前年龄",
          lxfs: "联系方式",
          xl: "学历",
          kh: "银行卡号",
          zzmm: "政治面貌",
          rq: "日期"
        },
        {
          message: "工作信息",
          title: "一大队一中队",
          title1: "离职",
          sex: "秩序辅警",
          school: "文职类",
          //card: "辅警",

          xingming: "服务部门",
          xingbie: "工作状态",
          dqnl: "人文类型",
          lxfs: "工作类别"
        },
        {
          message: "聘用相关"
        },
        {
          message: "相关补充"
        },
        {
          message: "相关附件"
        }
      ],
      endtime: "",
      business: "",
      fileList: [
        { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: "https://cloud-image", isImage: true }
      ]
    };
  },
  methods: {
    fine() {
      dd.ready(function() {
        dd.biz.util.scan({
          type: String,
          onSuccess: function() {},
          onFail: function() {}
        });
      });
    },
    getStarttime() {
      const that = this;
      dd.ready(function() {
        dd.biz.util.datetimepicker({
          format: "yyyy-MM-dd HH:mm",
          value: "2019-12-30 08:00", //默认显示
          onSuccess: function(result) {
            //onSuccess将在点击完成之后回调
            //alert(JSON.stringify(result))

            that.value = result.value;
            // alert(that.value)
          },
          onFail: function(err) {}
        });
      });
    },
    getEndtime() {
      const that = this;
      dd.ready(function() {
        dd.biz.util.datetimepicker({
          format: "yyyy-MM-dd HH:mm",
          value: "2019-12-30 08:00", //默认显示
          onSuccess: function(result) {
            //onSuccess将在点击完成之后回调
            //alert(JSON.stringify(result))

            that.endtime = result.value;
            //alert(that.value)
          },
          onFail: function(err) {}
        });
      });
    },
    getType() {
      dd.ready(function() {
        dd.biz.calendar.chooseInterval({
          defaultStart: 1494415396228,
          defaultEnd: 1494415396228,
          onSuccess: function(result) {
            //onSuccess将在点击确定之后回调
            /*{
            start: 1514908800000,
            end: 1514995200000,
            timezone:8
        }
        */
          },
          onFail: function(err) {}
        });
      });
    },
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
    getColor() {
      this.$refs.resize.style.height = "99px";
    },
    getNewlist() {
      this.axios({
        method: "get",
        url: "api/getnewslist"
        //params: this.params
      }).then(result => {
        if (result.body.status === 0) {
          // 如果没有失败，应该把数据保存到 data 上
          this.newslist = result.body.message;
        } else {
          alert("获取新闻列表失败！");
        }
      });
    },
    resetList() {
      // console.log(this.params)
      this.axios({
        method: "post",
        url: "m/unfinished",
        params: this.params
      }).then(res => {
        //console.log(res)
        let doc = res.data.data.list;
        //console.log(doc)
        let list = [];
        if (doc) {
          for (let i of doc) {
            list.push(i.ruTask);
          }
        }
        this.lists = list;
        //console.log(this.lists);
        this.initCount = res.data.data.count;
        /*   this.$nextTick( () => {
          this._initScroll()
        }) */
      });
    }
  },
  created() {
    //this.getNewlist(),
    //this.resetList();
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
