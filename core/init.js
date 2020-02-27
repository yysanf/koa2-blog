const Router = require('koa-router')
const path = require('path')
const fs = require('fs')

class InitManager {
  static initCore(app) {
    this.initRoutes(app)
    this.loadHttpException()
  }
  // 加载路由
  static initRoutes(app) {
    const routePath = path.join(__dirname, '..', '/routes')
    const files = fs.readdirSync(routePath)
    files.forEach(file => {
      if (/\.js$/.test(file)) {
        const router = require(path.join(routePath, file))
        if (router instanceof Router) {
          app.use(router.routes(), router.allowedMethods())
        }
      }
    })
  }
  // 加载异常
  static loadHttpException() {
    const errors = require('../lib/http-exception')
    global.errs = errors
  }
}

module.exports = InitManager
