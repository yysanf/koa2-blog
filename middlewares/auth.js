const { verifyToken } = require('../core/token')

class Auth {
  constructor(level) {
    this.level = level || 1
  }

  get jwt() {
    return async (ctx, next) => {
      const token = ctx.request.header.authorization
      if (!token) {
        throw new global.errs.Forbidden()
      }
      const { uid, scope } = verifyToken(token)
      if (scope < this.level) {
        throw new global.errs.Forbidden()
      }
      ctx.auth = {
        uid,
        scope,
      }
      await next()
    }
  }
}

Auth.USER = 8
Auth.ADMIN = 16
Auth.SUPER_ADMIN = 32

module.exports = Auth
