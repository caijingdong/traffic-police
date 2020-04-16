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
      <van-tab title="工资详情">
        <van-tabs v-model="activeName" color="#3270e1" sticky>
          <van-tab
            class="list"
            :name="item.c"
            v-for="(item,indexs) in doc"
            :title="item.officeMonthlySalary.month"
            :key="indexs"
          >
            <li class="listxx">
             工资
              <span>{{item.salary}}</span>
            </li>
            
          </van-tab>
        </van-tabs>
       
    
      </van-tab>
    </van-tabs>
    <p>{{doc.id}}</p> 
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
      doc:"",
      //id:this.$route.params.id,
      newslist: {},
      lists: [],

     
     
    };
  },
  methods: {
    getinfo() {
      this.axios({
        method: "get",
        url: "/js/a/ams/personnelfile/personnelFile/getCurrentUserPersonnelFile"
      })
        .then(res => {
          if (res.data.code == "0000") {
            let doc = res.data.data.personnelMonthlySalaries;            
            this.doc =  doc;            
          } else {
            alert("1111");
          }
        })
        .catch(e => {
          alert("获取信息失败");
        });
    },
    getin(){
      
      this.doc = this.doc;
      console.log(this.doc)

    },
  },
  created() {
   this.getinfo();
   this.getin()
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
