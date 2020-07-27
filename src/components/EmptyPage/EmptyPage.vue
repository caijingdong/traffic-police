<template>
  <div id="main-wrap">
      <div class="img"><img style="display:block;" src="./empty.png" alt /></div>
      <div class="text"><p class="item-sj">暂无数据</p><p class="item-nr">没有搜到你想要的内容</p></div>
      
      

  </div>
</template>
 
<script>
export default {
  name: "EmptyPage",
  methods: {
    clickItem: function(path) {
      this.$router.push(path);
    }
  }
};
</script>
 
<style scoped lang="less">
p{
    margin:0;
    padding:0;
}
#main-wrap{
    margin-top:8rem;
    font-size:30px;
    color:black;
    .img{
        width:10rem;
        margin:0 auto;
        img{
            width:100%;
            display:block;
        }

    }
    .text{
        font-size:0.8rem;
        .item-sj{
            font-size:1rem;
            color:black;
            text-align:center;
            margin-bottom:0.5rem;
        }
        .item-nr{
            font-size:0.7rem;
            text-align:center;
            color:#999;
        }

    }
}

</style>

