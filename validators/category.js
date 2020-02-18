const Validator = require('../core/validator')

class CategoryValidator extends Validator {
  constructor() {
    super()
    this.rules = {
      name: [
        {
          required: true,
          min: 1,
          type: 'string',
          message: '分类 title 名字不能为空',
        },
      ],
      key: [
        {
          required: true,
          min: 1,
          type: 'string',
          message: '分类关键字 key 不能为空',
        },
      ],
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
          errors.push('分类ID需要正整数')
        }
        return errors
      },
    }
  }
}

module.exports = {
  CategoryValidator,
  IdParamsValidator
}
