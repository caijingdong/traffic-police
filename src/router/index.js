import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import list from '@/pages/list'
import Home from '@/pages/Home/Home'
import Person from '@/pages/Person/Person'
import Login from '@/pages/Person/Login'
import Layout from '@/pages/Person/Layout'
import Baseinfo from '@/pages/Home/Baseinfo/Baseinfo'
import Endyear from '@/pages/Home/Endyear/Endyear'
import Search from '@/pages/Home/Search/Search'
import Wages from '@/pages/Home/Wages/Wages'
import Qingwu from '@/pages/Home/Qingwu/Qingwu'
import Leave from '@/pages/Home/Leave/Leave'
import Khqk from '@/pages/Home/Khqk/Khqk'

Vue.use(Router)

export default new Router({
  routes: [
    /* {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }, */
    {
      path: '/',
      redirect:'/Login',
      component: Login,
      meta:{
        index:0,
        showFooter:true
      }
    },
    {
      path: '/Home',
      component: Home,
      name: 'Home',
      meta:{
        index:0,
        showFooter:true
      },
     
      
    },
    {
      path: '/Person',
      component: Person,
      name: 'Person',
      meta:{
        index:0,
        showFooter:true
      }
    },
    {
      path: '/Baseinfo',
      component: Baseinfo,
      name: 'Baseinfo',
      
    },
    {
      path: '/Wages',
      component: Wages,
      name: 'Wages',
      
    },
    {
      path: '/Endyear',
      component: Endyear,
      name: 'Endyear',
      
    },
    {
      path: '/Search',
      component: Search,
      name: 'Search',
      
    },
    {
      path: '/Qingwu',
      component: Qingwu,
      name: 'Qingwu',
      
    },
    {
      path: '/Leave',
      component: Leave,
      name: 'Leave',
      children: [{
        path: 'HelloWorld',
        component:HelloWorld,
        name: 'HelloWorld',
        meta:{
          index:0,
          showFooter1:true
        }
      }, {
        path: 'list',
        component:list,
        name: 'list',
        meta:{
          index:0,
          showFooter1:true
        }
      }]
      
      
    },
    {
      path: '/Khqk',
      component: Khqk,
      name: 'Khqk',
      
    },
    {
      path: '/Login',
      component: Login,
      name: 'Login',
      
    },
    {
      path: '/Layout',
      component: Layout,
      name: 'Layout',
      
    },

  ]
})