/* <![CDATA[ */
	var clearpath = admincpSettings.clearpath;

	jQuery(document).ready(function(){
		jQuery('#admincp-content,#admincp-content > div').tabs({ fx: { opacity: 'toggle', duration:'fast' }, selected: 0 });
		jQuery(".box-description").click(function(){
			var descheading = jQuery(this).prev("h3").html();
			var desctext = jQuery(this).next(".box-descr").html();
			
			jQuery('body').append("<div id='custom-lbox'><div class='shadow'></div><div class='box-desc'><div class='box-desc-top'></div><div class='box-desc-content'><h3>"+descheading+"</h3>"+desctext+"<div class='lightboxclose'></div> </div> <div class='box-desc-bottom'></div>	</div></div>");
			jQuery(".shadow").animate({ opacity: "show" }, "fast").fadeTo("fast", 0.75);
			jQuery('.lightboxclose').click(function(){
				jQuery(".shadow").animate({ opacity: "hide" }, "fast", function(){jQuery("#custom-lbox").remove();});	
			});
		});
		
		jQuery(".defaults-button").click(function() {
		jQuery(".defaults-hover").animate({opacity: "show", top: "-240"}, "fast");
			});
		jQuery(".no").click(function() {
		jQuery(".defaults-hover").animate({opacity: "hide", top: "-300"}, "fast");
			});
		// ":not([safari])" is desirable but not necessary selector
		jQuery('input:checkbox:not([safari])').checkbox();
		jQuery('input[safari]:checkbox').checkbox({cls:'jquery-safari-checkbox'});
		jQuery('input:radio').checkbox();
		
		
		var $save_message = jQuery("#admincp-ajax-saving");
/*		$save_message.ajaxStart(function(){//disable resion: wp auto save admin-ajax.php conflict
			jQuery(this).children("img").css("display","block");
			jQuery(this).children("span").css("margin","6px 0px 0px 30px").html('Saving...');
			jQuery(this).fadeIn('fast');
		});
*/		
		jQuery('input#admincp-save').click(function($){
			//ryan 2013-0802
			$save_message.children("img").css("display","block");
			$save_message.children("span").css("margin","6px 0px 0px 30px").html('Saving...');
			$save_message.fadeIn('fast');
			
			var options_fromform = jQuery('#main_options_form').formSerialize(),
				add_nonce = '&_ajax_nonce='+admincpSettings.admincp_nonce;
			
			options_fromform += add_nonce;
			
			var save_button=jQuery(this);
			jQuery.ajax({
			   type: "POST",
			   url: ajaxurl,
			   data: options_fromform,
			   success: function(response){				   
					$save_message.children("img").css("display","none");
					$save_message.children("span").css("margin","0px").html('Options Saved.');
					save_button.blur();
					
					setTimeout(function(){
						$save_message.fadeOut("slow");
					},500);
			   }
			});

			return false;
		});
		
		
	});
/* ]]> */