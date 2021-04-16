const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    "name": String,
    "manufacturer": String,
    "description": String,
    "mainPepper": String,
    "imageUrl:": String,
    "heat": Number,
    "likes": Number,
    "dislikes": Number,
    "usersliked": String,
    "usersDisliked": String
})

module.exports = mongoose.model('Sauce', thingSchema);