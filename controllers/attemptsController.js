let db = require('../models')

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
  create: create
}
