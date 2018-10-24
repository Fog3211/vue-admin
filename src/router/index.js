import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/404'
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
      path: '/404',
      component: NotFound,
      name: 'NotFound',
    },
    {
      path: '/home',
      component: Home,
      name: '主页'
    },
    {
      path: '/test',
      component: Test,
      name: 'Test'
    },
    {
      path: '*',
      redirect: {
        path: '/404'
      }
    }
  ]
})
