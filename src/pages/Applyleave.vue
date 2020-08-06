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
        @click="getBusiness"
      />
    </van-cell-group>
    <div
      style="font-size:0.4rem;text-align:left;height:1.2rem;;line-height:1.2rem;padding-left:0.4rem"
    >剩余时间：{{leaveYear}}天</div>
    <van-cell-group style="margin-bottom:0.6rem;">
      <van-field
        required
        clearable
        label="开始时间"
        :placeholder="startTime"
        input-align="right"
        label-align="left"
        size="large"
        disabled
        right-icon="arrow"
        label-width="84px"
        @click="getStarttime"
      />
      <van-field
        type="password"
        label="结束时间"
        :placeholder="endTime"
        input-align="right"
        label-align="left"
        label-width="84px"
        size="large"
        right-icon="arrow"
        disabled
        required
        @click="getEndtime"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="days"
        type="number"
        label="时长(天)"
        placeholder="请输入请假天数"
        input-align="right"
        label-align="left"
        label-width="80px"
        size="large"
        required
      />
    </van-cell-group>
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
    <van-cell-group style="display:block;margin-bottom:2rem;">
      <van-field
        label="附件"
        size="large"
        style="border:none;margin-bottom:0.4rem"
        label-align="left"
        @click="getLeave"
      />

      <van-uploader
        style="margin-left:14px"
        multiple
        v-model="fileList"
        :after-read="afterRead"
        :max-count="countIndex"
        :max-size="10000 * 1024"
        @oversize="onOversize"
      />
    </van-cell-group>
    <div class="anniu" @click="postData">
      <p>提交{{getLeave}}</p>
    </div>
    <loading v-show="loading" ref="loading"></loading>
  </div>
</template>

