var adminApp = angular.module('adminApp', ['ngRoute', 'ngCookies']);

adminApp.controller('fonctionCtrl', function($scope, $http, $cookies){
	if ($cookies.get('_adminK') == undefined) {
		document.location.href = 'http://localhost:8080/connectAdmin.html';
	}
	else{
		$http.get('/findComm/' + $cookies.get('_adminK'), function(response){
			if(response.data[0] != undefined){
				$scope.commercialData = angular.copy(response.data[0]);
			}
			else{
				$cookies.remove('_adminK');
				document.location.href = 'http://localhost:8080/connectAdmin.html';
			}
		});
	}

	$scope.div1visible = false;
	$scope.detailClient = false;
	$scope.messageAccueil = true;

	$scope.list_client = [];
	$scope.affiche = {};

  	$(".button-collapse").sideNav();
	//fonction de recherche de clients
	$scope.listClient = function(){
		$http.get("/list").then(function(response) {
		   	$scope.list_client =  response.data;
		   	$scope.detailClient = false;
	   		$scope.div1visible = true;
			$scope.messageAccueil = false;
		});
	}
	

	
	//fonction d'affichage des détails d'un client
	$scope.afficheDetails = function(id) {
		$scope.div1visible = false;
		$scope.detailClient = true;
	   	$scope.btnDetails = true;
	   	$scope.loadingDiv = false;
	   	$scope.list_client = [];
	   	console.log(id);
		$http.get("/find/"+ id).then(function(response) {
			$scope.affiche = angular.copy(response.data);
			$scope.affiche = $scope.affiche[0];
		});
	}

	//affiche le formulaire d'ajout d'un nouveau client
	$scope.ajouterClient = function(){
		$scope.affiche = {};
		$scope.list_client = [];
		$scope.div1visible = false;
		$scope.detailClient = true;
		$scope.btnDetails = false;
		$scope.loadingDiv = false;
	}

	//retour à la liste des clients
	$scope.retour = function() {
		$scope.div1visible = true;
		$scope.detailClient = false;
		$scope.listClient();
	}

	//Mise à jour des informations d'un client
	$scope.update = function(data) {
		$scope.list_client = [];
		$http.post('/update', data).then( function (reponse) {
			//if (reponse != "ok")
			$scope.listClient()
		});
	}

	//'Suppression' d'un client de la base de donnée : il passe en inactif, et est potentiellement réactivable
	$scope.delete = function(id) {
		$scope.list_client = [];
		$http.post('/delete/'+id).then($scope.listClient());
	}

	//Ajout d'un nouveau client dans la base de données
	$scope.nouvelAjout = function(data) {
		$scope.list_client = [];
		$http.post('/insert', data).then($scope.listClient());
	}

	$scope.deconnexion = function(){
		$cookies.remove('_adminK');
		document.location.href = 'http://localhost:8080/connectAdmin.html';
	}
});

