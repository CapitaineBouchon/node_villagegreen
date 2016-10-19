var express = require('express');
var session = require('cookie-session');
var bodyparser = require('body-parser');

var urlencodedParse = bodyparser.urlencoded({extended: false});
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile('index.html');
})
.listen(8080, function(){
	console.log("Ouverture du serveur port 8080");
});