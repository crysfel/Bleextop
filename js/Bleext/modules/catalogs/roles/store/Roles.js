/**
 * @class Bleext.Roles
 * @extends extendsClass
 * requires requires
 * @autor Crysfel Villa
 * @date Thu Jul 28 10:57:57 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.roles.store.Roles",{
	extend 	: "Bleext.abstract.Store",
	model	: "Bleext.modules.catalogs.roles.model.Role",
	
	url		: "catalogs/roles/getAll"
});