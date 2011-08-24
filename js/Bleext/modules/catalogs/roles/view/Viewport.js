/**
 * @class Bleext.Viewport
 * @extends extendsClass
 * requires requires
 * @autor Crysfel Villa
 * @date Thu Jul 28 10:19:56 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.roles.view.Viewport",{
	extend 		: "Bleext.abstract.Viewport",
	
	buildItems	: function(){
		var grid = Ext.create("Bleext.modules.catalogs.roles.view.RolesGrid",{
			region	: "south",
			height	: 150
		});
		var form = Ext.create("Bleext.modules.catalogs.roles.view.RoleForm",{
			region	: "center"
		});
		return [grid,form];
	}
});