/*****************************
*	photo controller 
*****************************/

// use photo model
var Photo = require('../models/mphoto')
// Underscore.js is a utility-belt library
var _ = require('underscore')




// photo detail page
exports.detail = function(req, res) {
	var id = req.params.id

	Photo.findById(id, function(err, _photo) {
		res.render('detail', {
			title: '详情页',
			photo: _photo
		})
	})	
}

// photo add page
exports.save = function(req, res) {
	res.render('admin', {
		title: '后台录入页',
		photo: {
			name: '',
			url: '',
			size: '',
			recordDate: '',
			description: ''
		}
	})
}

// photo update page
exports.update = function(req, res) {
	var id = req.params.id

	if(id) {
		Photo.findById(id, function(err, _photo) {
			res.render('admin', {
				title: '后台更新页',
				photo: _photo
			})
		})
	}
}

// photo list page
exports.list = function(req, res) {
	Photo.fetch(function(err, _photos) {
		if(err)
			console.log(err)
		
		res.render('list', {
			title: '列表页',
			photos: _photos
		})
	})	
}

// photo add logic
exports.new = function(req, res) {
	var id = req.body.photo._id
	var photoObj = req.body.photo
	var __photo__

	if(id !== 'undefined') {
		Photo.findById(id, function(err, _photo) {
			if(err)
				console.log(err)

			__photo__ = _.extend(_photo, photoObj)
			__photo__.save(function(err, __photo) {
				if(err)
					console.log(err)

				res.redirect('/photo/' + __photo._id)
			})
		})
	} else {
		__photo__ = new Photo({
			name: photoObj.name,
			size: photoObj.size,
			url: photoObj.url,
			recordDate: photoObj.recordDate,
			description: photoObj.description
		})

		__photo__.save(function(err, _photo) {
			if(err)
				console.log(err)

			res.redirect('/photo/' + _photo._id)
		})
	}
}

// photo delete logic
exports.del = function(req, res) {
	var id = req.query.id

	if(id) {
		Photo.remove({_id: id}, function(err, _photo) {
			if(err) {
				console.log(err)
			} else {
				res.json({success: 1})
			}
		})
	}
}