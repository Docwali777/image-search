const mongoose = require('mongoose');
const {Schema} = mongoose
const {Promise} = mongoose 

const imagePromise = new Promise()

const imageSchema = Schema({
  url: String
})
module.exports = mongoose.model('Image', imageSchema)
