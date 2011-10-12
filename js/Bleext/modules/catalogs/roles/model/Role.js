/**
 * @class Bleext.Role
 * @extends extendsClass
 * requires requires
 * @autor Crysfel Villa
 * @date Thu Jul 28 11:07:06 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.roles.model.Role",{
	extend 		: "Ext.data.Model",
	
	idProperty	: "role_k",
	fields		: [
		{name:"role_k",type:"int"},
		{name:"users",type:"int"},
		{name:"name"},
		{name:"description"}
	]
});