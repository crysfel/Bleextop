/**
 * @class Bleext.modules.catalogs.permissions.view.Viewport
 * @extends Bleext.abstract.Viewport
 * requires 
 * @autor Crysfel Villa
 * @date Fri Aug  5 19:05:34 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.permissions.view.Viewport",{
	extend		: "Bleext.abstract.Viewport",
	
	buildItems	: function(){
		var grid = Ext.create("Bleext.modules.catalogs.permissions.view.PermissionsGrid",{
			region	: "south",
			height	: 180
		});
		return [grid,{region:"center",border:false}];
	}
	
});