/**
 * @class Bleext.desktop.Application
 * @extends Ext.app.Application
 * requires Bleext.desktop.Desktop
 * @autor Crysfel Villa
 * @date Thu Jul 28 20:43:15 CDT 2011
 *
 * The application class
 *
 *
 **/

Ext.define("Bleext.desktop.Application",{
	extend 		: "Ext.app.Application",
	mixins		: {
		observable	: "Ext.util.Observable"
	},
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
			success	: this.buildDesktop,
			failure	: this.onError
		});
	},
	
	buildDesktop	: function(data){
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
		var app = item.initialConfig,
			win = this.desktop.windowMgr.createWindow(app),
			me	= this;
		
		if(win){
			var arr = app.klass.split("."),
				appname = arr[0];
			
			me.desktop.windowMgr.loader.show();
			Ext.Loader.setPath(appname,Bleext.desktop.Constants.JS_PATH+appname);
			Ext.Loader.require(app.klass,function(){
				me.desktop.windowMgr.loader.hide();
				var c = me.getController(app.klass);
				c.win = win;
				c.init(me);
				c.onLaunch(me);
				win.show();
			});
			
		}else{
			me.showNotification({
				message	: "The application was not found! please report this problem to your administration."
			});
		}
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