let db = require('../models')

function show (req, res) {
  let user_id = req.params.userId
  db.Attempt.find({_user: user_id}, function (err, allAttempts) {
    if (err) {
      console.log('error finding attempts by projectId', err)
    }
    res.json(allAttempts)
  })
}

function create (req, res) {
  db.Attempt.create(req.body, function (err, newAttempt) {
    if (err) {
      console.log('error creating new attempt: ', err)
    }
    console.log('created post: ', newAttempt)
    res.json(newAttempt)
  })
}

module.exports = {
  show: show,
  create: create
}
