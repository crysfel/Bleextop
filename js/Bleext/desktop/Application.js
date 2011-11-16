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
		"Bleext.desktop.Notification",
		"Bleext.desktop.TaskbarContainer",
		"Bleext.desktop.WindowManager"
	],
	
	useQuickTips: true,

	constructor	: function() {
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
			me	= this;
			
		me.desktop.windowMgr.loader.show();
		Bleext.Ajax.request({
			url		: Bleext.BASE_PATH+"index.php/catalogs/permissions/getForCurrentUserApplication",
			scope	: me,
			app 	: app,
			params	: {
				application_k : app.application_k
			},
			success	: me.showApplication,
			failure	: me.onPermissionsError
		});
		
	},
	
	/**
	 *	Show the application window after the server response
	 *	with the permissions for the current user
	 **/
	showApplication		: function(info,options){
		var me = this,
			app = options.app,
			win = this.desktop.windowMgr.createWindow(app),
			cfg;

		if(win){
			var arr = app.klass.split("."),
				appname = arr[0];

			cfg = Ext.decode(app.configurations);
			
			Ext.Loader.setPath(appname,Bleext.desktop.Constants.JS_PATH+appname);
			Ext.Loader.require(app.klass,function(){
				var controller,
					id = win.id+"-"+app.klass;
				me.desktop.add(win);
				me.desktop.windowMgr.loader.hide();
				
				if(cfg.singleton){
					controller = me.controllers.get(id);
				}
				
				if(!controller){
					controller = Ext.create(me.getModuleClassName(app.klass, 'controller'), {
						permissions	: info.data,
		                application	: me,
		                id			: id
		            });
					me.controllers.add(controller);
					controller.win = win;
					controller.init(me);
					controller.onLaunch(me);
					win.on("destroy",function(){
						me.destroyController(controller);
					});
				}
				
				win.show();
			});
			
		}else{
			me.showNotification({
				message	: "The application was not found! please report this problem to your administration."
			});
		}
	},
	
	onPermissionsError	: function(data){
		me.showNotification(data);
	},
	
	destroyController	: function(controller){
		var me = this;
		
		//remove from collection
		me.controllers.remove(controller);
		for(var i=0,len=controller.selectors.length;i<len;i++){
			var obj = controller.selectors[i];
			for(var s in obj){
				for(var ev in obj[s]){
					//remove selectors from event bus
					delete me.eventbus.bus[ev][s];
				}
				
			}
		}
		delete controller;
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
		
		Ext.Msg.alert("Error!","Sorry but there was an error loading the initial configuration.");
	},
	
	onUnload : function(e) {
        if (this.fireEvent('beforeunload', this) === false) {
            e.stopEvent();
        }
    }
});