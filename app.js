const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const catchErr = require('./middlewares/exception')

const InitManager = require('./core/init')

// error handler
onerror(app, {
  json(err, ctx) {
    const msg = err.message ? err.message : ''
    if (msg) {
      ctx.body.msg = `server error: ${msg}`
    }
  },
  accepts: function() {
    return 'json'
  },
})

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(catchErr)

InitManager.initCore(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
