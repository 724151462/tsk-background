import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import Cookie from 'js-cookie'
import MenuUtils from '@/utils/MenuUtils'
Vue.use(ElementUI)

Vue.prototype.loadingCss = {
  lock: true,
  text: 'loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
};
Vue.config.productionTip = false
window.STOMP_CLIENT = ''
var routeList = []
let data = JSON.parse(localStorage.getItem('menuList'))
if (data){
  //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
  let routes = MenuUtils(data)
  // console.log(routes)
  router.addRoutes(routes)
  if(localStorage.getItem('isLoadNodes')) {
    store.commit('setAllMenu', routes)
  }
  localStorage.removeItem('isLoadNodes')
}
router.beforeEach((to, from, next) => {

  var index = routeList.indexOf(to.name)
  if (index !== -1) {
    //如果存在路由列表，则把之后的路由都删掉
    routeList.splice(index + 1, routeList.length - index - 1)
  } else {
    routeList.push(to.name)
    next()
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  // console.log(from.path)
  if(Cookie.get('BackstageToken')){
    if(to.path == "/login" || to.path == "/"){
      localStorage.setItem('isLoadNodes', 'true')
      next({
        path:'/course/list'
      });
    }else {
      next();
    }
  }else{
    if(to.path == "/login"){
      next()
    }else {
      next({
        path:'/login'
      });
    }
  }
})

const Globe_VM = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default Globe_VM

if(process.env.NODE_ENV === "development"){
  //开发测试
  // window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
  //   console.log("开发环境：错误信息：" +errorMessage+";出错文件："+scriptURI+";出错行号："+lineNumber);
  //   new Error(errorObj);
  // }
}
