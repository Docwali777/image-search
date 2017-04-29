const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fetch = require('fetch').fetchUrl;
const mongoose = require('mongoose');
const imageSchema = require('./Schemas/imageSearch');
const app = express()
const API_KEY = process.env.API_KEY
const dbURl = process.env.MONGODB_URI || 'mongodb://locahost/imagesearch'


mongoose.connect(dbURl)

const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res)=>{
  console.log(req.headers.host)
  res.redirect(`http://${req.headers.host}/search/flowers?page=1`)
})

app.get('/search/:data', (req, res)=>{ //route for search
  console.log(req.params.data, req.query.page)
  var pic = new imageSchema({
    query: req.params.data,
    info: `https://pixabay.com/api/?key=${API_KEY}&q=${req.params.data}&page=${req.query.page}`,
    date: new Date()
  }).save((err)=>{
    if(err){console.log(err);}
    else(console.log('pic saved'))
  })
  imageSchema.findOne({query: req.params.data}, (err, apiUrl)=>{
    if(err){console.log(err)}
    else{
fetch(apiUrl.info, (err, meta, url)=>{
  res.send(JSON.parse(url))
})
    }
  })

})

app.listen(PORT, ()=>{
  console.log('Server connect on PORT: ${PORT}');
})
