const router = require('koa-router')()
const { res } = require('../lib/helper')
const advertise = require('../dao/advertise')

router.prefix('/api/v1/advertise')

router.post('/create', async (ctx, next) => {
  const ad = await advertise.create(ctx.request.body)
  ctx.body = res.json(ad)
})

router.delete('/:id', async (ctx, next) => {
    await advertise.destory(ctx.params.id)
    ctx.body = res.json()
  })
  

module.exports = router
