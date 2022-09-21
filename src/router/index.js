import Vue from 'vue'

import VueRouter from 'vue-router'
import routes from '@/router/router.js'

// 全局注册

Vue.use(VueRouter)

// 备份vuerouter原型对象上的push和replace方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const router = new VueRouter({
  routes
})

// 路由守卫
// router.beforeEach((to, from, next) => {
//   // const islogin = false
//   next()
// })
export default router
