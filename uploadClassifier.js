const request = require('request')
const fs = require('fs')

let zipDir = __dirname + '/zips'

function createFormData() {
    return new Promise((resolve, reject) => {
        fs.readdir(zipDir, (err, files) => {
            if (!err) {
                let pokenames = files.map((filename) => filename.slice(0, -4))
                console.log(pokenames)
                let formdata = { name: 'pokemon' }
                pokenames.forEach((name) => {
                    formdata[name.toLowerCase() + '_positive_examples'] = fs.createReadStream(zipDir + '/' + name + '.zip')
                })
                resolve(formdata)
            } else {
                reject(err)
            }
        })
    })
}

function createClassifier(formdata) {
    return new Promise((resolve, reject) => {
        console.log('Uploading')
        let uri = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classifiers?api_key=a6db7158a39f41250b12dfff5a46dc734a57b29a&version=2016-05-20'
        request.post({ url: uri, formData: formdata }, (err, httpResponse, body) => {
            if (err) {
                reject( err)
            }
            resolve(body)
        })
    })
}

function uploadClassifier(formdata, classifierId) {
    return new Promise((resolve, reject) => {
        console.log('Uploading')
        let uri = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classifiers/' + classifierId + '?api_key=a6db7158a39f41250b12dfff5a46dc734a57b29a&version=2016-05-20'
        request.post({ url: uri, formData: formdata }, (err, httpResponse, body) => {
            if (err) {
                reject( err)
            }
            resolve(body)
        })
    })
}

createFormData()
    .then((formdata) => createClassifier(formdata))
    .then((response) => console.log(response))
    .catch((err) => console.error(err))