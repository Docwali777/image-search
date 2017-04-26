const express = require('express');
const PORT = process.env.PORT || 3000
const app = express()
const ejs = require('ejs');
const mongoose = require('mongoose');
const {Schema} = mongoose
const {Promise} = mongoose
const Image = require('./Schemas/imagesSchema')



var pics = new Image({
  url: 'https://www.WALIGAUVIN.com'
})



mongoose.connection.on('error', (err)=>{
  if(err){console.log(err)}
}).once('open',()=>{
  console.log('connected');
})

var url = process.env.MONGODB_URI || 'mongodb://localhost/images'
console.log(url)
mongoose.connect(url)

pics.save((err)=>{
  console.log('pics saved')
})

app.set('view engine', 'ejs')
app.get('/', (req, res)=>{
  res.render('index')
})

app.listen(PORT, ()=>{
  console.log(`PORT: ${PORT}`);
})
