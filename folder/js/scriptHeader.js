$(document).ready(function(){
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

	$('.menu_trois_item').click(afficheMenu);
 });