const request = require('request')
const fs = require('fs')

let formdata = {
    images_file: fs.createReadStream(__dirname + '/1.png'),
    parameters: fs.createReadStream(__dirname + '/myparams.json'),
    name: 'pokemon'
}

let uri = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=a6db7158a39f41250b12dfff5a46dc734a57b29a&version=2016-05-20'
request.post({url: uri, formData: formdata}, (err, httpResponse, body) => {
    if(err) {
        return console.error('Upload failed!', err)
    }
    console.log('Successful! Server responded with', body)
})