const router = require('koa-router')()
const { res } = require('../lib/helper')
const article = require('../dao/article')
const { ArticleValidator, IdParamsValidator } = require('../validators/article')

router.prefix('/api/v1')

// 增
router.post('/article/create', async (ctx, next) => {
  const data = ctx.request.body
  await new ArticleValidator().validate(data)
  const id = await article.create(data)
  ctx.body = res.json(id, `创建成功`)
})

// 删
router.delete('/article/:id', async (ctx, next) => {
  const id = ctx.params.id
  await new IdParamsValidator().validate({ id })
  await article.destroy(id)
  ctx.body = res.success('删除文章成功')
})

// 改
router.put('/article/:id', async function(ctx, next) {
  const id = ctx.params.id
  await new IdParamsValidator().validate({ id })
  const data = ctx.request.body
  await new ArticleValidator().validate(data)
  await article.update(id, data)
  ctx.body = res.json(id, `文章更新成功`)
})

// 查列表
router.get('/article', async function(ctx, next) {
  const articleList = await article.list(ctx.query)
  // 设置缓存，过期时间 1min
  ctx.body = res.json(articleList)
  // ctx.body = '查询成功'
})

// 查详情
router.get('/article/:id', async function(ctx, next) {
  const id = ctx.params.id
  await new IdParamsValidator().validate({ id })
  const detail = await article.detial(id)
  if (detail) {
    ctx.body = res.json(detail)
  } else {
    throw new global.errs.NotFound('没有找到相关文章')
  }
})

module.exports = router
