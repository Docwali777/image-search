const mongoose = require('mongoose');
const {Schema} = mongoose
const {Promise} = mongoose

const imagePromise = new Promise()

const imageSchema = Schema({
    query: String,
    imageSearch: String
})
module.exports = mongoose.model('Image', imageSchema)
