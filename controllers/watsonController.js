const extend = require('extend')
const watson = require('watson-developer-cloud')
const vcapServices = require('vcap_services')
const config = require('./env.json')

function stt_token (req, res) {
  let sttConfig = extend(config.speech_to_text, vcapServices.getCredentials('speech_to_text'))

  let sttAuthService = watson.authorization(sttConfig)

  sttAuthService.getToken({
    url: sttConfig.url
  }, function (err, token) {
    if (err) {
      console.log('Error retrieving speech to text token: ', err)
      res.status(500).send('Error retrieving speech to text token')
      return
    }
    console.log('THIS IS SEVER SIDE TOKEN');
    console.log(token);
    res.send(token)
  })
}

module.exports = {
  token: stt_token
}
