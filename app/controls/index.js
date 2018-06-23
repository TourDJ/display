/*****************************
*	index controller 
*****************************/

// use photo model
var Photo = require('../models/mphoto')

// index page
exports.index = function(req, res) {
	// console.log("user in session: ")
	// console.log(req.session.user)

	Photo.fetch(function(err, photos) {
		if(err)
			console.log(err)

		res.render('index', {
			title: '首页',
			photos: photos
		})
	})

}