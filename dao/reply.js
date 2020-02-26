const { Reply } = require('../models/reply')
const { Comment } = require('../models/Comment')
const xss = require('xss')

class ReplyDao {
    static async create (v) {
        const comment = await Comment.findByPk(v.comment_id)
        if (!comment) {
            throw new global.errs.NotFound('没找到对应评论')
        }
        const reply = new Reply()
        reply.nickname = xss(v.nickname);
        reply.email = xss(v.email);
        reply.content = xss(v.content);
        reply.comment_id = xss(v.comment_id);
        return reply.save()
    }
    
    static async destroy (id) {
        const reply = await Reply.findOne({
            where: {
                id,
                deleted_at: null
            }
        })
        if (!reply) {
            throw new global.errs.NotFound('没找到对应评论')
        }
        reply.destroy()
    }

    static async detail (id) {
        const reply = await Reply.findOne({
            where: {
                id,
                deleted_at: null
            },
            attributes: {
                exclude: [
                    'deleted_at', 'updated_at'
                ]
            }
        })
        if (!reply) {
            throw new global.errs.NotFound('没找到对应评论')
        }
        return reply
    }

    static async update (id, v) {
        const reply = await Reply.findByPk(id)
        if (!reply) {
            throw new global.errs.NotFound('没找到对应评论')
        }
        reply.nickname = xss(v.nickname);
        reply.email = xss(v.email);
        reply.content = xss(v.content);
        reply.comment_id = xss(v.comment_id);
        return reply.save()
    }

    static async list (params) {
        const { page = 1, size = 10 } = params
        let filter = {
            deleted_at: null,
        }
        const reply = await Reply.scope('bh').findAndCountAll({
            limit: size,
            offset: (page - 1) * size,
            where: {
                deleted_at: null
            },
            order: [
                ['created_at', 'DESC']
            ],
            attributes: {
                exclude: ['update_at', 'deleted_at']
            }
        })
        return {
            data: reply.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: reply.count,
                total: reply.count,
                total_pages: Math.ceil(reply.count / size),
            }
        }
    }
}


module.exports = ReplyDao