<template>
  <div class="hello">
    <van-cell-group>
      <van-field
        v-model="username"
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
        v-model="username"
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
        v-model="username"
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
        label="时长(天)"
        placeholder="请输入请假天数"
        input-align="right"
        label-align="left"
        label-width="80px"
        size="large"
        required
      />
    </van-cell-group>
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
      <!--  <van-uploader style="float:left;margin-left:0.6rem;" v-model="fileList"  /> -->
       <van-uploader
        style="float:left;margin-left:0.6rem;"
        :multiple="true"
        v-model="fileList"
        :after-read="afterRead"
        :max-count="countIndex"
      />
<!--       <van-uploader
        style="float:left;margin-left:0.6rem;"
        :multiple="true"
        v-model="fileList"
        :max-count="countIndex"
        upload-text="上传文件"
        :after-read="afterRead"
      ></van-uploader> -->
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
      //endtime: "",
      business: "",
      startdate: "",
      enddate: "",
      //show: false,
      //show1: false,
      //showPicker: false,
      endTime: "请选择时间",
      startTime: "请选择时间",
      className: "",
      days: "",
      loading: false,
      pictures: "",
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
      currentDate1: new Date(),
      imageData: [], // 准备保存的图片列表
      countIndex: 9, // 可选图片剩余的数量
      datas: {}
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
    afterRead(file, detail) {
      //console.log(file)
      // 此时可以自行将文件上传至服务器
      // 1.先判断是否是单个对象
      // 2.否则就是数组，需要遍历进行转换，再上传（当然，如果你们接口支持同时传多个到服务器，就需要对后面的逻辑进行修改）
      let formData = new FormData();
      formData.append("leaveType", this.colovalue);
      formData.append("startTime", this.startTime);
      formData.append("endTime", this.endTime);
      formData.append("reason", this.message);
      formData.append("annualLeaveRemaining", this.leaveYear);
      formData.append("leaveDays", this.days);
      formData.append("file", file.file);
      console.log(formData.get("file"));
      this.datas = formData;
/*       if (!Array.isArray(file)) {
        this.uploadImgFun(file.content);
      } else {
        for (let i = 0; i < file.length; i++) {
          if (this.imageData.length + i >= this.countIndex) {
            Toast("最多上传9张图片");
            break;
          } else {
            this.uploadImgFun(file[i].content);
          }
        }
      } */
    },
    /* uploadImgFun(content) {
      //console.log(content)
      // 再做一次最大张数图片的判断，避免异步偷跑
      if (this.imageData.length >= 9) {
        Toast("最多上传9张图片");
        return;
      }
      // 创建表单数据格式，以表单的数据传递，对该表单进行添加参数
      let formData = new FormData();
      formData.append("leaveType", this.colovalue);
      formData.append("startTime", this.startTime);
      formData.append("endTime", this.endTime);
      formData.append("reason", this.message);
      formData.append("annualLeaveRemaining", this.leaveYear);
      formData.append("leaveDays", this.days);
      formData.append("file", this.dataURLtoFile(content, "file.jpg"));
      console.log(formData.get("file"));
      this.datas = formData;
      
    }, */
    // bae64转文件对象
    dataURLtoFile(dataurl, filename) {
      // 将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },

    getBusiness() {
      const that = this;
      dd.ready(function() {
        dd.biz.util.chosen({
          source: [
            {
              key: "年休假", //显示文本
              value: "123" //值，
            },
            {
              key: "婚假",
              value: "234"
            },
            {
              key: "产假",
              value: "234"
            },
            {
              key: "护理假", //显示文本
              value: "123" //值，
            },
            {
              key: "事假",
              value: "234"
            },
            {
              key: "丧假",
              value: "234"
            },
            {
              key: "出国假", //显示文本
              value: "123" //值，
            },
            {
              key: "出境假",
              value: "234"
            }
          ],
          selectedKey: "年休假",

          onSuccess: function(result) {
            that.colovalue = result.key;
            //that.value = result.value;
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

    getStarttime() {
      const that = this;
      dd.ready(function() {
        dd.biz.util.datetimepicker({
          format: "yyyy-MM-dd HH:mm",
          value: "2020-4-20 08:00",
          //默认显示
          onSuccess: function(result) {
            that.startTime = result.value;
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
          value: "2020-04-20 08:00", //默认显示
          onSuccess: function(result) {
            //onSuccess将在点击完成之后回调
            //alert(JSON.stringify(result))

            that.endTime = result.value;
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
    postData() {
      var c = this.days;
      var d = this.message;
      var e = this.colovalue;
      var a = new Date(this.endTime).getTime();
      var b = new Date(this.startTime).getTime();
      if (d === "" || c === "" || a === "" || b === "" || e === "") {
        alert("必填项不能为空");
      } else if (a < b) {
        alert("开始时间需要小于结束时间");
      } else {
        this.loading = true;
        //this.uploadImgFun();
        this.axios({
          method: "post",
          url: "/js/a/ams/takeleave/takeLeave/saveLeave",
          data: this.datas
          /*           params: {
            leaveType: this.colovalue,
            startTime: this.startTime,
            endTime: this.endTime,
            reason: this.message,
            annualLeaveRemaining: this.leaveYear,
            annualLeaveTotal: this.hdYear,
            leaveDays: this.days,
           // datas:this.datas
          }  */
        })
          .then(res => {
            if (res.status == 200) {
              this.loading = false;
              this.$toast("提交成功");
              this.$router.push({ name: "list" });
            } else {
              this.$toast("请假失败" + JSON.stringify(res.message));
              this.loading = false;
            }
          })
          .catch(e => {
            this.$toast("请假失败" + JSON.stringify(e));
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
