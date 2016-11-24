
var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.config(['$routeProvider',
    function($routeProvider) { 
        
        // Système de routage
        $routeProvider.when('/', {
            templateUrl: 'views/accueil.html'
        });
        $routeProvider.when('/contact', {
            templateUrl: 'views/inscription.html'
        });
        $routeProvider.when('/loading', {
        	templateUrl: 'views/loading.html'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
]);

myApp.controller('navigationCtrl', function($cookies, $scope, $http){
    console.log($cookies.get('_cliK'));
    if ($cookies.get('_cliK') == undefined) {
        $scope.cookieLog = true;        
    }
    else{
        $http.get('/find/' + $cookies.get('_cliK')).then(function(response){
             $scope.cli = angular.copy(response.data[0]);
             console.log($scope.cli);
             $scope.cookieLog = false;
        });
    }
   
	$scope.redirect = function(url){
		document.location.href = url;
	}

    $('#newsemail').blur(function(champ){
        if (champ.target.value.length == 0) {
            checkReset(champ)
        }
        else if (checkMail(champ.target.value)) {
            checkOK(champ);
        }
        else{
            checkKO(champ);
        }
    });
    
    $scope.testLogClient = function(data){
        $http.post('/connectClient', data).then(function(response){
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
                /*var expire = [];
                if ($scope.user.stayLog) {
                    console.log('coucou');
                    dateLimit = Date(Date.now() + 1000 * 3600 * 24 * 30);
                }*/
                $scope.cli = angular.copy(response.data[0]);
                $cookies.put('_cliK', $scope.cli.code_client);
                console.log($scope.cli.code_client);
                $scope.cookieLog = false;
                var liste = $('.modal-cat');
                liste.each(function(index, elt){            
                    $(elt).slideUp();           
                });                
                $("#modal_client").slideUp();
                $("#superDiv").hide();
            }
        });
    }

    $scope.deLog = function(){
        $scope.cookieLog = true;
        $cookies.remove('_cliK');
    }

    $scope.inscriptionNewsLetter = function(chaine){
        if (chaine.length == 0) {
            Materialize.toast("Vous devez saisir une adresse valide.", 4000);
        }
        else {
            if (checkMail(chaine)) {
                $http.post('/newsletter', {email_newsletter: chaine}).then(function(response){   
                    switch(response.data){
                           case 'error':
                               Materialize.toast("Une erreur est survenue lors de l'inscription.", 4000);
                               break;
                            case 'ok':
                               Materialize.toast("Vous êtes inscrit à la newsletter !", 4000);
                               break ;
                             case 'dejapresent':
                               Materialize.toast("L'adresse e-mail est déjà utilisée.", 4000);
                               break;
                            default:
                               Materialize.toast("Une erreur est survenue lors de l'inscription.", 4000);
                               break;
                    }
                });
            }
            else{
                Materialize.toast("Vous devez saisir une adresse valide.", 4000);
            }
        }
        $scope.newMail = "";
    }

    var testBool = false;


    function afficheMenu(){
        event.stopPropagation();
        $("#modal_client").slideUp();
        var liste = $('.modal-cat');
        var menu = $(this).data("id");
        liste.each(function(index, elt){
            if (elt.id != menu) {
                $(elt).slideUp();
            }
        });
        $('#'+menu).slideToggle();
    }

    $('.menu_trois_item').click(afficheMenu);




    $("#superDiv").hide();
    $("#menu_client").click(function(){
        event.stopPropagation();
        $("#email").val("");
        $("#password").val("");
        var liste = $('.modal-cat');
        $("#modal_client").slideToggle();
        liste.each(function(index, elt){            
            $(elt).slideUp();           
        });
        $("#superDiv").show();
        if (testBool) {
            testBool = false;
            $("#superDiv").hide();
        }
        else {
            testBool = true;
            
        }
    });

    $("#superDiv").click(function(){
        $("#modal_client").slideUp();
        $("#superDiv").hide();
        testBool = false;
    });
    $(window).click(function(){
        var liste = $('.modal-cat');
        liste.each(function(index, elt){            
            $(elt).slideUp();           
        });
    });

   

    $('#newClient').click(function(){
        $("#modal_client").slideUp();
        var liste = $('.modal-cat');
        var menu = $(this).data("id");
        liste.each(function(index, elt){
            if (elt.id != menu) {
                $(elt).slideUp();
            }
        });
        $("#superDiv").hide();
    });
	
});


