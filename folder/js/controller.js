//Fonction principale, permet de fermer tout les menus ouverts pour ensuite appeler la vue 'loading' et callback simultanément, pour laisser le temps au callback de finir de charger
function fermetureMenu(callback){
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
function afficheAccueil(){
	$('#ajaxContent').load('../views/accueil.html');
};
//Affiche la vue 'inscription'
function afficheNouveauClient(){
	$('#ajaxContent').load('../views/inscription.html');
};
//Affiche la vue 'loading'
function loading(){
	$('#ajaxContent').load('../views/loading.html');
}