/**
 * @class CRM.catalogs.users.store.Users
 * @extends Bleext.abstract.Store
 * requires 
 * @autor Crysfel Villa
 * @date Mon Jul 25 23:27:57 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.users.store.Users",{
	extend		: "Bleext.abstract.Store",
	model		: "Bleext.modules.catalogs.users.model.User",
	url			: "catalogs/users/getall"
	
});