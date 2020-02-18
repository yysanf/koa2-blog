const { Article } = require('../models/article')
const { Category } = require('../models/category')
const { Op } = require('sequelize')

const xss = require('xss')
class ArticleDao {
  static async create(v) {
    const article = new Article()
    article.title = v.title
    article.author = v.author
    article.keyword = v.keyword
    article.description = v.description
    article.content = xss(v.content)
    article.cover = v.cover
    article.browse = v.browse
    article.category_id = v.category_id
    await article.save()
    return article.id
  }

  static async destroy(id) {
    const article = await Article.findOne({
      where: {
        id,
        deleted_at: null,
      },
    })
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章')
    } else {
      await article.destroy()
    }
  }
  static async update(id, v) {
    // 查询文章
    const article = await Article.findByPk(id)
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章')
    }
    article.title = v.title
    article.author = v.author
    article.keyword = v.keyword
    article.description = v.description
    article.content = xss(v.content)
    article.cover = v.cover
    article.browse = v.browse
    article.category_id = v.category_id

    await article.save()
    return article.id
  }

  static async list(params) {
    const { category_id, keyword, page = 1, size = 10 } = params
    let filter = {
      deleted_at: null,
    }
    if (category_id) {
      filter.category_id = category_id
    }
    if (keyword) {
      filter.title = {
        [Op.like]: `%${xss(keyword)}%`,
      }
    }
    const article = await Article.scope('iv').findAndCountAll({
      limit: size,
      offset: (page - 1) * size,
      where: filter,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: {
            exclude: ['deleted_at', 'updated_at'],
          },
        },
      ],
    })
    return {
      data: article.rows,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: size,
        count: article.count,
        total: article.count,
        total_pages: Math.ceil(article.count / 10),
      },
    }
  }

  static async detial(id) {
    const article = await Article.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: {
            exclude: ['deleted_at', 'updated_at'],
          },
        },
      ],
    })
    if (!article) {
      // throw new global.errs.NotFound('没有找到相关文章');
      return null
    }

    return article
  }
}

module.exports = ArticleDao
