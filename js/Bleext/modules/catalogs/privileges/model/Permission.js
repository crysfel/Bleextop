/**
 * @class Bleext.modules.catalogs.permissions.model.Permission
 * @extends Ext.data.Model
 * requires 
 * @autor Crysfel Villa
 * @date Fri Aug  5 19:25:41 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.privileges.model.Permission",{
	extend		: "Ext.data.Model",
	
	idProperty	: "permission_k",
	fields		: ["permission_k","application_k","name","action","description"]
	
});