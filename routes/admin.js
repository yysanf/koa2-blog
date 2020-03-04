const router = require('koa-router')()
const { res } = require('../lib/helper')
const admin = require('../dao/admin')
const { generateToken } = require('../core/token')
const Auth = require('../middlewares/Auth')

router.prefix('/api/v1/admin')

router.post('/register', async (ctx, next) => {
  const data = ctx.request.body
  const user = await admin.create(data)
  ctx.body = res.json(user)
})

router.post('/login', async (ctx, next) => {
  const { email, password } = ctx.request.body
  const user = await admin.verify(email, password)
  const token = generateToken(user.id, Auth.SUPER_ADMIN)
  ctx.body = res.json(token)
})

module.exports = router
