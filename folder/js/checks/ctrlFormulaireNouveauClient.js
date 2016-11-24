myApp.controller('ajoutClient', function($scope, $http, $cookies){
    
    if ($cookies.get('_cliK') != undefined) {
        document.location.href = 'http://localhost:8080/#/';
    }


   
    $scope.initCreation = function(){
        boolMail = false;
        boolPwd = false;
        boolPrenom = false;
        boolNom = false;
        boolAdresse = false;
        boolComplement = true;
        boolVille = false;
        boolPays = true;
        boolPort = true;
        boolFixe = true;
        $scope.client = {
            actif_client: true,
            pwdUn:  "",
            pwdDeux: "",
            mail_client: "",
            nom_client: "",
            prenom_client: "",
            adresse_client: "",
            complement_client: "",
            code_postal_client: "",
            ville_client: "",
            pays_client: "",
            portable_client: "",
            telephone_client: ""
        };
    }
	
    
    $scope.initCreation();
    
    $('#mail').blur(function(champ){
        if (champ.target.value.length == 0) {
            checkKO(champ);
            boolMail = false;
            tooltipFormulaire(champ, "L'adresse e-mail est obligatoire.");
        }
        else {
            $http.post('/searchmail', {'mail_client':champ.target.value}).then(function(response){
                console.log(champ.target.id);
                if (response.data) {
                    if (checkMail(champ.target.value)) {
                        checkOK(champ);
                        boolMail = true;
                        tooltipDissmiss(champ);                    
                    }
                    else{
                        checkKO(champ);
                        boolMail = false;
                        tooltipFormulaire(champ, "L'adresse e-mail est invalide.");
                    }
                }
                else{
                    checkKO(champ);
                    boolMail = false;
                    tooltipFormulaire(champ, "L'adresse e-mail est déjà utilisée.");
                }
            });
        }     
    });
        
        
   

    $('#prenom').blur(function(champ){
        if (champ.target.value.length == 0) {
            checkReset(champ);
            boolPrenom = false;
        }
        else if (checkLetter(champ.target.value)) {
            checkOK(champ);
            boolPrenom = true;
        }
        else{
            checkKO(champ);
            boolPrenom = false;
        }
    });

    $('#nom').blur(function(champ){
        if (champ.target.value.length == 0) {
            checkReset(champ);
            boolNom = false;
        }
        else if (checkLetter(champ.target.value)) {
            checkOK(champ);
            boolNom = true;
        }
        else{
            checkKO(champ);
            boolNom = false;
        }
    });

    $('#adresse').blur(function(champ){
       if (champ.target.value.length == 0) {
            checkReset(champ);
            boolAdresse = false;
        }
        else if (checkAdress(champ.target.value)) {
            checkOK(champ);
            boolAdresse = true;
        }
        else{
            checkKO(champ);
            boolAdresse = false;
        }
    });
    
    $('#complementAdresse').blur(function(champ){
        if (champ.target.value.length == 0) {
            checkReset(champ);
            boolComplement = true;
        }
        else if (checkAdress(champ.target.value)) {
            checkOK(champ);
            boolComplement = true;
        }
        else{
            checkKO(champ);
            boolComplement = false;
        }
    });

    $('#codePostal').blur(function(champ){
        if (champ.target.value.length == 0) {
            checkReset(champ);
            boolCP = false;
        }
        else if (checkCP(champ.target.value)) {
            checkOK(champ);
            boolCP = true;
        }
        else{
            checkKO(champ);
            boolCP = false;
        }
    });

    $('#ville').blur(function(champ){
        if (champ.target.value.length == 0) {
            checkReset(champ);
            boolVille = false;
        }
        else if (checkLetter(champ.target.value)) {
            checkOK(champ);
            boolVille = true;
        }
        else{
            checkKO(champ);
            boolVille = false;
        }
    });

    $('#pays').blur(function(champ){
        if (champ.target.value.length == 0) {
            checkReset(champ);
            boolPays = true;
        }
        else if (checkLetter(champ.target.value)) {
            checkOK(champ);
            boolPays = true;
        }
        else{
            checkKO(champ);
            boolPays = false;
        }
    });
    $('#portable').blur(function(champ){
        if (champ.target.value.length == 0) {
            checkReset(champ);
            boolPort = true;
        }
        else if (checkNumber(champ.target.value)) {
            checkOK(champ);
            boolPort = true;
        }
        else{
            checkKO(champ);
            boolPort = false;
        }

    });

    $('#fixe').blur(function(champ){
        if (champ.target.value.length == 0) {
            checkReset(champ);
            boolFixe = true;
        }
        else if (checkNumber(champ.target.value)) {
            checkOK(champ);
            boolFixe = true;
        }
        else{
            checkKO(champ);
            boolFixe = false;
        }
    });

    $scope.validatePwd = function(mpUn, mpDeux){
    	if (mpUn.length > 4 || mpDeux.length > 4) {
	    	if (mpUn == mpDeux) {
                boolPwd = true;
	        	return true;      
	        }
	        else{
                boolPwd = false;
	        	return false; 
	        }
    	}
    	else{
            boolPwd = false;
    		return false;
    	}
    	
        
    }

    
    $('#pwdDeux').blur(function(champ){
    	console.log('test 1');
        if(!$scope.validatePwd($scope.client.pwdUn, $scope.client.pwdDeux)){
        	tooltipFormulaire(champ, "Les mots de passes ne corresondent pas et/ou doivent faire plus de 4 caractères");
            $scope.client.pwdUn = "";
            $scope.client.pwdDeux = "";
        }
        else{
            tooltipDissmiss(champ);
        }
    });
    

    $scope.validationFormNewClient = function(data){
    	delete data.pwdDeux;
    	
        console.log($scope.client);
    	
        if (totalCheck(data)){
            $http.post('/ajout', data).then(function(response){
                console.log(response.data);
                if(response.data == 'ok'){
                    $scope.initCreation();
                    Materialize.toast('Vous êtes inscrit !', 5000);
                    document.location.href = "/";
                }
                else{
                    $scope.client.pwdUn = "";
                    $scope.client.pwdDeux = "";
                    Materialize.toast("Une erreur est survenue lors de l'inscription !", 4000);
                }
            });
        }
        else{
            $scope.client.pwdUn = "";
            $scope.client.pwdDeux = "";
            Materialize.toast("Une erreur est présente dans le formulaire !", 4000);
        }
        
    }

    var totalCheck = function(data){

         for (var i=0 in data){
            if (data[i] == "") {
                delete data[i];
            }
        }
        
        if(boolMail && boolPwd && boolPrenom && boolNom && boolAdresse && boolComplement && boolVille && boolPays && boolPort && boolFixe) {
            return true;
        }
        else{
            return false;
        }
    
    }

});