import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Home from '@/views/Home'
import Manage from '@/views/Manage'
import Charts from '@/views/Charts'
import UserList from '@/views/UserList'
import Edit from '@/views/Edit'

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
      path: '/manage',
      component: Manage,
      name: '',
      children: [{
          path: '/',
          component: Home,
          meta: ['首页'],
        }, {
          path: '/userlist',
          component: UserList,
          meta: ['用户列表'],
        }, {
          path: '/edit',
          component: Edit,
          meta: ['编辑'],
        }, {
          path: '/charts',
          component: Charts,
          meta: ['图表'],
        }
      ]
    },
    // {
    //   path: '*',
    //   redirect: {
    //     path: '/404'
    //   },
    //   hidden: true
    // }
  ]
})
