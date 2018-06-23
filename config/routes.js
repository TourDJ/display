/**************************
**	main routes
**************************/

// loaded module
var Index = require('../app/controls/index')
var User = require('../app/controls/user')
var Photo = require('../app/controls/photo')


module.exports = function(app) {

	// pre handler user
	app.use(function(req, res, next) {
		var _user = req.session.user
		
		if(_user) {
			app.locals.user = _user
		} 

		return next()
	})

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ index

	app.use('/index', Index.index) // index page

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ photo management

	app.get('/photo/:id', Photo.detail) 		// detail page
	app.get('/admin/photo', Photo.save) 		// admin page
	app.get('/admin/update/:id', Photo.update)	// admin update photo
	app.post('/admin/photo/new', Photo.new)		// admin post photo
	app.get('/admin/list', Photo.list)			// list page
	app.delete('/admin/list', Photo.del)		// list delete photo


	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ user management

	app.post('/user/signup', User.signup)		// user signup
	app.post('/user/signin', User.signin)		// user login
	app.get('/logout', User.logout, function(req, res) {
		delete app.locals.user
		res.redirect("/index")
	})											// user logout
	app.get('/admin/userlist', User.signinRequired, 
			User.adminRequired, User.userlist)	// user list page
	app.get('/signup', User.pSignup)
	app.get('/signin', User.pSignin)
}