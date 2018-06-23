var mongoose = require('mongoose')
var UserSchema = require('../schemas/suser')
var User = mongoose.model('User', UserSchema)

module.exports = User
