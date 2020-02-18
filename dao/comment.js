const { Comment } = require('../models/comment')
const xss = require('xss')
class CommentDao {
    static async create(v) {
        const comment = new Comment();
        comment.nickname = xss(v.nickname);
        comment.email = xss(v.email);
        comment.content = xss(v.content);
        comment.target_id = xss(v.target_id);
        comment.target_type = xss(v.target_type);
        return comment.save()
    }
    static async destroy (id) {
        const comment = await Comment.findOne({
            where: {
                id,
                deleted_at: null
            }
        })
        if (!comment) {
            throw new global.errs.NotFound('没找到对应评论')
        }
        await comment.destroy()
    }
    static async update (id, data) {
        const comment = await Comment.findByPk(id)
        if (!comment) {
            throw new global.errs.NotFound('没找到对应评论')
        }
        comment.nickname = xss(data.nickname);
        comment.email = xss(data.email);
        comment.content = xss(data.content);
        comment.target_id = xss(data.target_id);
        comment.target_type = xss(data.target_type);
        return comment.save()
    }
    static async list (params) {
        const { page = 1, size = 10 } = params
        let filter = {
            deleted_at: null,
        }
        const comment = await Comment.scope('bh').findAndCountAll({
            limit: size,
            offset: (page - 1) * size,
            where: {
                deleted_at: null
            },
            order: [
                ['created_at', 'DESC']
            ],
            attributes: {
                exclude: ['updated_at']
            }
        })
        return {
            data: comment.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: comment.count,
                total: comment.count,
                total_pages: Math.ceil(comment.count / 10),
            }
        }
    }
    static async detail (id) {
        const comment = await Comment.findOne({
            where: {
                id,
                deleted_at: null
            },
            attributes: {
                exclude: ['updated_at', 'deleted_at']
            }
        })
        if (!comment) {
            throw new global.errs.NotFound('没找到对应评论')
        }
        return comment
    }
}

module.exports = CommentDao