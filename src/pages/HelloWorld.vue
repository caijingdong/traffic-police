<template>
  <div class="hello">
    <van-cell-group>
      <van-field
        required
        clearable
        label="请假类型"
        :placeholder="colovalue"
        input-align="right"
        label-align="left"
        label-width="84px"
        disabled
        size="large"
        right-icon="arrow"
        @click="showPicker = true"
      />
    </van-cell-group>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmtype"
      />
    </van-popup>
    <div
      style="font-size:0.4rem;text-align:left;height:1rem;;line-height:1rem;padding-left:0.4rem"
    >剩余时间：{{leaveYear}}天</div>
    <!--   <van-cell title="选择单个日期" :value="startdate" @click="show = true" /> -->

    <!--  <van-cell title="结束时间" :value="enddate" @click="show = true" /> -->

    <!--     <van-cell-group style="margin-bottom:0.6rem;">
      <van-field
        label="开始时间"
        :placeholder="startdate"
        input-align="right"
        label-align="left"
        label-width="84px"
        size="large"
        right-icon="arrow"
        disabled
        required
        @click="show1 = true"
      />
      <van-calendar v-model="show1" @confirm="onConfirm1" />
      <van-field
        label="结束时间"
        :placeholder="enddate"
        input-align="right"
        label-align="left"
        label-width="84px"
        size="large"
        right-icon="arrow"
        disabled
        required
        @click="show = true"
    />-->
    <van-field
      label="开始时间"
      :placeholder="enddate"
      is-link
      :value-class="className"
      :value="startTime"
      input-align="right"
      label-align="left"
      label-width="84px"
      size="large"
      disabled
      required
      @click="showPopup1"
    />
    <van-popup v-model="show1" position="bottom">
      <van-datetime-picker
        v-model="currentDate1"
        type="datetime"
        title="选择时间"
        :loading="isLoadingShow"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter1"
        @cancel="show1 = false"
        @confirm="confirmPicker1"
      />
    </van-popup>
    <van-field
      label="结束时间"
      :placeholder="enddate"
      is-link
      :value-class="className"
      :value="endTime"
      input-align="right"
      label-align="left"
      label-width="84px"
      size="large"
      disabled
      required
      @click="showPopup"
    />
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择时间"
        :loading="isLoadingShow"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="show = false"
        @confirm="confirmPicker"
      />
    </van-popup>

    <van-field
      v-model="days"
      type="textarea"
      label="时长(天)"
      placeholder="请输入请假天数"
      input-align="right"
      label-align="left"
      label-width="77px"
      size="large"
      required
    />

    <!--  <div class="list-text">{{dateLong}}</div> -->
    <van-cell-group>
      <van-field label="请假事由" label-align="left" label-width="84px" disabled required size="large" />
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="150"
        placeholder="请输入请假事由"
        show-word-limit
        size="large"
        style="margin-bottom:0.6rem"
      />
    </van-cell-group>
    <van-cell-group style="height:140px;">
      <van-field
        v-model="password"
        label="附件"
        size="large"
        style="border:none;margin-bottom:0.4rem"
        label-align="left"
        label-width="60px"
      />
      <van-uploader style="float:left;margin-left:0.6rem;" v-model="fileList" multiple />
    </van-cell-group>

    <div class="anniu" @click="postData">
      <p>提交</p>
      <loading v-if="loading" ref="loading"></loading>
    </div>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";
