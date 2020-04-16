// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vConsole from 'vconsole'
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  Vue.use(new vConsole());
}
import App from './App'
import router from './router'
import store from './store'
import { Cell, CellGroup } from 'vant';
import { Field } from 'vant';
import { Uploader } from 'vant';
import { Tab, Tabs } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { DatetimePicker } from 'vant';
import { Calendar } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Picker } from 'vant';
import { Popup } from 'vant';

Vue.use(Popup);

Vue.use(Picker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Calendar);
Vue.use(DatetimePicker);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Uploader);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);
import { Button } from 'vant';
Vue.use(Button);
//axios
import axios from 'axios'
// axios.defaults.baseURL = '/api'
//axios.defaults.baseURL = 'http://192.168.1.110:8080' 
axios.defaults.baseURL = 'http://192.168.1.7:8080'
//Vue.axios.options.emulateJSON = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true //让ajax携带cookie
//import VueAxios from 'vue-axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import { Switch } from 'vant';
Vue.use(Switch);
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
//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
