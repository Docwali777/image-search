const mongoose = require('mongoose');
let {Schema} = mongoose

const imageSchema = new Schema({
  query: String,
  info: String,
  date: Date
})
module.exports = mongoose.model('imageSearch', imageSchema)
