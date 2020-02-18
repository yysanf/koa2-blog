const schema = require('async-validator').default

const { ParameterException } = require('../lib/http-exception')


class Validator {
    async validate (values) {
        if (!this.rules) return;
        let validation = new schema(this.rules)
        try {
            return await validation.validate(values)
        } catch (err) {
            this.throwErr(err)
        }
    }
    throwErr (err) {
        throw new ParameterException(err)
    }
}

Validator.rules = null

module.exports = Validator