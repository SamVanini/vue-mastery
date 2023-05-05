import Vue from 'vue'
import VueRouter from 'vue-router' //include the VueRouter library
import { routes } from './routes'
import NProgress from 'nprogress'

//The components used by this file are stored in the views folder
Vue.use(VueRouter) //Here VueRouter is used

//mode: history removes #
const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
