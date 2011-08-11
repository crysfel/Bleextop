/**
 * @class Bleext.abstract.Controller
 * @extends Ext.app.Controller
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug  9 18:07:06 CDT 2011
 *
 * Basic controller, this class set the handlers to the default buttons in
 * the topbar of each class that extends from Bleext.abstrasct.Viewport
 *
 **/

Ext.define("Bleext.abstract.Controller",{
	extend		: "Ext.app.Controller",
	

	init	: function() {
		var me = this,
			actions = {};

		me.setViewport();
		
		me.control({
			"button[action=new]"	: {
				click		: me.add
			},
			"button[action=save]" : {
				click		: me.save
			},
			"button[action=delete]" : {
				click		: me.remove
			}
		});
	},
	
	control		: function(actions){
		if(Ext.isObject(actions)){
			var obj = {};
			Ext.Object.each(actions,function(selector){
				obj["#"+this.win.id+" "+selector] = actions[selector];
			},this);
			delete actions;
			this.callParent([obj]);
		}else{
			this.callParent(arguments);
		}
	},
	
	showError	: function(){
		
	},
	
	setViewport	: Ext.emptyFn,
	add			: Ext.emptyFn,
	save		: Ext.emptyFn,
	remove		: Ext.emptyFn
});