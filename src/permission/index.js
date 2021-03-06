// 此文件用于处理路由权限问题
import router from '@/router'

// 引入进度条包和样式文件
import progress from 'nprogress'
import 'nprogress/nprogress.css'

// 注册全局前置守卫
router.beforeEach(function (to, from, next) {
  // 开启进度条***********
  progress.start()
  // next() 没有参数的情况表示放过,
  // 三种情况
  // 为false表示当前跳转被停止了
  // 为新地址改变原来轨迹,去一个新地方
  // 判断要拦截哪些页面 to是对象 starWith以..为开头
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      // 若携带token ,放行
      next()
    } else {
      // 未携带,退回到登录页
      next('/login')
    }
  } else {
    next()
  }
})

// 在后置守卫的位置关闭
router.afterEach(() => {
  // 关闭进度条
  progress.done()
})
