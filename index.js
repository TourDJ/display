/*****************************
**	the application's entry
*****************************/

var express = require('express')					// use express module
var mongoose = require('./db/db.js')				// use mongodb
var bodyParser = require('body-parser')				// use body-parser parse post's args
var path = require('path')							// use NodeJS ’path’ module
var cookieParser = require('cookie-parser')			// use mongo persist data
var session = require("express-session")			// 
var mongoStroe = require('connect-mongo')(session)	//
var morgan = require('morgan')						// express log middleware
var fs = require('fs')


// create express obj
var app = express()
// use moment.js module
app.locals.moment = require('moment')


// models loading
var model_path = __dirname + '/app/models'
var walk = function(path) {
	fs
	.readdirSync(path)
	.forEach(function(file) {
		var newPath = path + '/' + file
		var stat = fs.statSync(newPath)

		if(stat.isFile()) {
			if(/(.*)\.(js|coffee)/.test(file)) {
				require(newPath)
			}
		} else if(stat.isDirectory()) {
			walk(newPath)
		}
	})
}
walk(model_path)


// set default views path
app.set('views', './app/views/pages')

// set the view engine
app.set('view engine', 'jade')

// use body-parser middleware
app.use(bodyParser.urlencoded({
	extended: true
}))

// use cookie
app.use(cookieParser())
// use session
app.use(session({
	secret: 'display',
	resave: false,
	saveUninitialized: true,
	store: new mongoStroe({
		url: "mongodb://localhost/display",
		collection: 'sessions'
	})
}))

// bower components
app.use(express.static(path.join(__dirname, 'bower_components')))

// set static resource's path
app.use(express.static('public'))

// develop env
var dev = process.env.NODE_ENV || 'env'
if('development' === dev) {
	app.set('showStackError', true)
	app.use(morgan('dev'))
	app.locals.pretty = true
	mongoose.set('debug', true)
}

// load routes
require('./config/routes')(app)

// init port
var port = process.env.PORT || 3000
// start node server
app.listen(port)
console.log('display started on port: ' + port)

