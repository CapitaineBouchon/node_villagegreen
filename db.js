var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'fil_rouge'
});

var result = {};
result.logClient = function(data, callback){
	pool.getConnection(function(err, connection){
		try{
			console.log(connection);
			connection.query('SELECT * FROM connexion WHERE login_connexion = ?', data.login_connexion, function(err, recordset){
				connection.release();
				callback(err, recordset);
				console.log(err);
			});
		}
		catch(err){
			console.log(err);
		}
	});
}

result.list = function(callback){
	pool.getConnection(function(err, connection) {
		try{
			connection.query('SELECT * FROM client WHERE actif_client = true', function (err, recordset) {
				connection.release();
				callback(err, recordset);
			});
		}
		catch(err){
			console.log(err);
		}
	});	
}

result.find = function(id, callback){
	pool.getConnection(function(err, connection) {
		try{
			connection.query('SELECT * FROM client WHERE actif_client=true AND code_client=?', [id], function (err, recordset) {
				connection.release();
				callback(err, recordset);
			});
		}
		catch(err){
			console.log(err);
		}
	});	
}
result.findComm = function(id, callback){
	pool.getConnection(function(err, connection) {
		try{
			connection.query('SELECT * FROM commercial WHERE code_commercial=?', [id], function (err, recordset) {
				connection.release();
				callback(err, recordset);
			});
		}
		catch(err){
			console.log(err);
		}
	});	
}

result.ajout = function(data, callback) {
	connectData = {
		id_client_connexion: "",
		login_connexion: data.mail_client,
		mdp_connexion: data.pwdUn
	};
	delete data.pwdUn;
	pool.getConnection(function(err, connection){
		var sql = 'INSERT INTO client SET ?';
		var inserts = data;
		try{
			connection.query(sql, inserts, function(err, result){
				var sql = 'INSERT INTO connexion SET ?';
				connectData.id_client_connexion = result.insertId;
				var inserts = connectData;
				try{
					connection.query(sql, inserts, function(err){
						console.log(err);
						connection.release();
						callback(err);
					});
				}
				catch(err){
					console.log(err);
				}
			});
		}
		catch(err){
			console.log(err);
		}
	});
}

result.insert = function(data, callback) {
	pool.getConnection(function(err, connection){
		var sql = 'INSERT INTO client (actif_client, nom_client, prenom_client, adresse_client, code_postal_client, ville_client, telephone_client, portable_client, mail_client) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
		var inserts = [true, data.nom_client, data.prenom_client, data.adresse_client, data.code_postal_client, data.ville_client, data.telephone_client, data.portable_client, data.mail_client];
		try{
			connection.query(sql, inserts, function(err){
				connection.release();
				callback(err);
			});
		}
		catch(err){
			console.log(err);
		}
	});
}



result.update = function(data, callback){
	pool.getConnection(function(err, connection) {
		var sql = 'UPDATE client SET nom_client = ?, prenom_client = ?, adresse_client = ?, complement_client = ?, code_postal_client = ?, ville_client = ?, pays_client = ?, telephone_client = ?, portable_client = ?, mail_client = ? WHERE code_client = ?';
		var inserts = [data.nom_client, data.prenom_client, data.adresse_client, data.complement_client, data.code_postal_client, data.ville_client, data.pays_client, data.telephone_client, data.portable_client, data.mail_client, data.code_client];
		try{
			connection.query(sql, inserts, function(err) {
				connection.release();
				callback(err);
			});
		}
		catch(err){
			console.log(err);
		}
	});
}

result.delete = function(id, callback){
	pool.getConnection(function(err, connection){
		var sql = 'UPDATE client SET actif_client = false WHERE code_client = ?';
		var inserts = [id];
		try{
			connection.query(sql, inserts, function(err) {
				connection.release();
				callback(err);
			});
		}
		catch(err){
			console.log(err);
		}
	});
}

result.searchMail = function(chaine, callback){
	pool.getConnection(function(err, connection){
		var sql = 'SELECT mail_client FROM client where mail_client = ?';
		var inserts = [chaine.mail_client];
		try{
			connection.query(sql, inserts, function(err, recordset){
				connection.release();
				callback(err, recordset);
			});
		}
		catch(err){
			console.log(err);
		}
	});
}

result.newsMail = function(data, callback){
	pool.getConnection(function(err, connection){
		var sql = 'SELECT * FROM newsletter WHERE email_newsletter = ?';
		var inserts = [data.email_newsletter];
		try{
			connection.query(sql, inserts, function(err, recordset){
				console.log(recordset);
				if (recordset.length > 0) {
					console.log('test coucou');
					connection.release();
					callback(err, false);
				}
				else{
					console.log('test bloubi');
					var sql = 'INSERT INTO newsletter (email_newsletter) VALUES (?)';
					var inserts = data.email_newsletter;
					try{
						connection.query(sql, inserts, function(err){
							connection.release();
							callback(err, true);
						})
					}
					catch(err){
						console.log(err);
					}
				}
			});
		}
		catch(err){
			console.log(err);
		}
	});
}
	//api appli Fil Rouge
	result.masterRubrique = function(callback){
		pool.getConnection(function(err, connection){
			var sql = 'SELECT rubrique.nom_rubrique, contient.code_rubrique_Rubrique FROM `rubrique` JOIN contient ON rubrique.code_rubrique = contient.code_rubrique_Rubrique GROUP BY code_rubrique_Rubrique';
			try{
				connection.query(sql, function(err, data){
					connection.release();
					callback(err, data);
				});
			}
			catch(err){
				console.log(err);
			}
		});
	}
	result.sousRubrique = function(id, callback){
		pool.getConnection(function(err, connection){
			var sql = 'SELECT rubrique.nom_rubrique, rubrique.code_rubrique FROM `rubrique` JOIN contient ON rubrique.code_rubrique = contient.code_rubrique WHERE code_rubrique_Rubrique = ?';
			var inserts = [id];
			try{
				connection.query(sql, inserts, function(err, data){
					connection.release();
					callback(err, data);
				})
			}
			catch(err){
				console.log(err);
			}
		});
	}

	result.findProduct = function(text, cat, callback){
		pool.getConnection(function(err, connection){
			var sql = 'SELECT DISTINCT * FROM produit JOIN fait_parti ON fait_parti.code_produit = produit.code_produit WHERE actif_produit=true ';
			var inserts = [];
			if (text != "texttyperrornotprovided") {
				sql += "AND libelle_court_produit LIKE (?) OR libelle_long_produit LIKE (?) ";
				inserts.push('%' + text + '%');
				inserts.push('%' + text + '%');
			}
			if(cat != 404) {
				sql += 'AND code_rubrique = ?';
				inserts.push(cat);
			}
			sql += 'GROUP BY produit.code_produit'
			try{
				connection.query(sql, inserts, function(err, data) {
					connection.release();
					callback(err, data);
				})
			}
			catch(err){
				console.log(err);
			}

		});
	}

	result.findDetails = function(id, callback){
		pool.getConnection(function(err, connection){
			var sql = "SELECT * FROM produit WHERE code_produit = ?";
			var issets = [id];
			try{
				connection.query(sql, issets, function(err, data){
					connection.release();
					callback(err, data);
				});
			}
			catch(err){
				console.log(err);
			}
		});
	}


module.exports = result;