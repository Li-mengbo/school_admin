import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 路由跳转进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './index.css';
import router from './router/router';
import store from './store';

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})

console.log(process.env.BASE_API)
