let db = require('../models')

// GET all posts /api/projects/

function show (req, res) {
  db.Project.find({}, function (err, allProjects) {
    if (err) {
      console.log('error finding project ', err)
    }
    res.json(allProjects)
  })
}

// POST to posts /api/posts/

function create (req, res) {
  db.Project.create(req.body, function (err, newProject) {
    if (err) {
      console.log('error creating new project: ', err)
    }
    console.log('created post: ', newProject)
    res.json(newProject)
  })
}
