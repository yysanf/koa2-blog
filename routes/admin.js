const router = require('koa-router')()
const { res } = require('../lib/helper')
const admin = require('../dao/admin')

router.prefix('/api/v1/admin')

router.post('/register', async (ctx, next) => {
  const data = ctx.request.body
  const user = await admin.create(data)
  ctx.body = res.json(user)
})

router.post('/login', async (ctx, next) => {
  const { email, password } = ctx.request.body
  const user = await admin.verify(email, password)
  ctx.body = res.json(user)
})

module.exports = router
