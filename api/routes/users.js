const router = require('koa-router')()
const User = require('../models/user')

router.get('/api/users', function *(next) {
  this.body = 'yo'
})

router.post('/api/users', function  *(next) {
  let data = this.request.body

  let user = new User({
    username: data.username,
    password: data.password
  });

  let ok = yield user.save();
  let token = yield user.token()
  this.body = {
    ok: true,
    data: token
  }
})


module.exports = function(app) {
  app.use(router.routes())
     .use(router.allowedMethods())
}
