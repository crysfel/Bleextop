/**
 * @class Bleext.modules.security.permissions.model.Permission
 * @extends Ext.data.Model
 * requires requires
 * @autor Crysfel Villa
 * @date Tue Aug 16 13:40:03 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.security.permissions.model.Permission",{
	extend		: "Ext.data.Model",
	
	idProperty	: "permission_k",
	fields		: [
		{name:"permission_k",type:"int"},
		{name:"application_k",type:"int"},
		{name:"role_k",type:"int"},
		"action","name","description"
	]
	
});