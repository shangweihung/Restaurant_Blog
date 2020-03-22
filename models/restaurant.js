// import mongoose and schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Instantiate Schema
const RestaurantSchema = new Schema(
    {
        id: {type: Number, required: true},
        name: {type: String, required: true},
        name_en: {type: String},
        category: {type: String, required: true},
        image: {type: String},
        location: {type: String, required: true},
        phone: {type: String, required: true},
        google_map: {type: String},
        rating: {type: Number, required: true},
        description: {type: String, required: true}
    }
)

module.exports = mongoose.model('Restaurant', RestaurantSchema)