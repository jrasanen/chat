const Koa = require('koa');
const IO = require('koa-socket')
const co = require('co')
const app = new Koa();
const io = new IO()
const router = require('koa-router')();
const Promise = require('bluebird')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chat');

const bodyParser = require('koa-bodyparser');
app.use(bodyParser({
  enableTypes: ['json'],
  extendTypes: {
    json: ['application/x-javascript', 'text/html'],
  },
}));


io.use(co.wrap(function *(ctx, next) {
  let q = ctx.socket.socket.handshake.query
  if (q) {
    ctx.token = q.token
    ctx.user = yield jwt.verifyAsync(q.token, 'shhhhh')
    return yield next()
  }
  return yield next(new Error("Meh"))
}))

io.on('disconnect', (ctx, data) => {
})
io.on( 'join', (ctx, data) => {
})


require('./routes/users')(app)
require('./routes/sessions')(app)
require('./routes/entries')(app, io)

io.attach(app)
app.listen(3001);
