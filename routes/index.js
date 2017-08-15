var express = require('express');
var router = express.Router();

const translate = require('google-translate-api');
var request = require('request');
var async = require('async');

const config = require('../dictionary.config');

const urlOD = 'https://od-api.oxforddictionaries.com/api/v1/entries/en/';

var options = {
    url: '',
    path: '/api/v1/entries/en/city',
    method: 'GET',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        app_id: config.oxforddictionariesAPIId,
        app_key: config.oxforddictionariesAPIKey,
        source_lang: "en"
    }
};

var fm = require('json-front-matter');

function dict(word, res, callback) {
    options.url = urlOD + word;
    request(options, function (error, response, body) {
        if (response.statusCode === 200) {
            //  return body.results;

            s = body.replace(/\\n/g, "\\n")
                    .replace(/\\'/g, "\\'")
                    .replace(/\\"/g, '\\"')
                    .replace(/\\&/g, "\\&")
                    .replace(/\\r/g, "\\r")
                    .replace(/\\t/g, "\\t")
                    .replace(/\\b/g, "\\b")
                    .replace(/\\f/g, "\\f");
// remove non-printable and other non-valid JSON chars
            s = s.replace(/[\u0000-\u0019]+/g, "");
            var o = JSON.parse(s);
            var length = o.results[0].lexicalEntries.length;
            
            var arrayResponse =[];
            for(var i=0; i<length; i++){
                var text = o.results[0].lexicalEntries[i].text,
                category = o.results[0].lexicalEntries[i].lexicalCategory,
                audio = o.results[0].lexicalEntries[i].pronunciations[0].audioFile,
                spelling = o.results[0].lexicalEntries[i].pronunciations[0].phoneticSpelling,
                definitions = o.results[0].lexicalEntries[i].entries[0].senses[0].definitions;
                arrayResponse.push({'text': text, 'category': category, 'audio': audio, 'spelling': spelling, 'definitions': definitions});
            }

            callback(res, word, arrayResponse, send);
        } else
            return 'error';
    });
}
;

function googleTranslate(response, word, data, callback) {
    translate(word, {from: 'en', to: 'uk'}).then(res => {
        //return({result: res.text, auto_correct: res.from.text.value});
        callback({"oxford": data, "google": res}, response);
    }).catch(err => {
        console.error(err);
        return {'error': err};
    });
}

function send(data, res) {

    //console.log(JSON.parse(data));
    //  console.log(JSONBigInt.parse(data));
    res.send(data);
}


/* GET home page. */
router.get('/faq', function (req, res, next) {
    res.render('faq', {title: 'FAQs'});
});
router.get('/about', function (req, res, next) {
    res.render('about', {title: 'About'});
});

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/translate', function (req, res, next) {


// options.url = url + req.body.text + '/pronunciations';
    dict(req.body.text, res, googleTranslate);
    // res.send();


});
module.exports = router;
