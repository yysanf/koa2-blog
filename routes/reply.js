const router = require('koa-router')()
const { res } = require('../lib/helper')
const reply = require('../dao/reply')
const { ReplyValidator, IdParamsValidator } = require('../validators/reply')
const Auth = require('../middlewares/Auth')

router.prefix('/api/v1')

// 增
router.post('/reply/create', async (ctx, next) => {
    const data = ctx.request.body
    await new ReplyValidator().validate(data)
    const comm = await reply.create(data)
    ctx.body = res.json(comm, '回复评论成功')
})

// 删
router.delete('/reply/:id', new Auth(Auth.SUPER_ADMIN).jwt, async(ctx, next) => {
    await new IdParamsValidator().validate({id: ctx.params.id})
    await reply.destroy(ctx.params.id)
    ctx.body = res.success('删除成功')
})

//查
router.get('/reply/:id', async(ctx, next) => {
    await new IdParamsValidator().validate({id: ctx.params.id})
    const data = await reply.detail(ctx.params.id)
    ctx.body = res.json(data, '查询成功')
})

// 改
router.put('/reply/create/:id', new Auth(Auth.SUPER_ADMIN).jwt, async (ctx, next) => {
    await new IdParamsValidator().validate({id: ctx.params.id})
    const data = ctx.request.body
    await new ReplyValidator().validate(data)
    const comm = await reply.update(ctx.params.id, data)
    ctx.body = res.json(comm, '修改评论成功')
})

router.get('/reply', async (ctx, next) => {
    const data = await reply.list(ctx.request.body)
    ctx.body = res.json(data, '查询成功')
})

module.exports = router