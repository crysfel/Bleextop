/**
 * @class Bleext.modules.catalogs.applications.store.Applications
 * @extends Bleext.abstract.Store
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug  2 01:14:22 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.applications.store.Applications",{
	extend		: "Bleext.abstract.TreeStore",
	model		: "Bleext.modules.catalogs.applications.model.Application",
	url			: "catalogs/applications/getActives",
	nodeParam	: "application_k"
});