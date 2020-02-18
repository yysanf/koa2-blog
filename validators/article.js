const Validator = require('../core/validator')
const { Category } = require('../models/category')

class ArticleValidator extends Validator {
  constructor() {
    super()
    this.rules = {
      title: [
        {
          required: true,
          min: 1,
          message: '文章标题 title 不能为空',
        },
      ],
      author: [
        {
          required: true,
          min: 1,
          message: '文章作者 author 不能为空',
        },
      ],
      cover: [
        {
          required: true,
          min: 1,
          message: '文章封面 cover 不能为空',
        },
      ],
      keyword: [
        {
          required: true,
          min: 1,
          message: '文章简介 keyword 不能为空',
        },
      ],
      content: [
        {
          required: true,
          min: 1,
          message: '文章内容 content 不能为空',
        },
      ],
      category_id: [
        {
          required: true,
          min: 1,
          message: '文章分类 category_id 不能为空',
        },
      ],
    }
  }
  async validate(values) {
    await super.validate(values)
    await this.validateCategoryId(values.category_id)
  }

  async validateCategoryId(categoryId) {
    const category = await Category.findOne({
      where: {
        id: categoryId,
      },
    })
    if (!category) {
      this.throwErr('暂无此分类ID')
    }
  }
}

class IdParamsValidator extends Validator {
  constructor() {
    super()
    this.rules = {
      id(rule, value, callback, source, options) {
        const errors = []
        if (!/^\d+$/.test(value)) {
          errors.push('文章ID需要正整数')
        }
        return errors
      },
    }
  }
}

module.exports = {
  ArticleValidator,
  IdParamsValidator,
}
