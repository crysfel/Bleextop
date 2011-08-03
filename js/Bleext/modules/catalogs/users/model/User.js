/**
 * @class CRM.catalogs.users.model.User
 * @extends Ext.data.Model
 * requires 
 * @autor Crysfel Villa
 * @date Mon Jul 25 23:43:20 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.users.model.User",{
	extend		: "Ext.data.Model",

	idProperty	: "username",
	fields		: [
		"username",
		"name",
		"lastname",
		"email",
		"active"
	]
	
});