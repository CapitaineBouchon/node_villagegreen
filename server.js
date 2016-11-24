var express = require('express');
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser');
var passwordHash = require('password-hash');

var db = require("./db.js");

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/folder'));

app.use(cookieParser());

app.get('/', function(req, res){
	res.sendFile('index.html');
});

app.post('/connectClient', function(req, res){
	var logInfo = req.body;
	db.logClient(logInfo, function(err, data){
		if (err) {
			res.send('error');
		}
		else{
			if (data.length == 0) {
				console.log('Données non-trouvées');
				res.send('introuvable');
			}
			else{
				console.log('données trouvées');
				if (passwordHash.verify(logInfo.mdp_connexion, data[0].mdp_connexion)){
					console.log('test hashage réussi');
					db.find(data[0].id_client_connexion, function(err, data){
						res.send(data);
					});
				}
				else{
					console.log('test hashage raté');
					res.send('introuvable');
				}
			}
		}
	});
});

app.post('/connectAdmin', function(req, res){
	var logInfo = req.body;
	db.logClient(logInfo, function(err, data){
		if (err) {
			res.send('error');
		}
		else{
			if (data.length == 0) {
				console.log('Données non-trouvées');
				res.send('introuvable');
			}
			else{
				console.log('données trouvées');
				console.log(data[0].id_commercial_connexion);
				if (logInfo.mdp_connexion == data[0].mdp_connexion){
					db.findComm(data[0].id_commercial_connexion, function(err, data){
						console.log(data);
						res.send(data);
					});
				}
				else{
					console.log('test hashage raté');
					res.send('introuvable');
				}
			}
		}
	});
});

app.post('/connectClient', function(req, res){
	var logInfo = req.body;
	db.logClient(logInfo, function(err, data){
		if (err) {
			res.send('error');
		}
		else{
			if (data.length == 0) {
				console.log('Données non-trouvées');
				res.send('introuvable');
			}
			else{
				console.log('données trouvées');
				if (passwordHash.verify(logInfo.mdp_connexion, data[0].mdp_connexion)){
					console.log('test hashage réussi');
					db.find(data[0].id_client_connexion, function(err, data){
						res.send(data);
					});
				}
				else{
					console.log('test hashage raté');
					res.send('introuvable');
				}
			}
		}
	});
});

app.post('/searchmail', function(req, res){
	var mail = req.body;
	db.searchMail(mail, function(err, data){
		if(err){
			res.send("error");
		}
		else{
			if (data.length == 0) {
				res.send(true);
			}
			else{
				res.send(false);
			}
		}
	});
});

app.post('/ajout', function(req, res){
	var data = req.body;
	data.pwdUn = passwordHash.generate(data.pwdUn);
	db.ajout(data, function(err){
		if(err){
			res.send('error');
		}
		else{
			res.send('ok');
		}
	})
});

app.post('/newsletter', function(req, res){
	var chaine = req.body;
	db.newsMail(chaine, function(err, result){
		if (err) {
			console.log('test error');
			res.send('error');
		}
		else{
			if(result){
				console.log('test ok');
				res.send("ok");
			}
			else{
				console.log('test dejapresent');
				res.send("dejapresent");
			}
		}
	});
});

app.get('/villageGreen', function(req, res){
	res.redirect('/villageGreenAdmin.html');
});


app.get('/connectionVG', function(req, res){
	res.redirect('/connectAdmin.html');
});
app.get('/list', function(req, res){
	db.list(function (err, data) {
		if (err) {
			res.send("error");
		}
		else {
			res.send(data);
		}
	});
});

app.get('/findComm/:id', function(req, res){
	var id = req.params.id;
	db.findComm(id, function (err, data) {
		if (err) {
			res.send("error");
		}
		else {
			res.send(data);
		}
	});
});

app.get('/find/:id', function(req, res){
	var id = req.params.id;
	db.find(id, function (err, data) {
		if (err) {
			res.send("error");
		}
		else {
			console.log(data);
			res.send(data);
		}
	});
});
app.post('/insert', function(req, res){
	var data = req.body;
	db.insert(data, function(err){
		if (err) {
			res.send("error");
		}
		else {
			res.send("");
		}
	});
});
app.post('/update', function(req, res){
	var data = req.body;
	db.update(data, function(err){
		if (err) {
			res.send("error");
		}		
		else {
			res.send("");
		}
	});
});
app.post('/delete/:id', function(req, res) {
	var id = req.params.id;
	db.delete(id, function(err){
		if (err){
			res.send("error");
		}
		else {
			res.send("");
		}
	})
});

//api Fil Rouge Mobile

app.get('/masterRubrique', function(req, res){
	db.masterRubrique(function(err, data){
		if (err) {
			res.header("Access-Control-Allow-Origin", "*");
			res.send("error");
		}
		else {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(data);
		}
	});
});

app.get('/sousRubrique/:id', function(req, res){
	var id = req.params.id;
	db.sousRubrique(id, function(err, data){
		if (err) {			
			res.header("Access-Control-Allow-Origin", "*");
			res.send("error");
		}
		else {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(data);
		}
	});
});

app.get('/searchProducts/:text/:cat', function(req, res){
	
	var text = req.params.text;
	var cat = req.params.cat;
	db.findProduct(text, cat, function(err, data){
		if(err){
			res.header("Access-Control-Allow-Origin", "*");
			res.send('error');
		}
		else{
			res.header("Access-Control-Allow-Origin", "*");
			res.json(data);
		}
	});
});

app.get('/produits/:id', function(req, res){
	var id = req.params.id;
	db.findDetails(id, function(err, data){
		if(err){
			res.header("Access-Control-Allow-Origin", "*");
			res.send('error');
		}
		else{
			res.header("Access-Control-Allow-Origin", "*");
			res.json(data);
		}
	});
});

app.listen(8080, function(){
	console.log("Ouverture du serveur port 8080");
});