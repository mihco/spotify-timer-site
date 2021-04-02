/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

 var express = require('express'); // Express web server framework
 var request = require('request'); // "Request" library
 var cors = require('cors');
 var querystring = require('querystring');
 var cookieParser = require('cookie-parser');
 
 var client_id = 'Your ID Here'; // Your client id
 var client_secret = 'Your Secret Here'; // Your secret
 var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
 
 /**
  * Generates a random string containing numbers and letters
  * @param  {number} length The length of the string
  * @return {string} The generated string
  */
var app = express();
app.use(express.static(__dirname + '/public'));

var auth = 'https://accounts.spotify.com/authorize?';
var authParams = querystring.stringify(
  {response_type: 'code',
    client_id: client_id, 
    scope: 'playlist-read-private playlist-read-collaborative user-read-private',
    redirect_uri: redirect_uri, 
    })

app.get('/login', (req, res) => {
  res.redirect(auth + authParams);
})

app.get('/callback', (req, res) => {
  console.log('haha poopy');
  var code = req.query.code;
  console.log(code)
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    console.log("good work!")
    if (!error && response.statusCode === 200) {
      console.log(body.access_token)
      var options = {
        url: "https://api.spotify.com/v1/me",
        headers: { 'Authorization': 'Bearer ' + body.access_token }
      }

      request.get(options, (error, response, body) => {
        console.log(body);
      })
    } else {
      console.log("ah yeah sure nice job dingus")
    }
    

  })// work on this shizz man, check the website
})

console.log('Listening on 8888');
app.listen(8888);

