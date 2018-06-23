var mongoose = require('mongoose')
var photoSchema = require('../schemas/sphoto')
var photoModel = mongoose.model('mphoto', photoSchema)

module.exports = photoModel
