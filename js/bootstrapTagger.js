(function ($) {
    $.fn.bootstrapTagger = function(options) {
		// list of bootstrap allowed colors
		var bootstrap_colors = ["default", "primary", "success", "info", "warning", "danger"];
		
		// setup defaults
        var settings = $.extend({
            backgroundColor: "primary"
        }, options );
		
		// if the backgroundColor is not set to "random"
		if(settings.backgroundColor != "random"){
			// if color not in available colors set to primary			
			if(bootstrap_colors.indexOf(settings.backgroundColor) == -1){
				settings.backgroundColor = "primary";
			}
		}
		
		// holds the input element
		var input_box = this;
		
		// holds the tags in an array
		var input_tags = [];
		
		// get the current ID and name of passed input
		var old_id = $(input_box).attr("id");
		var old_name = $(input_box).attr("name");
		
		// add the wrapper div
		$(input_box).wrap("<div class='bootstraptagger_wrapper'></div>");
		
		// change the id of the input
		$(input_box).attr("id","bootstraptagger_input_field");
		
		// create a new hidden input with the id and name of passed input to hold val()
		$(input_box).parent().append("<input type='hidden' name='"+old_name+"' id='"+old_id+"'>");
		var hidden_input = $("#" + old_id);

		// add the input box class
		$(input_box).addClass("bootstraptagger_input_box");
		
		// setup the width
		$(input_box).outerWidth(calc_input_width(input_box));
		
		// remove bootstrap classes if needed
		$(input_box).removeClass("form-control");

		// if there is a data in the "value" of the input, setup the tags
		if($(input_box).val()){
			var pieces = $(input_box).val().split(",");
			// loop input value and turn into tags
			$.each( pieces, function( key, value ) {
				add_tag(value);
			});
			
			// update the hidden element val()
			update_hidden_val(hidden_input, input_tags);
			
			// clear the input box
			$(input_box).val("");
		}
		
		$(input_box).keydown(function(event) {
			// detect backspace and remove last tag
			if(event.which == 8 || event.which == 46){
				if($(input_box).val() == ""){
					// get tag text
					var tag_string = $(input_box).parent().children('span').last().text();
					
					// remove the item from the array
					input_tags.splice(input_tags.indexOf(tag_string), 1);
					
					// remove the actual tag element
					$(input_box).parent().children('span').last().remove();
					
					// update the hidden element val()
					update_hidden_val(hidden_input, input_tags);
				}
			}
		});
		
		$(input_box).keyup(function(event) {
			// if comma pressed then we get the last split word and add to tags
			if(event.which == 188){
				var pieces = $(input_box).val().split(",");
				if(pieces[0] != ""){
					// if tag doesn't already exist
					if(input_tags.indexOf(pieces[0]) == -1){
						add_tag(pieces[0]);
					}
				}
				
				// clear the input box
				$(input_box).val("");
			}
		});		

		$(document).on('click', ".bootstraptagger_remove" , function() {
			// get tag text
			var tag_string = $(this).parent().text().trim();
			
			// remove the item from the array
			input_tags.splice(input_tags.indexOf(tag_string), 1);
			
			// remove the actual tag element
			$(this).parent().remove();
			
			// update the hidden element val()
			update_hidden_val(hidden_input, input_tags);
		});	
		
		function add_tag(tag){
			// add the new tag element
			$(input_box).before("<span class='bootstraptagger_word label label-" + get_color() + "'>"+tag+"<span class='bootstraptagger_remove'><a href='#'><i class='fa fa-times'></i></a></span></span>");
						
			// push the new tag to the tag array
			input_tags.push(tag);
			
			// resize the input box to be as big as possible
			$(input_box).outerWidth(calc_input_width(input_box));
			
			
			// update the hidden element with the new tag
			update_hidden_val(hidden_input, input_tags);
		}
		
		// update the value of the hidden element from the array
		function update_hidden_val(element){
			$(element).val(input_tags.join()); 
		}

		// if the color is "random" return a random boostrap color, else return supplied color
		function get_color(){
			if(settings.backgroundColor == "random"){
				return bootstrap_colors[Math.floor(Math.random()*bootstrap_colors.length)];
			}else{
				return settings.backgroundColor;
			}
		}
		
		function calc_input_width(input_box){
			// full width of wrapper
			var full_width = $(input_box).parent().innerWidth();
			
			// add up all the word tags
			var word_width = 0;	
			$(input_box).parent().children('span').each(function() {
				word_width = word_width + $(this).outerWidth() + 10;
			});

			// return the full width minus the width of the words
			var net_width = full_width - word_width;

			return net_width - 10;
		}
    };
}(jQuery));