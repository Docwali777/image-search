const express = require('express');
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

app.get('/', (req, res) => {

  res.redirect(`${PORT == 3000
    ? 'http'
    : 'https'}://${req.headers.host}/search/flowers?page=2`)
})

app.route('/search/:data').get((req, res) => {

  if (req.params.data === 'recent') {
    imageSchema.find({}, (err, site) => {
      if (err) {
        console.log(err)
      } else {
        res.render('recent', {
          site: site.splice(-10, site.length - 1)
        })
      }
    })
  } else if (req.params.data === 'search') {
    imageSchema.find({}, (err, body) => {
      if (err) {
        console.log(err)
      } else {
        console.log(body)
      }
    })
  } else {
    let pic = new imageSchema({query: req.params.data, info: `https://pixabay.com/api/?key=${API_KEY}&q=${req.params.data}&page=${req.query.page}`, date: new Date().toLocaleString()}).save((err) => {
      if (err) {
        console.log(err)
      } else {
        imageSchema.find({
          query: req.params.data
        }, (err, site) => {
          fetch(site[site.length - 1].info, (err, meta, body) => {
            if (err) {
              console.log(statusCode)
            } else {
              res.render('search', {
                search: req.params.data,
                data: JSON.parse(body).hits,
                page: req.query.page,
                query: req.params.data,
                port: req.headers.host,
                protocol: PORT == 3000 ? 'http': 'https',
                path: req.path,
                query: JSON.stringify(req.query),
                url: `${PORT == 3000 ? 'http': 'https'}://${req.headers.host}${req.path}&page=${(req.query.page)}`
              })
            }
          })

        })
      }
    })
  }

})

app.listen(PORT, () => {
  console.log('Server connect on PORT: ${PORT}');
})
