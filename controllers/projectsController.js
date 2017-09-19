let db = require('../models')

function show (req, res) {
  let user_id = req.params.userId
  db.Project.find({_user: user_id}, function (err, allProjects) {
    if (err) {
      console.log('error finding project by userId', err)
    }
    res.json(allProjects)
  })
}

function showOne (req, res) {
  let project_id = req.params.projectId
  db.Project.find({_id: project_id}, function (err, oneProjects) {
    if (err) {
      console.log('error finding project by projectId', err)
    }
    res.json(oneProjects)
  })
}

function create (req, res) {
  db.Project.create(req.body, function (err, newProject) {
    if (err) {
      console.log('error creating new project: ', err)
    }
    console.log('created post: ', newProject)
    res.json(newProject)
  })
}

function destroy (req, res) {
  db.Project.findOneAndRemove({ _id: req.params.projectId }, function (err, deletedProject) {
    if (err) {
      console.log('error deleting project: ', err)
    }
    res.json(deletedProject)
  })
}

module.exports = {
  show: show,
  showOne: showOne,
  create: create,
  destroy: destroy
}
