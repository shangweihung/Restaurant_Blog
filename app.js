// app.js
// import modules
const express = require('express')
const exphbs = require('express-handlebars')
const handlebars = require('handlebars')
const app = express()
const port = 3000

const restaurantObject = require('./models/restaurantObject')


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// connect to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

// import mongoose Schema, named Restaurant
const Restaurant = require('./models/restaurant')

// actions if connect error
db.on('err', (err) => {
  if (err) return console.error(err)
})

// actions if connect success
db.once('open', (err) => {
  if (err) return console.error(err)
  console.log('connect to mongoDB successifully !')
})


// setting static files
app.use(express.static('public'))


// create server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})

// setting template engines
app.engine('handlebars', exphbs('defaultLayout: main'))
app.set('view engine', 'handlebars')


// helper
handlebars.registerHelper("ifEquals", function (v1, v2, options) {
  return v1 === v2 ? options.fn(this) : options.inverse(this);
})

// ------------ route setting------------

app.get('/', (req, res) => {
  Restaurant.find().lean().exec((err, restaurants) => {
    if (err) return console.error(err)
    res.render('index', { restaurantList: restaurants })
  })
})

// 新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('addnew', { restaurantObj: restaurantObject })
})

// POST 新增餐廳動作
app.post('/restaurants/', (req, res) => {
  let newId;
  Restaurant.find().sort({id: -1}).limit(1).exec((err, result) => {
    if (err) return console.log(err)
    newId = result[0].id + 1
    let imagePath;
    if (req.body.image.length === 0) {
      imagePath = '../image/default.png'
    } else {
      imagePath = req.body.image
    }

    console.log(newId)
    const restaurant = new Restaurant({
      id: newId,
      name: req.body.name,
      name_en: req.body.name_en,
      category: req.body.category,
      image: imagePath,
      location: req.body.location,
      phone: req.body.phone,
      google_map: req.body.google_map,
      rating: req.body.rating,
      description: req.body.description     
    })

    restaurant.save((err) => {
      if (err) return console.error(err)
      return res.redirect('/')
    })

  })
})

app.get('/restaurants/:id', (req, res) => {

  Restaurant.findOne({id: req.params.id}).lean().exec((err, restaurants) => {
    if (err) return console.error(err)

    res.render('show', { restaurant: restaurants })
  })
})


// PUT 編輯好的餐廳內容
app.put('/restaurants/:id/edit', (req, res) => {

  let update = { 
                 name: req.body.name,
                 category: req.body.category,
                 location: req.body.location,
                 google_map: req.body.google_map,
                 phone: req.body.phone,
                 rating: req.body.rating,
                 description: req.body.description,
                 image: req.body.image
                }

  Restaurant.findOneAndUpdate({id: req.params.id}, update, (err, restaurant) => {
      console.log(restaurant)

      restaurant.save((err) => {
        if (err) console.error(err)

        return res.redirect('/')
      })
  })
  
})


//GET 編輯餐廳內容
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findOne({id: req.params.id}).lean().exec((err, restaurant) => {
    if (err) return console.error(err)

    //console.log(restaurant)
    res.render('edit', {restaurant: restaurant})
  })
})

// DELETE 刪除餐廳動作
app.delete('/restaurants/:id/delete', (req, res) => {
  Restaurant.deleteOne({id: req.params.id}).lean().exec((err, restaurant) => {
    if (err) return console.error(err)
    res.redirect('/')

  })
})


app.get('/search', (req, res) => {

  const keyword = req.params.keyword
  const sortByKey = req.query.key || 'name'     //default: name
  const sortByOrder = req.query.order || 'desc' //default: descending
  const sortObj = {}
  sortObj[sortByKey] = sortByOrder

  if (sortByKey == 'name'){ key = '依餐廳名稱'}
  else { key = '依評價'}

  if (sortByOrder == 'desc'){ order = ' - 遞減'}
  else { order = ' - 遞增'}

  Restaurant.find().sort(sortObj).lean().exec((err, restaurants) => {
    if (err) return console.error(err)

    const regexp = new RegExp(req.query.keyword, 'gi')
    const restaurantsFilter = restaurants.filter(restaurants => {
        if (restaurants.name.match(regexp) || restaurants.category.match(regexp)) {
          return restaurants
        }
      })
      res.render('index', { restaurantList: restaurantsFilter,
                            keyword: keyword,
                            ByKey: key,
                            ByOrder: order})
  })
})


