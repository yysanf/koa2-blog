const router = require('koa-router')()
const { res } = require('../lib/helper')
const comment = require('../dao/comment')
const { CommentValidator, IdParamsValidator } = require('../validators/comment')

router.prefix('/api/v1')

// 增
router.post('/comment/create', async (ctx, next) => {
    const data = ctx.request.body
    await new CommentValidator().validate(data)
    const comm = await comment.create(data)
    ctx.body = res.json(comm, '新增评论成功')
})

// 删
router.delete('/comment/:id', async (ctx, next) => {
    const id = ctx.params.id
    await new IdParamsValidator().validate({ id })
    await comment.destroy(id)
    ctx.body = res.json(id, '删除成功')
})

// 改
router.put('/comment/:id', async (ctx, next) => {
    const id = ctx.params.id
    await new IdParamsValidator().validate({ id })
    const data = ctx.request.body
    await new CommentValidator().validate(data)
    const comm = await comment.update(id, data)
    ctx.body = res.json(comm, '修改成功')
})

// 查
router.get('/comment/list', async (ctx, next) => {
    const data = await comment.list(ctx.params)
    ctx.body = res.json(data, '查询成功')
})

router.get('/comment/:id', async (ctx, next) => {
    const id = ctx.params.id
    await new IdParamsValidator().validate({ id })
    const data = await comment.detail(id)
    ctx.body = res.json(data, '查询成功')
})

module.exports = router