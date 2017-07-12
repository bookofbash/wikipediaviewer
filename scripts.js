function searchToggle(obj, evt){
		var container = $(obj).closest('.search-wrapper');
		//adds class if container doesn't have class
		if(!container.hasClass('active')){
					container.addClass('active');
					evt.preventDefault();
		}
		else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
				container.removeClass('active');
				//clear input
				container.find('.search-input').val('');
				// clear and hide result container when press close
				container.find('.result-container').fadeOut(100, function(){$(this).empty();
						});
			}
}
function submitFn(obj, evt){
	var value = $(obj).find('.search-input').val().trim();
	_html =" ";
	if(!value.length){
		alert("You have to type something");
	}
	else{
		 $.getJSON("https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search="+ value, function(json){
		console.log (json[1]);
		//traverse the json data to format  the html onto the page
			for(var i=0;i<json[1].length;i++){
				var newWindow = 'target="_blank"';
				$(".result-container").append("<div><div class='well'><a href="+json[3][i]+"><h2>" + json[1][i]+ "</h2>" + "<p>" + json[2][i] + "</p></a></div></div");
				//opens link in new window
		$(".result-container a[href^='https://']").attr("target","_blank");
			};		
	}) + "</b>";
	}
	if (!value.length){
			$(obj).find('.result-container').html();
	}
	else {
	$(obj).find('.result-container').html('<p>' + 'Top results for: '+ '\"' + value + '\"' + '</p>');
	$(obj).find('.result-container').fadeIn(100);
	};
	
	evt.preventDefault();
}