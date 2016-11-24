var connectApp = angular.module('connectApp', ['ngCookies']);



connectApp.controller('loginCtrl', function($scope, $http, $cookies){

	//Vérification de la présence d'un cookie de connexion,e t redirection en cas de présence
	if ($cookies.get('_adminK') != undefined) {
		document.location.href = 'http://localhost:8080/villageGreenAdmin.html';
	}

	//fonction de validation du formulaire de connexion de la page d'administration
	$scope.logAdmin = function(data){
		$http.post('/connectAdmin', data).then(function(response){
            if (response.data == "introuvable") {
                Materialize.toast("Adresse e-mail ou mot de passe incorrect.", 4000);
                $scope.user.mdp_connexion = "";
                $scope.cookieLog = true;
            }
            else if(response.data == "error"){
                Materialize.toast("Une erreur est survenue lors de l'autentification.", 4000);
                $scope.cookieLog = true;
            }
            else{
                console.log('Client trouvé');
                $scope.adminData = {
                	login_connexion: "",
                	mdp_connexion: ""
                };
                console.log(response.data[0]);
                $cookies.put('_adminK', response.data[0].code_commercial);
                document.location.href = 'http://localhost:8080/villageGreenAdmin.html';
            }
        });
	}

});