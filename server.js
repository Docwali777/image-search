const express = require('express');
const PORT = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const {Schema} = mongoose
const {Promise} = mongoose
const Image = require('./Schemas/imagesSchema')
const fetch = require('fetch');
const {fetchUrl} = fetch;
const querystring = require('querystring');
const URL = require('url').URL;
const API_KEY = process.env.API_KEY
 // console.log(API_KEY)
var url = process.env.MONGODB_URI || 'mongodb://localhost/imageSearch'
// console.log(url)


var pixabay = `https://pixabay.com/api/?key=${API_KEY}&q=yellow+flowers&page=1`
var myURL = new URL(pixabay)

let {q, page} = querystring.parse(myURL.search)


app.use(bodyParser.urlencoded({extended: true}))

var pics = new Image({
  query: 'none',
  imageSearch: 'cats and dogs'
})
pics.save((err)=>{
  if(err){console.log(err)}
  else{console.log('saved')}
})



mongoose.connection.on('error', (err)=>{
  if(err){console.log(err)}
}).once('open',()=>{
  console.log('connected');
})

mongoose.connect(url)


app.set('view engine', 'ejs')


  app.get('/',(req, res)=>{
let myURL = new URL('localhost:3000')

res.redirect(`https://${myURL.href}/search/camp?page=11`)
  })

app.get('/search/:data', (req, res)=>{
  console.log(req.params, req.query)
  fetchUrl(`https://pixabay.com/api/?key=${API_KEY}&q=${req.params.data}&${req.query.page}`, (err, meta, site)=>{
    if(err){throw err}
    else {
      let hits = JSON.parse(site).hits
    res.send(hits)
    }
  })
})


app.listen(PORT, ()=>{
  console.log(`Express server set-uplocalhost PORT: ${PORT}`);
})