<script>
import * as dd from "dingtalk-jsapi";
import axios from "axios";
import { Toast } from "vant";
import { formatDate } from "./Home/js/format.js";
import { getLeave ,daysBetween,gDate} from "./Home/js/apply.js";
import loading from "../components/loading/Loading.vue";
export default {
  name: "Applyleave",
  components: {
    loading,
  },
  data() {
    return {
      formData: {
        leaveType: null,
        startTime: null,
        endTime: null,
        message: [],
        annualLeaveRemaining: null,
        leaveDays: null,
        file: null,
      },
      config: "",
      isLoadingShow: true,
      hdYear: "",
      leaveYear: "",
      message: "",
      colovalue: "",
      value: "",
      value1: "",
      hdYear: "",
      business: "",
      endTime: "请选择时间",
      startTime: "请选择时间",
      className: "",
      days: "",
      loading: false,
      pictures: "",
      fileList: [],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      currentDate1: new Date(),
      imageData: [], // 准备保存的图片列表
      countIndex: 9, // 可选图片剩余的数量
      datas: {},
      files: [],
      params: "",
    };
  },
  watch: {
    /*     startTime(value) {
      if (this.endTime !== '请选择时间') {
        let day = Date.parse(this.endTime) - Date.parse(value)
        day = Math.floor(day / 24 / 60 / 60 / 1000) * 100 / 100
        this.days = day
      }
    },
    endTime(value) {
       if (this.startTime !== '请选择时间') {
        let day = Date.parse(value ) - Date.parse(this.startTime)
        day = Math.floor(day / 24 / 60 / 60 / 1000) * 100 / 100
        this.days = day
      }
    } */
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
        } else if (
          this.startTime == "请选择时间" ||
          this.endTime == "请选择时间"
        ) {
          return "请输入请假天数";
        } else {
          let iDays = parseInt(
            Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24
          );
          return iDays + 1;
          console.log("计算成功");
        }
      } else {
        return "";
      }
    },

  },
  methods: {
    onOversize(file) {
      console.log(file);
      Toast("文件大小不能超过 10M");
    },
    afterRead(file, detail) {
      // 此时可以自行将文件上传至服务器
      // 1.先判断是否是单个对象
      // 2.否则就是数组，需要遍历进行转换，再上传（当然，如果你们接口支持同时传多个到服务器，就需要对后面的逻辑进行修改）
      const { files } = this;
      files.concat(file);
      const arr = [].concat(files, file);
      this.files = arr;
      let tableParams = {
        leaveType: this.colovalue,
        startTime: this.startTime,
        endTime: this.endTime,
        reason: this.message,
        annualLeaveRemaining: this.leaveYear,
        annualLeaveTotal: this.hdYear,
        leaveDays: this.days,
        haYear: this.hdYear,
      };
      let config = null;
      let datas = null;
      //处理文件上传的参数
      if (file !== null) {
        //file如果上传文件了，就不手动输入名单了
        let formData = new FormData();
        formData.append("leaveType", this.colovalue);
        formData.append("startTime", this.startTime);
        formData.append("endTime", this.endTime);
        formData.append("remarks", this.message);
        formData.append("annualLeaveRemaining", this.leaveYear);
        formData.append("leaveDays", this.days);
        formData.append("hdYear", this.hdYear);
        for (const item of arr) {
          formData.append("file", item.file);
        }
        // formData.append(formdata);
        // console.log(formData.get("leaveType"));
        console.log(formData.get("file"));
        this.datas = formData;
        //console.log("datas:" + this.datas);
        config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        this.config = config;
      } else {
        this.datas = tableParams;
        this.datas = Qs.stringify(datas);
        config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }; //处理参数
        this.config = config;
      }
    },
    getBusiness() {
      const that = this;
      dd.ready(function () {
        dd.biz.util.chosen({
          source: [
            {
              key: "年休假", //显示文本
              value: "123", //值，
            },
            {
              key: "病假", //显示文本
              value: "123", //值，
            },
            {
              key: "事假",
              value: "234",
            },
            {
              key: "婚假",
              value: "234",
            },
            {
              key: "产假",
              value: "234",
            },
            {
              key: "护理假", //显示文本
              value: "123", //值，
            },
            {
              key: "丧假",
              value: "234",
            },
          ],
          selectedKey: "年休假",

          onSuccess: function (result) {
            that.colovalue = result.key;
          },
          onFail: function (err) {},
        });
      });
    },

    getStarttime() {
      const that = this;
      var aData = new Date();
      var value1 =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate() +
        " " +
        aData.getHours() +
        ":" +
        aData.getMinutes();
      dd.ready(function () {
        dd.biz.util.datetimepicker({
          format: "yyyy-MM-dd HH:mm",
          value: value1,
          //默认显示
          onSuccess: function (result) {
            that.startTime = result.value;
            // alert(that.value)
          },
          onFail: function (err) {},
        });
      });
    },
    getEndtime() {
      const that = this;
      var aData = new Date();
      var value2 =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate() +
        " " +
        aData.getHours() +
        ":" +
        aData.getMinutes();
      dd.ready(function () {
        dd.biz.util.datetimepicker({
          format: "yyyy-MM-dd HH:mm",
          value: value2, //默认显示
          onSuccess: function (result) {
            //onSuccess将在点击完成之后回调
            //alert(JSON.stringify(result))

            that.endTime = result.value;
            //alert(that.value)
          },
          onFail: function (err) {},
        });
      });
    },

    getType() {
      dd.ready(function () {
        dd.biz.calendar.chooseInterval({
          defaultStart: 1494415396228,
          defaultEnd: 1494415396228,
          onSuccess: function (result) {
            //onSuccess将在点击确定之后回调
            /*{
            start: 1514908800000,
            end: 1514995200000,
            timezone:8
        }
        */
          },
          onFail: function (err) {},
        });
      });
    },

    postData() {
      var a = new Date(this.endTime).getTime();
      var b = new Date(this.startTime).getTime();
      var h = this.startTime;
      var f = this.endTime;
      var c = this.days;
      var d = this.message;
      var e = this.colovalue;
      let formData = new FormData();
      formData.append("leaveType", this.colovalue);
      formData.append("startTime", this.startTime);
      formData.append("endTime", this.endTime);
      formData.append("remarks", this.message);
      formData.append("annualLeaveRemaining", this.leaveYear);
      formData.append("leaveDays", this.days);
      formData.append("hdYear", this.hdYear);
      this.params = formData;
      /*  if (d === "" || c === "" || a === "" || b === "" || e === "") {
        alert("必填项不能为空");
      } else */

      if (e === "") {
        this.$toast("请假类型不能为空");
      } else if (h === "请选择时间" || f === "请选择时间") {
        this.$toast("请选择开始时间或结束时间");
      } else if (c === "") {
        this.$toast("请假天数不能为空");
      } else if (d === "") {
        this.$toast("请假事由不能为空");
      } else if (a < b) {
        this.$toast("开始时间需要小于结束时间");
      } else if (this.files.length == 0) {
        this.axios({
          method: "post",
          url: "/js/a/ams/takeleave/takeLeave/saveLeave",
          data: this.params,
          // config:this.config
        })
          .then((res) => {
            this.loading = false;
            if (res.status == 200) {
              this.$toast("提交成功");
              this.$router.push({ name: "Leavelist" });
            } else {
              this.$toast("请假失败" + JSON.stringify(res.message));
            }
          })
          .catch((e) => {
            this.$toast("请假失败" + JSON.stringify(e));
            // console.log("error", e);
          });
      } else {
        this.loading = true;
        this.axios({
          method: "post",
          url: "/js/a/ams/takeleave/takeLeave/saveLeave",
          data: this.datas,
        })
          .then((res) => {
            //console.log("sucess", res);
            this.loading = false;
            if (res.status == 200) {
              this.$toast("提交成功");
              this.$router.push({ name: "Leavelist" });
            } else {
              this.$toast("请假失败" + JSON.stringify(res.message));
            }
          })
          .catch((e) => {
            this.$toast("请假失败" + JSON.stringify(e));
            //console.log("error", e);
          });
      }
    },
    getHdyear() {
      this.axios({
        method: "get",
        url: "/js/a/ams/takeleave/takeLeave/annualLeave",
      }).then((res) => {
        this.hdYear = res.data.annualLeaveTotal;
        this.leaveYear = res.data.annualLeaveRemaining;
      });
    },
      getLeave() {         
      var startTime = this.startTime.replace(/-/g, "/");
      var beginArr = startTime.split(" ");

      var beginMonth = parseInt(beginArr[0].split("/")[1]);
      //console.log(beginMonth)
      var beginDay = parseInt(beginArr[0].split("/")[2]);
      var beginHours = parseInt(beginArr[1].split(":")[0]);
      var beginMin = parseInt(beginArr[1].split(":")[1]);
      var beginHoursMin = beginHours + beginMin / 60;
      //console.log(beginHoursMin)
      var endTime = this.endTime.replace(/-/g, "/");
      var endArr = endTime.split(" ");
      var endMonth = parseInt(endArr[0].split("/")[1]);
      var endDay = parseInt(endArr[0].split("/")[2]);
      var endHours = parseInt(endArr[1].split(":")[0]);
      var endMin = parseInt(endArr[1].split(":")[1]);
      var endHoursMin = endHours + endMin / 60;
      console.log(endHoursMin)
      //如果beginHoursMin时间小于上班时间都算上班时间
      var stWorkTime = 8.5
      var enWrokTime = 17.5
      var freeTimeMon = 11.5
      var freeTimeAft = 14
	if(beginHoursMin <= stWorkTime) {
		beginHoursMin = stWorkTime;
	}
	//如果endHoursMin时间大于上班时间都算下班时间
	if(endHoursMin >= enWrokTime) {
		endHoursMin = enWrokTime;
	}
	//如果endHoursMin时间小于上班时间都算下班时间
	if(endHoursMin <= stWorkTime) {
		endHoursMin = stWorkTime;
	}
  //如果结束时间在freeTimeMon和freeTimeAft之间都算freeTimeMon
  var isFreeTime = true;
	if(isFreeTime == true) {
		if(endHoursMin >= freeTimeMon && endHoursMin <= freeTimeAft) {
			endHoursMin = freeTimeMon;
		}
  }
  var daysBetweenlist = daysBetween(startTime, endTime);
	let effectiveLeaveDate = daysBetweenlist.filter(date => !fillterDatas.includes(date)).filter(date => (new Date(date).getDay() != 6 && new Date(date).getDay() != 0))
	console.log("有效的请假日期数组【过滤节假日期后的】", effectiveLeaveDate)
	if(startTime > endTime){
		Vue.prototype.$Message.warning({
                content: '开始时间需小于结束时间',
                duration: 3
            });
		return false;
	}
	
	if(!effectiveLeaveDate.includes(startTime.split(' ')[0]) || !effectiveLeaveDate.includes(endTime.split(' ')[0])){
		//如果开始或者结束时间不在工作日提醒重新选择
		Vue.prototype.$Message.warning({
                content: '调休开始、结束时间需在工作日，请您重新选择',
                duration: 3
            });
		return false;
	}

      //如果beginHoursMin时间小于上班时间都算上班时间
    },
  },
  created() {
    this.getHdyear();
    //this.getLeave()
  },
  filters: {
    formatDate(time) {
      time = time * 1000;
      let date = new Date(time);
      console.log(new Date(time));
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin-bottom: 100px;
}
.anniu {
  width: 14rem;
  border-radius: 8px;
  background: #3370e0;
  color: white;
  text-align: center;
  line-height: 1.6rem;
  height: 1.6rem;
  font-size: 0.8rem;
  margin: 0 auto;
}
</style>
