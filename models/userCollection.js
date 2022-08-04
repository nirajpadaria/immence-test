const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    userName: String,
    password: String,
    name:{
        firstName: String,
        lastName: String
    },
    address:{
        city: String,
        street: String,
        number: String,
        zipCode: String,
        geolocation:{
            lat:String,
            long: String
        }
    },
    phone: String
})

module.exports = mongoose.model('users', userSchema)