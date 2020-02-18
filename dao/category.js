const { Category } = require('../models/category')

class CategoryDao {
  static async create(data) {
    const category = new Category()
    category.name = data.name
    category.key = data.key
    await category.save()
    return category.id
  }
  static async destroy(id) {
    const category = await Category.findOne({
      where: {
        id,
        deleted_at: null,
      },
    })
    if (!category) {
      throw new global.errs.NotFound('没找到对应分类')
    } else {
      await category.destroy()
    }
  }
  static async update(id, data) {
    const category = await Category.findByPk(id)
    if (!category) {
      throw new global.errs.NotFound('没找到对应分类')
    }
    category.name = data.name
    category.key = data.key
    await category.save()
    return category.id
  }
  static async list() {
    return await Category.scope('bh').findAll({
      where: {
        deleted_at: null,
      },
    })
  }
  static async detail(id) {
    const category = await Category.scope('bh').findOne({
      where: {
        id,
        deleted_at: null,
      },
    })
    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类')
    }

    return category
  }
}

module.exports = CategoryDao
