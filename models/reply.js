const moment = require('dayjs')

const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../core/db')
const { Comment } = require('./comment')

class Reply extends Model {}

Reply.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: Sequelize.STRING(64),
      allowNull: false,
      comment: '回复人的名字',
    },
    email: {
      type: Sequelize.STRING(64),
      allowNull: false,
      comment: '回复人的邮箱',
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      comment: '回复内容',
    },
    created_at: {
      type: Sequelize.DATE,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD')
      },
    },
  },
  {
    sequelize,
    tableName: 'reply',
    modelName: 'reply',
  }
)

Comment.hasMany(Reply, {
    foreignKey: 'comment_id',
    sourceKey: 'id',
    as: 'reply'
})

Reply.belongsTo(Comment, {
    foreignKey: 'comment_id',
    targetKey: 'id',
    as: 'comment'
})

module.exports = {
    Reply
}
