/**
 * @class Bleext.modules.security.permissions.store.Permissions
 * @extends Bleext.abstract.Store
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug 16 13:38:24 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.security.permissions.store.Permissions",{
	extend		: "Bleext.abstract.Store",
	url			: "catalogs/permissions/getByApplication",
	autoLoad	: false
});