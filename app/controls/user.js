/*****************************
*	user controller 
*****************************/

// use user model
var User = require('../models/muser')

// user register page
exports.pSignup = function(req, res) {
	res.render('signup', {
		title: '注册'
	})
}

// user login page
exports.pSignin = function(req, res) {
	res.render('signin', {
		title: '登录'
	})
}

// user register modal dialog
exports.signup = function(req, res) {
	var _user = req.body.user

	User.find({name: _user.name}, function(err, user) {
		if(err) {
			console.log(err)
		}

		if(user && user.length && user.length > 0) {
			return res.redirect("/signin")
		} else {
			var user = new User(_user)

			user.save(function(err, user) {
				if(err) {
					console.log(err)
				}

				res.redirect("/admin/userlist")
			})
		}
	})

}


// user login modal dialog
exports.signin = function(req, res) {
	var _user = req.body.user
	var name = _user.name
	var password = _user.password

	User.findOne({name: name}, function(err, user) {
		if(err) {
			console.log(err)
		}

		if(!user) {
			return res.redirect("/signup")
		}

		user.comparePassword(password, function(err, isMatch) {
			if(err) {
				console.log(err)
			}

			if(isMatch) {
				console.log('password is matched')
				req.session.user = user
				return res.redirect("/index")
			} else {
				console.log('password is not matched')
				return res.redirect("/signin")
			}
		})
	})
}

// user list page
exports.userlist = function(req, res) {
	User.fetch(function(err, _users) {
		if(err)
			console.log(err)
		
		res.render('userlist', {
			title: '用户列表页',
			users: _users
		})
	})	
}

// user logout logic
exports.logout = function(req, res, next) {
	delete req.session.user

	// res.redirect("/index")
	next()
}

// ============================ middleware

/*
*	middleware for user login
*/
exports.signinRequired = function(req, res, next) {
	var user = req.session.user

	if(!user) {
		return res.redirect('/signin')
	}

	next()
}

/*
*	middleware for user's role permission
*/
exports.adminRequired = function(req, res, next) {
	var user = req.session.user
console.log(user)
	if(!user.role || user.role <= 10) {
		return res.redirect('/signin')
	}

	next()
}