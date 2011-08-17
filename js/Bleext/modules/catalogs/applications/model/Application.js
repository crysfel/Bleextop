/**
 * @class Bleext.modules.catalogs.applications.model.Application
 * @extends Ext.data.Model
 * requires requires
 * @autor Crysfel Villa
 * @date Tue Aug  2 01:15:49 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.applications.model.Application",{
	extend		: "Ext.data.Model",
	
	idProperty	: "application_k",
	fields		: [
		{name:"application_k",type:"int"},
		{name:"application_parent_k",type:"int"},
		"text",
		"name",
		"description",
		{name:"active",type:"boolean"},
		"klass",
		"configurations"
	]
});