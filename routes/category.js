const router = require('koa-router')()
const { res } = require('../lib/helper')
const category = require('../dao/category')
const { CategoryValidator, IdParamsValidator } = require('../validators/category')

router.prefix('/api/v1')

// 增
router.post('/category/create', async (ctx, next) => {
  const data = ctx.request.body
  await new CategoryValidator().validate(data)
  const id = await category.create(data)
  ctx.body = res.json(id, '新增分类成功')
})

// 删
router.delete('/category/:id', async (ctx, next) => {
  const id = ctx.params.id
  await new IdParamsValidator().validate({id})
  await category.destroy(id)
  ctx.body = res.success('删除成功')
})

// 改
router.put('/category/:id', async (ctx, next) => {
  const id = ctx.params.id
  await new IdParamsValidator().validate({id})
  const data = ctx.request.body
  await new CategoryValidator().validate(data)

  await category.update(id, data)
  ctx.body = res.json(id, '更新分类成功')
})

// 查
router.get('/category', async (ctx, next) => {
  const list = await category.list()
  ctx.body = res.json(list)
})

router.get('/category/:id', async (ctx, next) => {
  const id = ctx.params.id
  await new IdParamsValidator().validate({id})
  const detail = await category.detail(id)
  ctx.body = res.json(detail)
})

module.exports = router
