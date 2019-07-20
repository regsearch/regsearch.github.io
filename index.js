let default_baseurl = "https://www.google.com/search?";

function compose_query(text) {
	return "q="+text.split(' ').join('+');
}

function compose_search(baseurl, query) {
	// if baseurl ends with ? nothing to do
	if(!baseurl.endsWith('?')) {
		// doesn't end with a ?, so it either ends with a & or we need to add it
		if(!baseurl.endsWith('&')) {
			baseurl = baseurl + "&";
		}
	}
	
	return baseurl + query;
}

function updateLinks() {
	$(".button").each(function(evt){
		let baseurl = $(this).attr("data-baseurl") || default_baseurl;
		
		let append = $(this).attr("data-append") || "";
		append = append?" "+append:"";
		
		let search_text = $("#search_textbox").val() || "";
		
		if(search_text) {
			let query = compose_query( search_text );
			console.log(query);
			$(this).attr("href", compose_search(baseurl, query+append));
		}
		else {
			$(this).attr("href", "#");
		}
	});
}

$(document).keypress(function(e) {
	if(e.which != 13)
		$("#search_textbox").focus();
});

$(function(){
	updateLinks();
	
	$("#search_textbox").on('input', function(e) {
		updateLinks();
	});
});

$("form").submit(function(e){
	e.preventDefault();
	
	let search_text = $("#search_textbox").val() || "";
	if(search_text) {
		window.location.href = compose_search(default_baseurl, compose_query(search_text));
	}
});
