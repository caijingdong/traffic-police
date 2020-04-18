<template>
  <div class="content" ref="loginForm">
    <div class="logo">
      欢迎使用交通管理局
      <div class="clearfix"></div>
    </div>
    <div class="smwz">
      备注备注备注备注备注
      <div class="clearfix"></div>
    </div>
    <div class="longin-boder">
      <input name="username" class="input" type="text" v-model="username" placeholder="输入用户名" />
    </div>

    <div class="longin-boder">
      <div class="image"></div>
      <input name="password" class="input" type="password" v-model="password" placeholder="输入密码" />
    </div>
    <!--End密码输入框-->
    <div class="button" @click.prevent="login">登录</div>

    <div class="footer" @click.prevent="noLogin">
      钉钉免登
      <img class="jiantou" src="./images/jiantou.png" alt />
    </div>
    <div class="zc">技术支持：温州市交通管理局</div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import qs from "qs";
import axios from "axios";
import { MY_POST_QUERY, MY_GET, MY_POST_DATA } from "./api/api";
import { des } from "./des";
import * as dd from "dingtalk-jsapi";
export default {
  name: "sousuo",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length < 1) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.trim().length < 1) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      username: "",
      password: "",
      loginRules: {
        name: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        passwrd: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      userToken: "",
      code: "",
      loading: false
    };
  },
  created() {},
  methods: {
    ...mapMutations(["changeLogin"]),
    noLogin(url) {
      let vm = this;
      dd.ready(function() {
        dd.runtime.permission.requestAuthCode({
          corpId: "ding3b87191431b1e7eb35c2f4657eb6378f",
          // 企业id
          onSuccess: function(info) {
            // 如果返回 Success
            // 将返回的校验码传给 /m/loginDingDing
            let code = qs.stringify(info);
            MY_POST_DATA("/js/dingding/login", code)
              .then(res => {
                console.log(res.data);
                if (res.data.code == "0000") {
                  vm.$router.push("/Person");
                  alert("登录成功");
                  vm.$store.state.showname = false;
                } else {
                 alert("1111")
                }
              })
              .catch(e => {
                vm.$message.error("免登失败，请联系管理员");
              });
          },
          onFail: function(err) {
            console.log(err);
            alert('user.get fail: ' + JSON.stringify(err))
          }
        });
      });
    },
    login() {
      /**
       * 用户名、密码登录
       */
      if ((this.checked = true)) {
        //传入账号名，密码，和保存天数3个参数
        this.setCookie(this.username, this.password, 17);
      }
      /*       if (this.username === "" || this.password === "") {
        //alert("账号或密码不能为空");
      } */
      if (this.username === "" || this.password === "") {
        alert("密码输入错误");
      } else {
        var secretKey = "thinkgem,jeesite,com";
        var username = DesUtils.encode(this.username, secretKey);
        var password = DesUtils.encode(this.password, secretKey);
        let params = {};
        params.username = username;
        params.password = password;
        /* MY_POST_QUERY("/js/a/login", params) */
        this.axios({
          method: "post",
          url: "/js/a/login",
          params
        })
          .then(res => {
            const data = res.data;
            if (data.result == "true") {
              // this.$store.state.userInfo = data.data;
              this.$store.commit("login");
              this.$store.state.isLogin = true;
              this.$router.push("/Home");
              //console.log(res.data)
            } else {
              alert("用户民或密码错误请重新输入");
            }
          })
          .catch(() => {
            alert("服务器报错");
          });
      }
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "username") {
            this.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "password") {
            this.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  },
  mounted() {
    this.getCookie();
    this.clearCookie();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content {
  .logo {
    //width: 400px;
    //margin: 0 auto;
    margin-top: 3.2rem;
    font-size: 1.2rem;
    text-align: left;
    color: black;
    font-weight: 900;
    margin-left: 1rem;
  }
  .smwz {
    font-size: 0.6rem;
    text-align: left;
    color: #999;
    margin-top: 0.2rem;
    margin-left: 1rem;
  }
  .longin-boder {
    width: 14rem;
    border-bottom: 1px solid #ececec;
    margin: 0 auto;
    margin-top: 2rem;
    height: 1.6rem;
    color: black;
    input {
      border: none;
      float: left;
      display: block;
      width: 14.2rem;
      font-size: 0.7rem;
      color: black;
    }
    input::-webkit-input-placeholder {
      color: #999;
    }
  }
  .button {
    width: 14.2rem;
    height: 1.8rem;
    background-color: #3586ff;
    margin: 0 auto;
    border-radius: 200px;
    line-height: 1.8rem;
    text-align: center;
    color: white;
    font-size: 0.7rem;
    margin-top: 2rem;
    //z-index: 1000;
  }
  .footer {
    width: 14rem;
    margin: 0 auto;
    color: black;
    font-size: 0.6rem;
    margin-top: 0.6rem;
    .jiantou {
      width: 0.6rem;
    }
  }
  .zc {
    width: 14rem;
    margin: 0 auto;
    color: #999;
    font-size: 0.6rem;
    margin-top: 4.4rem;
  }
}
</style>