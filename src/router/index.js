import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Header from '@/views/layout/header.vue'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)


export const constantRouterMap = [
  {
    path: '/',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true
  },
  {
    path: '*',
    component: _import('errorPage/404'),
  },
  {
    path: '/course',    // 访问路径
    component: Header,  // 组件
    name: '课程中心',    // 页面名称
    level: 1,           // 路由等级，用来判断是否是头部（一级）导航
    menuShow: true,     // 是否显示于侧边栏
    // type: 'courseCenter',
    redirect: '/course/list', // 重定向
    children: [{        // 子路由
        path: '/course/list',
        component: Layout,
        name: '课程列表',
        isLeaf: true,
        menuShow: true,
        children: [{
          path: '/course/list',
          component: _import('course/list'),
          name: '课程列表',
          meta:{
            father: '课程中心'
          }
        }]
      }
    ]
  },
  {
    path: '/zixun',
    component: Header,
    name: '资讯中心',
    level: 1,
    menuShow: true,
    redirect: '/zixun/trends',
    children: [{
      path: '/zixun/trends',
      // leaf: true,
      component: Layout,
      name: '资讯管理',
      menuShow: true,
      children: [{
          path: '/zixun/trends',
          leaf: true,
          component: _import('zixun/trends'),
          name: '动态',
          menuShow: true,
        }
      ]
    }]
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})

