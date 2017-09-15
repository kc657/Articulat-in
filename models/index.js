let mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/watsonspeech')

let User = require('./user.js')

module.exports.User = User
