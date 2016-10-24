$(document).ready(function(){

	//Architecture Ajax du site

	//Affichage de la vue 'accueil' au chargement de la page
	afficheAccueil()

	//Affichage de la view 'inscription' au clic du bouton 's'inscrire' du menu Espace Client
 	$('#newClient').click(function(){
    	fermetureMenu(afficheNouveauClient);
  	});

 	//Affichage de la vue 'accueil' au clic du logo VillageGreen dans le menu
  	/*$("#logo_accueil").click(function(){
		fermetureMenu(afficheAccueil);
    });*/

});