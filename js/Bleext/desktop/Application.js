/**
 * @class Bleext.desktop.Application
 * @extends Ext.util.Observable
 * requires Bleext.desktop.Desktop
 * @autor Crysfel Villa
 * @date Thu Jul 28 20:43:15 CDT 2011
 *
 * The application class
 *
 *
 **/

Ext.define("Bleext.desktop.Application",{
	extend		: "Ext.util.Observable",
	requires	: [
		"Bleext.desktop.Desktop",
		"Bleext.desktop.Notification"
	],
	
	useQuickTips: true,

	constructor	: function(options) {
		var me = this;
		
		me.addEvents({
			"ready"	: true
		});

		me.callParent(arguments);

		Bleext.Ajax.request({
			url		: Bleext.Constants.DESKTOP_CONFIGURATION_URL,
			scope	: this,
			success	: this.init,
			failure	: this.onError
		});
	},
	
	init	: function(data){
		var me = this;

        if (me.useQuickTips) {
            Ext.QuickTips.init();
        }

		me.userConfig = data;

		me.desktop = new Bleext.desktop.Desktop({userConfig:me.userConfig});
		
		me.viewport = new Ext.container.Viewport({
            layout	: "fit",
            items	: me.desktop
        });

        Ext.EventManager.on(window, "beforeunload", me.onUnload, me);

        me.fireEvent("ready", me);
	},
	
	/**
	 * Execute an application
	 * @param {Ext.menu.Item} item The item licked in the menu
	 */
	runApplication	: function(item) {
		this.desktop.windowMgr.createWindow(item.initialConfig);
	},
	
	/**
	 * This function allow you to display notifications in the desktop
	 * @param {Object} config The message to show
	 */
	showNotification: function(data){
		Ext.create("Bleext.desktop.Notification",{
			message	: data.message
		});
	},
	
	/**
	 * This function show the login form in the desktop
	 * @param {Object} config The message to show
	 */
	showLoginWindow	: function(data){
		Ext.require("Bleext.modules.login.LoginWindow",function(){
			var win = Ext.create("Bleext.modules.login.LoginWindow",{
				modal	: true,
				forward	: false
			});
			win.show();
		});
	},
	
	onError	: function(data){
		Bleext.log(data);
		Ext.Msg.alert("Error!","Sorry but there was an error loading the initial configuration.");
	},
	
	onUnload : function(e) {
        if (this.fireEvent('beforeunload', this) === false) {
            e.stopEvent();
        }
    }
});