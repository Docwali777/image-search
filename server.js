const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fetch = require('fetch').fetchUrl;
const mongoose = require('mongoose');
const imageSchema = require('./Schemas/imageSearch');
const URL = require('url').URL;
const app = express()
const API_KEY = process.env.API_KEY
const dbURl = process.env.MONGODB_URI || 'mongodb://locahost/imagesearch'

mongoose.connect(dbURl)

const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  console.log(req);
  res.redirect(`https://${req.headers.host}/search/flowers?page=1`)
})

app.route('/search/:data')
.get((req, res) => {
  let pic = new imageSchema({
    query: req.params.data,
    info: `https://pixabay.com/api/?key=${API_KEY}&q=${req.params.data}&page=${req.query.page}`,
    date: new Date()
  }).save((err)=>{
    if(err){console.log(err)}
  else {
    imageSchema.find({query: req.params.data}, (err, site)=>{
fetch(site[site.length-1].info, (err, meta, body)=>{
  if(err){console.log('error')}
  else{
  res.render('search',{
  data: JSON.parse(body).hits
})
  }
})
// res.send(site[site.length-1])
    })
  }
  })



})

app.listen(PORT, () => {
  console.log('Server connect on PORT: ${PORT}');
})
