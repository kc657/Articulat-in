import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Project = require('./project')

const AttemptSchema = new Schema({
    attemptTranscript: String,
    _project: {type: Schema.Types.ObjectId, ref: 'Project'},
    dateCreated: { type: Date, default: Date.now }
})

const Attempt = mongoose.model('Attempt', AttemptSchema)

export default Attempt
