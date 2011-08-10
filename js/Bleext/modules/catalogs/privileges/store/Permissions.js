/**
 * @class Bleext.modules.catalogs.permissions.store.Permissions
 * @extends Bleext.abstract.Store
 * requires 
 * @autor Crysfel Villa
 * @date Fri Aug  5 19:24:54 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.privileges.store.Permissions",{
	extend		: "Bleext.abstract.Store",
	url			: "catalogs/permissions/getAll",
	model		: "Bleext.modules.catalogs.privileges.model.Permission"
	
});