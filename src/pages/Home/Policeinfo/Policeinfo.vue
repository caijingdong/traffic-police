<template>
  <div class="police">
      <div class="title">辅警信息</div>
      <div class="police-list">
          <ul class="item-list">
              <li @click="$router.push({ name: 'Baseinfo' })">辅警小张<span><img style="display:block;" src="../assets/row.png" alt /></span></li>
              <li>里里阿达<span><img style="display:block;" src="../assets/row.png" alt /></span></li>
              <li>里里阿达<span><img style="display:block;" src="../assets/row.png" alt /></span></li>
          </ul>
      </div>


  </div>
</template>
<script>
import qs from "qs";
import { formatDate } from "../js/format.js";
export default {
  name: "HelloWorld",
  data() {
    return {

    };
  },
  methods: {
   
  },
  created() {

    
  },
  mounted() {},
  filters: {
    // 版本号显示12位，超过12位显示...
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(12, 30) + "...";
      }
      return value;
    },
    ellipsis1: function(value) {
      if (!value) return "";
      if (value.length > 10) {
        return value.slice(0, 10);
      }
      return value;
    },
    formatDate(time) {
      //time = time * 1000;
      let date = new Date(time);
      //console.log(new Date(time));
      return formatDate(date, "yyyy-MM-dd ");
    }
  },

  computed: {
    reversedMessage: function() {
      // `this` 指向 vm 实例
      return this.office.officeName;
      /*       const arr = this.code.filter(item => {
        if(this.lists.politicsStatusKey == item.dictValue) {
          return item
        }
      }) */
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.police{
    .title{
        width:100%;
        height:1.8rem;
        background-color: #3270e1;
        color:white;
        text-align: center;
        line-height: 1.8rem;
        font-size:0.8rem;
    }
    .police-list{
        ul{
            li{
                height:2rem;
                line-height:2rem;
                font-size:0.7rem;
                padding-left:0.6rem;
                border-bottom: 1px solid #ebebeb;
                color:black;
                span{
                    float:right;
                    width:0.3rem;
                    padding-right:0.6rem;
                    margin-top:0.8rem;
                    img{
                        display:block;
                        width:100%;
                    }
                }
            }
        }
    }
}

</style>