// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/*", function (req, res) {
  res.json(setDateObject(req.url));
});

function setDateObject(url){
 var userTime = url.replace("/", "");
  userTime = userTime.replace(/%20/g, " ");
     
  if(isNaN(userTime)){
    var userDate = new Date(userTime);
    if(userDate.toString() !== "Invalid Date"){
      var options = {year: "numeric", month: "long", day: "numeric"};
      return {unix: userDate.getTime(), natural: userDate.toLocaleDateString("en-US", options)};
    }else{
      return {unix: null, natural: null};
    }
  }
  else{
    var userDate = new Date(parseInt(userTime * 1000));
    var options = {year: "numeric", month: "long", day: "numeric"};
    return {unix: userDate.getTime(), natural: userDate.toLocaleDateString("en-US", options)};
  }
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
