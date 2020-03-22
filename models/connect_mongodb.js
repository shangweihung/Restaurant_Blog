// import mongoose schema
const Restaurant = require('./restaurant')
const restaurantList = require('./restaurant.json')

// connect to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

// actions if connect error
db.on('err', (err) => {
    if (err) return console.error(err)
  })
  
// actions if connect success
db.once('open', (err) => {
if (err) return console.error(err)
console.log('connect to mongoDB successifully !')
})


// send data to mongodb
restaurantList.results.forEach(element => {
    Restaurant.create({
      id: element.id,
      name: element.name,
      name_en: element.name_en,
      category: element.category,
      image: element.image,
      location: element.location,
      phone: element.phone,
      google_map: element.google_map,
      rating: element.rating,
      description: element.description,
    }, (err, restaurants) => {
      if (err) return console.error(err)
  
    })
  });