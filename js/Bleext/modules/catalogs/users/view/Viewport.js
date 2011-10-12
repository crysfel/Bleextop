/**
 * @class CRM.catalogs.users.view.Viewport
 * @extends CRM.abstract.Viewport
 * requires 
 * @autor Crysfel Villa
 * @date Mon Jul 25 23:20:56 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.users.view.Viewport",{
	extend		: "Bleext.abstract.Viewport",
	
	buildItems		: function(){
		var grid = Ext.create("Bleext.modules.catalogs.users.view.UsersGrid",{
			region	: "south",
			height	: 150
		});
		
		var form = Ext.create("Bleext.modules.catalogs.users.view.UserForm",{
			region	: "center"
		});
		return [grid,form];
	}
});
