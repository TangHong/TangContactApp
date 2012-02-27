(function($) {

	/**
	 * Make this UI component swipable requirement the following options.
	 *
	 * The element should be the "inner" container with the following constraints:
	 *
	 * 1) the parent should be  "position:relative" and fixed height
	 *
	 * 2) this element (the inner) should be "position:absolute" and have "width:100%" (to allow initial rendering)
	 *
	 * 3) the children of this element (the items) should be "float:left;display:block;width:100%" and have the same width
	 *
	 * The options of the init are:
	 *
	 * options.ctlNext {jQuery}: the control that will allow to go next on tap
	 * options.ctlPrev {jQuery}: the control that will allow to go prev on tap
	 *
	 * Here are the methods:
	 *
	 * - "goNext" or "goPrev"
	 *
	 * $mySwipable.swipable("goNext");
	 *
	 *
	 */
	$.fn.swipable = function(method, options) {
		if (typeof method === "string"){
			// do nothing, we have the method, and perhaps the options
		}else{
			// it is the init
			options = method;
			method = "init"
		}
		return methods[method].call(this, options);
	}
	
	
	// --------- Component API --------- //
	var methods = {};

	methods.init = function(options) {
		return this.each(function() {
			
			var $inner = $(this);

			var $items = $inner.children();
			$items.addClass("swipable-item");

			var $parent = $inner.parent();

			var parentWidth = $parent.width();
			var itemWidth = $items.eq(0).width();

			var innerWidth = $items.length * itemWidth;

			// innerWidth in pct of contentWidth
			var innerWidthPct = (innerWidth / parentWidth) * 100;

			// itemWidth in pct of innerWidth
			var itemWidthPct = (itemWidth / innerWidth) * 100;

			$items.css("width", "" + itemWidthPct + "%");
			$inner.css("width", "" + innerWidthPct + "%");

			$inner.data("itemWidthPct", itemWidthPct);
			$inner.data("innerWidthPct", innerWidthPct);

			if (options && options.ctlNext){
				var $ctlNext = $(options.ctlNext);
				$inner.data("$ctlNext", $ctlNext);
				$ctlNext.on("click",function(){
					goNext($inner);
				});
			}
			
			if (options && options.ctlPrev){
				var $ctlPrev = $(options.ctlPrev);
				$inner.data("$ctlPrev", $ctlPrev);
				$ctlPrev.on("click",function(){
					goPrev($inner);
				});
			}
			
			updateCtls($inner);
		});

	};
	
	methods.goNext = function(options){
		return this.each(function() {
			var $inner = $(this);
			goNext($inner);			
		});		
	};
	
	methods.goPrev = function(options){
		return this.each(function() {
			var $inner = $(this);
			goPrev($inner);			
		});		
	};
	
	// return true if the first $swipable 
	methods.hasNext = function(){
		if (this.length > 0){
			var $firstInner = $(this[0]);
			return hasNext($firstInner);	
		}
		 
	}
	
	methods.hasPrev = function(){
		if (this.length > 0){
			var $firstInner = $(this[0]);
			return hasPrev($firstInner);	
		}
	}
	// --------- /Component API --------- //

	// --------- Component Utilities --------- //
	function goNext($inner) {
		if (hasNext($inner)){
			$inner.animate({
				left : "-=100%"
			}).promise().done(function(){
				updateCtls($inner);
			});
		}
	}

	function goPrev($inner) {
		if (hasPrev($inner)){
			$inner.animate({
				left : "+=100%"
			}).promise().done(function(){
				updateCtls($inner);
			});
		}
	}
	
	function hasNext($inner){
		var innerWidthPct = $inner.data("innerWidthPct");
		var leftPct = Math.abs(100 * $inner.position().left / $inner.parent().width());
		return (leftPct + 100 < innerWidthPct);		
	}
	
	function hasPrev($inner){
		var leftPct = Math.abs(100 * $inner.position().left / $inner.parent().width());		
		return (leftPct > 0);
	}
	
	function updateCtls($inner){
		var $ctlNext = $inner.data("$ctlNext");
		var $ctlPrev = $inner.data("$ctlPrev");
		
		var innerWidthPct = $inner.data("innerWidthPct");
		var pattern = /[0-9]+/g;
		var leftPct = $inner.css("left").match(pattern) * 1;
		
		if ($ctlNext){
			if (hasNext($inner)){
				$ctlNext.addClass("swipable-hasMore");
			}else{
				$ctlNext.removeClass("swipable-hasMore");
			}
		}
		
		if ($ctlPrev){
			if (hasPrev($inner)){
				$ctlPrev.addClass("swipable-hasMore");
			}else{
				$ctlPrev.removeClass("swipable-hasMore");
			}
		}
		
	}
	// --------- /Component Utilities --------- //
	
})(jQuery);
