import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Home from '@/views/Home'
import Charts from '@/views/charts/Charts'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: 'NotFound',
      hidden: true
    },
    {
      path: '/home',
      component: Home,
      name: '主页'
    },
    {
      path: '/',
      component: Home,
      name: '图表',
      iconCls: 'fa fa-bar-chart',
      children: [{
        path: '/charts',
        component: Charts,
        name: 'Charts'
      }]
    },
    {
      path: '*',
      redirect: {
        path: '/404'
      },
      hidden: true
    }
  ]
})
