let extend = require('extend')
let watson = require('watson-developer-cloud')
let vcapServices = require('vcap_services')
let config = require('../../env.json')

exports.stt_token = function (req, res) {
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
    res.send(token)
  })
}

exports.tts_synthesize = function (req, res) {
  console.log('tts_synthesize entered')
}
