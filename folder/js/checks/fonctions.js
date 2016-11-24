var checkMail = function(chaine){
	var regexMail = new RegExp("^[-a-z0-9~!$%^&*_=+}{\\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$");
	if (chaine.length != 0 && regexMail.test(chaine)) {
		return true;
	}
	else{
		return false;
	}
}

var checkLetter = function(chaine){
	var regexLetter = new RegExp("^[A-Za-zàéèïöëäùç' -]*$");
	if (chaine.length != 0 && regexLetter.test(chaine)) {
		return true;
	}
	else
	{
		return false;
	}
}

var checkAdress = function(chaine){
	var regexAdress = new RegExp("^[0-9A-Za-zàéèïöëäùç' -]*$");
	if (chaine.length != 0 && regexAdress.test(chaine)) {
		return true;
	}
	else
	{
		return false;
	}
}

var checkCP = function(chaine){
	var regexAdress = new RegExp("^[0-9]{5}$");
	if (chaine.length != 0 && regexAdress.test(chaine)) {
		return true;
	}
	else
	{
		return false;
	}
}
var checkNumber = function(chaine){
	var regexNumber = new RegExp("^(\\+33|0|0033)[1-9][0-9]{8}$");
	if (chaine.length != 0 && regexNumber.test(chaine)) {
		return true;
	}
	else
	{
		return false;
	}
}
var checkOK = function(champ){
	champ.target.parentElement.classList.add("checkValide");
    champ.target.parentElement.classList.remove("checkInvalide");
}

var checkKO = function(champ){
	champ.target.parentElement.classList.remove("checkValide");
    champ.target.parentElement.classList.add("checkInvalide");
}

var checkReset = function(champ){
	champ.target.parentElement.classList.remove("checkInvalide");
	champ.target.parentElement.classList.remove("checkValide");
}

var tooltipFormulaire = function(champ, chaine){
	$( "#"+champ.target.id).addClass('tooltiped');
    $( "#"+champ.target.id).attr({
        'data-position': "bottom",
        'data-delay': "10",
        'data-tooltip': chaine
    });
    $( "#"+champ.target.id).tooltip({delay: 10});
}

var tooltipDissmiss = function(champ){
	$( "#"+champ.target.id).removeClass('tooltiped');
    $( "#"+champ.target.id).removeAttr('data-position');
    $( "#"+champ.target.id ).removeAttr('data-delay');
    $( "#"+champ.target.id ).removeAttr('data-tooltip');
    $("#"+champ.target.id).tooltip('remove');
}

function setCookie(sName, sValue, sExpire){
	var today = new Date(), expires = new Date;
	console.log(sExpire);
	if (sExpire) {
		console.log('test ok');
		expires.setTime(today.getTime() + (365*24*60*60*1000));
		expir = ";expires=" + expires.toGMTString();
	}
	else{
		console.log('test pas ok');
		expir = ""
	}
	document.cookie = sName + "=" + encodeURIComponent(sValue) + expir;	
}

function getCookie(sName){
	var regex = new RegExp("(?:; )?" + sName + "=([^;]*);?");
	if (regex.test(document.cookie)){
		return decodeURIComponent(RegExp["$1"]);
	} 
	else {
		return null
	}
}

function eraseCookie(sName) {
	expires = new Date;
	expires.setTime(-1);
	document.cookie = sName + "= ;expires="+ expires.toGMTString();
}