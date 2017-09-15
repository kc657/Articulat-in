let mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/watsonspeech')

let User = require('./user.js')
let Project = require('./project.js')

module.exports.User = User
module.exports.Project = Project
