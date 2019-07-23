import Vue from 'vue';
import Router from 'vue-router';
import tab from 'components/tab';
import Login from  '@/pages/login/Login';
import Layout from  '@/pages/layout/Layout';
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name:'login',
      component: Login,
    },
    {
      path: '/',
      name:'layout',
      component: Layout,
      redirect: '/login',
      hidden: true
    },
    {
      path: '/dashboard',
      component: Layout,
      children: [{
        path: 'index',
        name:'Index',
        meta: { title: '首页', url: '/dashboard/index' },
        component: () => import('@/pages/index/Index'),
      }]
    },
    {
      path: '/nav',
      component: Layout,
      children: [{
        path: 'nav1',
        name:'Nav1',
        meta: { title: '修改活动', url: '/nav/nav1' },
        component: () => import('@/pages/nav1/Nav1'),
      }]
    }
  ]
})
