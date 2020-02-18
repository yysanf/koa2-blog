const { HttpException } = require('../lib/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 开发环境
    const isHttpException = error instanceof HttpException

    // 生成环境
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.response.status = error.code
    } else {
      ctx.body = {
        msg: '未知错误！',
        error_code: 9999,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.response.status = 500
      throw error
    }
  }
}

module.exports = catchError
