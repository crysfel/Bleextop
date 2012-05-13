/**
 * @class Bleext.abstract.Controller
 * @extends Ext.app.Controller
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug  9 18:07:06 CDT 2011
 *
 * Basic controller, this class set the handlers to the default buttons in
 * the topbar of each class that extends from Bleext.abstract.Viewport, this class
 * also override the "control" method to add the "id" of the window.
 *
 **/

Ext.define("Bleext.abstract.Controller",{
	extend		: "Ext.app.Controller",
	
	/**
	 * @cfg {Bleext.desktop.Window} win The main window for this module
	 */

	/**
	 * @cfg {Object} selectors Object of selectors, used for remove the listeners from the event bus when module is destroyed
	 */
	
	//private
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
	
	/**
	 * This method add the window id to the selectors, this way we can create more the one
	 * instance of the same window. 
	 * @param {Object} actions An object with the selectors
	 */
	control		: function(actions){
		var me = this;
		if(Ext.isObject(actions)){
			var obj = {};
			Ext.Object.each(actions,function(selector){
				var s = "#"+this.win.id+" "+selector;
				obj[s] = actions[selector];
			},this);
			delete actions;

			if (!me.selectors){
				me.selectors = [];
			}
			me.selectors.push(obj);
			
			this.callParent([obj]);
		}else{
			this.callParent(arguments);
		}
	},
	
	/**
	 * This method display an error message in the status bar of the main window
	 * @param {String} msg The message to display
	 */
	showError	: function(msg){
		this.win.statusBar.setStatus({
			text	: msg,
			iconCls	: "x-status-error"
		});
	},
	
	/**
	 * This method display a success message in the status bar of the main window
	 * @param {String} msg The message to display
	 */
	showMessage	: function(msg){
		this.win.statusBar.setStatus({
			text	: msg,
			iconCls	: "x-status-valid"
		});
	},
	
	/**
	 * An abstract method to be implemented in the subclass, this method is executed 
	 * in the "init" method of the controller, the idea is to set the content of the main
	 * window.
	 * 
	
	setViewport	: function(){
		this.win.add(Ext.create("Ext.panel.Panel",{html:"Hello world!"}));		
	}
	
	 * 
	 */
	setViewport	: Ext.emptyFn,
	/**
	 * An abstract method. This method is executed when the user clicks in any button
	 * withing the main window than contain a property "action" equals to "new".
	 * 
	 */
	add			: Ext.emptyFn,
	/**
	 * An abstract method. This method is executed when the user clicks in any button
	 * withing the main window than contain a property "action" equals to "save".
	 */
	save		: Ext.emptyFn,
	/**
	 * An abstract method. This method is executed when the user clicks in any button
	 * withing the main window than contain a property "action" equals to "delete".
	 */
	remove		: Ext.emptyFn
});