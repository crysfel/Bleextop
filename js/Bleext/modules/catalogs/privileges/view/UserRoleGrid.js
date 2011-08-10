/**
 * @class Bleext.modules.catalogs.privileges.view.UserRoleGrid
 * @extends Bleext.abstract.Grid
 * requires Bleext.modules.catalogs.privileges.store.UserRoles
 * @autor Crysfel Villa
 * @date Wed Aug 10 00:36:08 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.privileges.view.UserRoleGrid",{
	extend		: "Bleext.abstract.Grid",
	requires	: ["Bleext.modules.catalogs.privileges.store.UserRoles"],
	
	store		: "Bleext.modules.catalogs.privileges.store.UserRoles",

	initComponent	: function() {
		var me = this;
		
        
		me.callParent();
	}
});