const Validator = require('../core/validator')

class ReplyValidator extends Validator {
  constructor() {
    super()
    this.rules = {
      nickname: [
        {
          required: true,
          min: 1,
          max: 64,
          type: 'string',
          message: '回复人的名字 nickname 名字不能为空',
        },
      ],
      email: [
          {
              required: true,
              type: 'email',
              message: '回复人的邮箱 email 不符合规范，请输入正确的邮箱'
          }
      ],
      content: [
          {
              required: true,
              type: 'string',
              min: 1,
              message: '回复内容 content 不能为空'
          }
      ]
    }
  }
}

class IdParamsValidator extends Validator {
    constructor () {
        super()
        this.rules = {
            id(rule, value, callback, source, options) {
              const errors = []
              if (!/^\d+$/.test(value)) {
                errors.push('评论ID需要正整数')
              }
              return errors
            },
          }
    }
}

module.exports = {
  ReplyValidator,
  IdParamsValidator
}
