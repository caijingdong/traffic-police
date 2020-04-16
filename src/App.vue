<template>
  <div id="app">
    <router-view />
    <FooterGuider v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuider from "./components/FooterGuider/FooterGuider.vue";
export default {
  name: "App",
  components: {
    FooterGuider
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #bdbdbd;
  width: 100%;
  height: 100%;
}
</style>
