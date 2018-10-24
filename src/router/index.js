import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Test from '@/views/Test'
import Charts from '@/views/charts/Charts'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/home',
      component:Home,
      name:'主页'
    },
    {
      path:'/test',
      component:Test,
      name:'Test'
    },
    // {
    //   path: '/',
    //   component: Home,
    //   name: '导航四',
    //   iconCls: 'fa fa-bar-chart',
    //   children: [{
    //     path: '/charts',
    //     component: Charts,
    //     name: 'Charts'
    //   }]
    // },
  ]
})
