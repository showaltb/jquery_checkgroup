(function($){
	$.fn.checkgroup = function(options){
    // use a closure to allow this to be called for multiple groups
    (function(ctrl_box, options) {
		//merge settings
		var settings=$.extend({
			groupSelector:null,
			groupName:'group_name',
			enabledOnly:false,
			onComplete:null,
			onChange:null
		},options || {});
		
		//allow a group selector override option
		var grp_slctr = (settings.groupSelector==null) ? 'input[name='+settings.groupName+']' : settings.groupSelector;
		
		//setup the callback functions
		var _onComplete = settings.onComplete;
		var _onChange = settings.onChange;
		
		//internal functions
		var _ctrl_box_autoenable = function (){
			//if # of chkbxes is equal to # of chkbxes that are checked
			if($(grp_slctr).size()==$(grp_slctr+':checked').size()){
				ctrl_box.attr('checked','checked');
			}			
		}		
		var _ctrl_box_autodisable = function(){
			ctrl_box.attr('checked',false);
		}	
		
		//grab only enabled checkboxes if required
		if(settings.enabledOnly)
		{
			grp_slctr += ':enabled';
		}
		//attach click event to the "check all" checkbox(s)
		ctrl_box.click(function(e){
			var chk_val=(e.target.checked);
			//check the boxes and prepare for callback;
			var boxes=Array();
			var $i=0;
			$(grp_slctr).each(function(){
				if (this.checked!=chk_val) {
					boxes[$i] = this;
					this.checked=chk_val;
					if (typeof _onChange == "function") {
						_onChange(this);
					}
					$i++;
				}	
			});
			//if there are other "select all" boxes, sync them
			ctrl_box.attr('checked',chk_val);
			if(typeof _onComplete == "function")
			{ 
				_onComplete(boxes);
			}			
		});
		//attach click event to checkboxes in the "group"
		$(grp_slctr).click(function(){
			if(!this.checked)
			{
				_ctrl_box_autodisable();
			}
			else
			{
				_ctrl_box_autoenable();
			}
		});
		
		//initialize
		_ctrl_box_autoenable();
    }(this, options));

		//make this function chainable within jquery
		return this;
	};						
})(jQuery);
		
