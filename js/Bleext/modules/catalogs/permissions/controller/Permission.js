/**
 * @class Bleext.modules.catalogs.permissions.controller.Permission
 * @extends Ext.app.Controller
 * requires 
 * @autor Crysfel Villa
 * @date Fri Aug  5 19:00:04 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.permissions.controller.Permission",{
	extend		: "Ext.app.Controller",
	views		: [
		"Bleext.modules.catalogs.permissions.view.Viewport",
		"Bleext.modules.catalogs.permissions.view.PermissionsGrid"
	],
	stores		: ["Bleext.modules.catalogs.permissions.store.Permissions"],
	models		: ["Bleext.modules.catalogs.permissions.model.Permission"],
	

	init	: function() {
		var me = this;
		me.addViewport();
        
	},
	
	addViewport	: function(){
		this.win = this.application.win;
		this.win.add(Ext.create("Bleext.modules.catalogs.permissions.view.Viewport"));
	}
});