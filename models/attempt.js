const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Project = require('./project')
const User = require('./user')

const AttemptSchema = new Schema({
  attemptTranscript: String,
  attemptTranscriptSpilt: Array,
  lcs: String,
  lcsScore: Number,
  _project: {type: Schema.Types.ObjectId, ref: 'Project'},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  dateCreated: { type: Date, default: Date.now },
  tones: Object,
  commonWordCount: Number
})

const Attempt = mongoose.model('Attempt', AttemptSchema)

module.exports = Attempt
