
	var myApp = angular.module('myApp', []);
	myApp.controller('navigationCtrl', function($scope, $http){
		//Fonction principale, permet de fermer tout les menus ouverts pour ensuite appeler la vue 'loading' et callback simultanément, pour laisser le temps au callback de finir de charger
		$scope.fermetureMenu = function (callback){
			event.stopPropagation();
			$("#modal_client").slideUp();
			var liste = $('.modal-cat');
			var menu = $(this).data("id");
			liste.each(function(index, elt){
				if (elt.id != menu) {
					$(elt).slideUp();
				}
			});
			$("#superDiv").hide(function(){			
				loading();
				callback();
			});
		};
		//Fonctions d'affichage de contenu
		//Affiche la vue 'accueil'

		$scope.view = {};
		//Affichage de la vue 'accueil' au clic du logo VillageGreen dans le menu
		
	    $scope.afficheAccueil = function() {
	    	console.log('click ok !');
			return $scope.view = {url: '../views/accueil.html'};
	    };
	});/*fin du controller navigationCtrl*/

	myApp.directive('ajaxModal', function(){
		return{
			templateUrl: view.url
		};
	});