import { formatDate } from "./Home/js/format.js";
import loading from "../components/loading/Loading.vue";
export default {
  name: "HelloWorld",
  components: {
    loading
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      isLoadingShow: true,
      password: "",
      hdYear: "",
      leaveYear: "",
      username: "",
      currentTime: "12:00",
      message: "",
      colovalue: "",
      value: "",
      value1: "",
      hdYear: "",
      endtime: "",
      business: "",
      startdate: "",
      enddate: "",
      show: false,
      show1: false,
      showPicker: false,
      endTime: "请选择时间",
      startTime: "请选择时间",
      className: "",
      days: "",
      loading: false,

      columns: [
        "年休假",
        "婚假",
        "产假",
        "护理假",
        "病假",
        "事假",
        "丧假",
        "出国假",
        "出境假"
      ],
      fileList: [
        /*  { url: "https://img.yzcdn.cn/vant/leaf.jpg" }, */
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      currentDate1: new Date()
    };
  },
  computed: {
    dateLong() {
      if (this.startTime && this.endTime) {
        let oDate1 = this.startTime.substring(0, 10).split("-");
        let oDate2 = this.endTime.substring(0, 10).split("-");
        let strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
        let strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
        // 判断时间的选择是否正确
        if (strDateE - strDateS < 0) {
          this.endTime = "";
          this.$refs.popup.show("时间选择错误");
        } else {
          let iDays = parseInt(
            Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24
          );
          return iDays + 1;
        }
      } else {
        return "";
      }
    }
  },
  methods: {
    showPopup() {
      this.show = true;
      this.isLoadingShow = true;
      setTimeout(() => {
        this.isLoadingShow = false;
      }, 500);
    },
    // 确认选择的时间
    confirmPicker(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let hour = val.getHours();
      let minute = val.getMinutes();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.className = "timeClass";
      this.endTime = `${year}-${month}-${day} ${hour}:${minute}`;
      this.show = false;
    },
    // 选项格式化函数
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      } else if (type === "second") {
        return `${value}秒`;
      }
      return value;
    },
    showPopup1() {
      this.show1 = true;
      this.isLoadingShow = true;
      setTimeout(() => {
        this.isLoadingShow = false;
      }, 500);
    },
    // 确认选择的时间
    confirmPicker1(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let hour = val.getHours();
      let minute = val.getMinutes();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.className = "timeClass";
      this.startTime = `${year}-${month}-${day} ${hour}:${minute}`;
      this.show1 = false;
    },
    // 选项格式化函数
    formatter1(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      } else if (type === "second") {
        return `${value}秒`;
      }
      return value1;
    },
    onConfirmtype(colovalue) {
      //Toast(`当前值：${colovalue}, 当前索引：${index}`);
      this.showPicker = false;
      this.colovalue = this.format(colovalue);
    },
    format(colovalue) {
      return `${colovalue}`;
    },
    onCancel() {
      Toast("取消");
    },

    /*     getStarttime() {
      const that = this;
      dd.ready(function() {
        dd.biz.calendar.chooseHalfDay({
          default: 1494415396228,
          //默认显示
          onSuccess: function(result) {
            //onSuccess将在点击完成之后回调
            //alert(JSON.stringify(result))

            that.value = result.chosen;
            // alert(that.value)
          },
          onFail: function(err) {}
        });
      });
    },
    getEndtime() {
      const that = this;
      console.log(1);
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
    }, */
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
    postData() {
      var c = this.days;
      var d = this.message;
      var a = new Date(this.endTime).getTime();
      var b = new Date(this.startTime).getTime();
      if (d === "" || c === "" || a === "" || b === "") {
        alert("必填项不能为空");
      } else if (a < b) {
        alert("开始时间需要小于结束时间");
      } else {
        this.loading = true;
        this.axios({
          method: "post",
          url: "/js/a/ams/takeleave/takeLeave/saveLeave",
          params: {
            leaveType: this.colovalue,
            startTime: this.startTime,
            endTime: this.endTime,
            reason: this.message,
            annualLeaveRemaining: this.leaveYear,
            annualLeaveTotal: this.hdYear,
            leaveDays: this.days
          }
        })
          .then(res => {
            console.log("postData:执行完毕");
            this.loading = false;
            alert("提交成功");
            this.$router.push({ name: "list" });
          })
          .catch(e => {
            alert("获取信息失败");
          });
      }
    },
    getHdyear() {
      this.axios({
        method: "get",
        url: "/js/a/ams/takeleave/takeLeave/annualLeave"
      }).then(res => {
        console.log(res.data);
        this.hdYear = res.data.annualLeaveTotal;

        this.leaveYear = res.data.annualLeaveRemaining;
        console.log(this.leaveYear);
      });
    }
  },
  created() {
    this.getHdyear();
  },
  filters: {
    formatDate(time) {
      time = time * 1000;
      let date = new Date(time);
      console.log(new Date(time));
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.anniu {
  width: 14rem;
  border-radius: 8px;
  background: #3370e0;
  color: white;
  text-align: center;
  line-height: 1.6rem;
  height: 1.6rem;
  margin: 0 auto;
  font-size: 0.8rem;
  margin-top: 30px;
}
</style>
