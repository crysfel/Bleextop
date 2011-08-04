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
		"application_k",
		"application_parent_k",
		"text",
		"name",
		"description",
		"active",
		"class",
		"configurations"
	]
});