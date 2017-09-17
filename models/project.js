const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

const ProjectSchema = new Schema({
    title: String,
    transcript: String,
    transcriptSpilt: Array,
    dateDue: Date,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: { type: Date, default: Date.now }
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
