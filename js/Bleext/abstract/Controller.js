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
			
		me.win = me.application.win;
		me.setViewport();
		
		actions["#"+this.win.id+" button[action=new]"] = {
			click		: me.add
		};
		actions["#"+this.win.id+" button[action=save]"] = {
			click		: me.save
		};
		actions["#"+this.win.id+" button[action=delete]"] = {
			click		: me.remove
		};
		
		me.control(actions);
	},
	
	setViewport	: Ext.emptyFn,
	add			: Ext.emptyFn,
	save		: Ext.emptyFn,
	remove		: Ext.emptyFn
});