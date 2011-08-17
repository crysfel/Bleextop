/**
 * @class Bleext.modules.security.permissions.view.PermissionsView
 * @extends Ext.view.View
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug 16 13:33:56 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.security.permissions.view.PermissionsGrid",{
	extend		: "Bleext.abstract.Grid",
	store		: "Bleext.modules.security.permissions.store.Permissions",
	
	paging		: false,
	
	initComponent	: function() {
		var me = this;
		
		me.columns = [
			{header:"Permission",dataIndex:"permission",width:150,locked:true}
		];
		
		me.callParent();
		
	}
});