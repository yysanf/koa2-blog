const { Advertise } = require('../models/advertise')

class AdvertiseDao {
  static async create(v) {
    const { title } = v
    const advertise = await Advertise.findOne({
      where: {
        title,
        deleted_at: null,
      },
    })
    if (advertise) {
      throw new global.errs.Existing('广告已存在')
    }
    const ad = new Advertise()
    ad.title = v.title
    ad.link = v.link
    return ad.save()
  }
  static async destory(id) {
    const advertise = await Advertise.findOne({
      where: {
        id,
        deleted_at: null,
      },
    })
    if (!advertise) {
      throw new global.errs.NotFound('没有找到相广告')
    }
    advertise.destroy()
  }
}

module.exports = AdvertiseDao
