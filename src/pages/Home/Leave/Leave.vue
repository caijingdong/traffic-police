<template>
  <div class="leave">
    <router-view></router-view>
    <LeaveGuider v-show="$route.meta.showFooter1" />
  </div>
</template>
<script>
import LeaveGuider from "@/components/FooterGuider/LeaveGuider.vue";
import Applyleave from "@/pages/Applyleave.vue";
export default {
  name: "bottom",
  data() {
    return {
      active: 0,
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
      }
    };
  },
  methods: {
    clickItem: function(path) {
      this.$router.push(path);
    }
  },
  components: {
    LeaveGuider,
    HelloWorld
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom {
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #f5f5f5;
  background-color: #fff;
  width: 14rem;
  height: 60px;
}
.item {
  margin: 5px 20px;
  float: left;
}
.item p {
  margin: 0;
  font-size: 15px;
}
.active {
  color: #3a8ee7;
}
</style>
