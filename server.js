const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cfenv = require('cfenv')

const appEnv = cfenv.getAppEnv()
const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('appName', 'kc-final')
app.set('port', appEnv.port)

app.set('views', path.join(__dirname + '/HTML'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/HTML'))
app.use(bodyParser.json())

// Define your own router file in controller folder, export the router, add it into the index.js.
// app.use('/', require("./controller/yourOwnRouter"));

app.use('/', require('./controllers/restapi/router'))

http.createServer(app).listen(app.get('port'),
    function (req, res) {
      console.log(app.get('appName') + ' is listening on port: ' + app.get('port'))
    })

function loadSelectedFile (req, res) {
  let uri = req.originalUrl
  let filename = __dirname + '/HTML' + uri
  fs.readFile(filename,
        function (err, data) {
          if (err) {
            res.writeHead(500)
            console.log('Error loading ' + filename + ' error: ' + err)
            return res.end('Error loading ' + filename)
          }
          res.setHeader('content-type', mime.lookup(filename))
          res.writeHead(200)
          res.end(data)
        })
}
