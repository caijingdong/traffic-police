import Vue from 'vue'
import vConsole from 'vconsole'
import './vant/index';
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  Vue.use(new vConsole());
}
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
//axios.defaults.baseURL = '' 
axios.defaults.baseURL = 'http://192.168.1.243:8080'
//Vue.axios.options.emulateJSON = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true //让ajax携带cookie
//import VueAxios from 'vue-axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
