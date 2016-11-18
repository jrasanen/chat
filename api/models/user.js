const mongoose = require('mongoose'),
      Promise = require('bluebird'),
      bcrypt = Promise.promisifyAll(require('bcrypt')),
      Schema = mongoose.Schema,
      SALT_WORK_FACTOR = 12;

const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
  username: { type: String, required: true, trim: true, index: { unique: true } },
  password: { type: String, required: true },
  email:    { type: String, trim: true, index: true, unique: true, sparse: true },
  admin:    { type: Boolean, default: false }
}, { timestamps: true } );

UserSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) {
    return next();
  }
  return bcrypt.genSaltAsync(SALT_WORK_FACTOR)
    .then((salt) => {
      return bcrypt.hashAsync(this.password, salt)
    })
    .then((hash) => {
      user.password = hash;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
});

UserSchema.methods.token = function () {
  let token = jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email,
    admin: this.admin
  }, 'shhhhh', {
    expiresIn: '4h'
  })
  return Promise.resolve(token)
}

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareAsync(candidatePassword, this.password)
};


module.exports = mongoose.model('User', UserSchema)
