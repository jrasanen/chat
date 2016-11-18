const router = require('koa-router')()
const User = require('../models/user')

router.post('/api/sessions', function  *(next) {
  let data = this.request.body

  let user = yield User.findOne({username: data.username}).exec();
  let token = null
  if (user) {
    token = yield user.token()
  }
  
  yield user.comparePassword(data.password)
  .then((isMatch) => {
    if (isMatch) {
      this.body = {
        ok: true,
        data: token
      }
    } else {
      throw new Error('Unauthorized')
    }
  })
  .catch((err) => {
    console.log(err)
    this.body = {
      ok: false,
      data: err.message
    }
    this.status = 401
  })

})


module.exports = function(app) {
  app.use(router.routes())
     .use(router.allowedMethods())
}
