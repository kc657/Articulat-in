const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const controllers = require('./controllers')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const port = process.env.PORT || 3001
const db = require('./models')
const User = db.User

app.use(express.static(__dirname + '/public'))

// to config API to use body body-parser and look for JSON in req.body
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// to config API to use cookieParser
app.use(cookieParser())

// to config session
app.use(passport.initialize())
app.use(session({
  secret: 'bunenshuodemimi', // change this!
  resave: false,
  saveUninitialized: false
}))
app.use(passport.session())

// passport config
passport.use(new LocalStrategy(db.User.authenticate()))
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(db.User.deserializeUser())

// Prevent CORS errors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')

  // Remove caching
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// API ROUTES

// Setting Home Route
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})
// get all projects by current user
app.get('/api/projects/:userId', controllers.projects.show)
// get one project
app.get('/api/projects/showOne/:projectId', controllers.projects.showOne)
// post new project
app.post('/api/projects', controllers.projects.create)
// get all attempts by current user
app.get('/api/attempts/:userId', controllers.attempts.show)
// post new attempt
app.post('/api/attempts', controllers.attempts.create)
// watson token route
app.get('/api/watson/token', controllers.watson.token)
// auth routes
app.post('/signup', function signup (req, res) {
  console.log(`${req.body.username} ${req.body.password}`)
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function () {
        res.send(newUser)
      })
    }
  )
})
// passport's required authentication
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(JSON.stringify(req.user))
  res.send(req.user)
})
// passport log out
app.get('/logout', function (req, res) {
  console.log('attempting to logout')
  req.logout()
  res.redirect('/')
})
// serving server on port
app.listen(port, function () {
  console.log(`App running on ${port}`)
})
