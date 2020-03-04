const { Admin } = require('../models/admin')
const bcryptjs = require('bcryptjs')
class AdminDao {
  static async create(params) {
    const { nickname, email, password } = params
    const hasAdmin = await Admin.findOne({
      where: {
        email,
        deleted_at: null,
      },
    })
    if (hasAdmin) {
      throw new global.errs.Existing('管理员已存在')
    }
    const admin = new Admin()
    ;(admin.nickname = nickname), (admin.email = email)
    admin.password = password
    await admin.save()
    return {
      email: admin.email,
      nickname: admin.nickname,
    }
  }
  static async verify(email, password) {
    const admin = await Admin.findOne({
      where: {
        email,
        deleted_at: null,
      },
    })
    if (!admin) {
      throw new global.errs.AuthFailed('账号不存在或者密码不正确')
    }
    const correct = bcryptjs.compareSync(password, admin.password)
    if (!correct) {
      throw new global.errs.AuthFailed('账号不存在或者密码不正确')
    }
    return admin
  }
}

module.exports = AdminDao
