const router = require('koa-router')()
const co = require('co')
const mongoose = require('mongoose')
const User = require('../models/user')
const Entry = require('../models/entry')

router.get('/api/entries', function *(next) {
  this.body = 'yo'
})

router.post('/api/entries', function *(next) {
  let data = this.request.body

  let user = new Entry({
    username: data.username,
  });

  let ok = yield user.save();
  let token = yield user.token()
  this.body = {
    ok: true,
    data: token
  }
})


module.exports = function(app, io) {
  app.use(router.routes())
     .use(router.allowedMethods());
  io.on('action', co.wrap(function *(ctx, resp) {
    if (resp.type === 'server/entry') {
      let entry = new Entry({
        user: {
          userId: mongoose.Types.ObjectId(ctx.user.id),
          username: ctx.user.username
        },
        content: resp.data.content
      })
      let data = yield entry.save()
      ctx.socket.emit('action', {
        type: 'ENTRY_RECEIVED',
        payload: data
      })
    }
  }));
}
