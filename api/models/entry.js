const mongoose = require('mongoose'),
      Promise = require('bluebird'),
      Schema = mongoose.Schema;

const EntrySchema = new Schema({
  content: { type: String, },
  user: {
    userId:  { type: Schema.Types.ObjectId, required: true },
    username: { type: String, required: true, trim: true }
  }
}, { timestamps: true } );

module.exports = mongoose.model('Entry', EntrySchema)
