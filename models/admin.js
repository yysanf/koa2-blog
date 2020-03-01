const moment = require('dayjs')
const bcryptjs = require('bcryptjs')
const { sequelize } = require('../core/db')
const { Sequelize, Model } = require('sequelize')

class Admin extends Model {}

Admin.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: Sequelize.STRING(64),
      allowNull: false,
      comment: '管理员昵称',
    },
    email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      comment: '管理员邮箱',
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcryptjs.genSaltSync(10)
        const psw = bcryptjs.hashSync(val, salt)
        this.setDataValue('password', psw)
      },
      allowNull: false,
      comment: '管理员密码',
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD')
      },
    },
  },
  {
    sequelize,
    modelName: 'admin',
    tableName: 'admin',
  }
)

module.exports = {
  Admin,
}
