const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

const ProjectSchema = new Schema({
  title: String,
  transcript: String,
  transcriptSpilt: Array,
  tones: Object,
  dateDue: Date,
  dateCreated: { type: Date, default: Date.now },
  userId: String,
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
