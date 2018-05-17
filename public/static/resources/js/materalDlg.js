(function($) {
	$.fn.extend({
		MaterDlg : function(options, callback) {
			// Our plugin implementation code goes here.
			 var defaults = {    
				    foreground: 'red',    
				    background: 'yellow'    
			  };    
			  // Extend our default options with those provided.    
			  var opts = $.extend(defaults, options);    
			  // Our plugin implementation code goes here.    
			  
			  // private function for debugging    
			  function debug($obj) {    
			    if (window.console && window.console.log)    
			      window.console.log('hilight selection count: ' + $obj.size());    
			  };    
		}
	})
})(jQuery);