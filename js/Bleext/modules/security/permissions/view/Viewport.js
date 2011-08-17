/**
 * @class Bleext.modules.security.permissions.view.Viewport
 * @extends Bleext.abstract.Viewport
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug 16 13:13:26 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.security.permissions.view.Viewport",{
	extend		: "Bleext.abstract.Viewport",
	
	buildItems	: function(){
		var tree = Ext.create("Bleext.modules.catalogs.applications.view.ApplicationsTree",{
			region		: "west",
			width		: 180,
			viewConfig	: null
		});
		
		var grid = Ext.create("Bleext.modules.security.permissions.view.PermissionsGrid",{
			region	: "center"
		});
		
		return [tree,grid];
	}
});