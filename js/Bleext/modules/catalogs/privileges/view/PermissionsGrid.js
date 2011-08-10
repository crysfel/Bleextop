/**
 * @class Bleext.modules.catalogs.permissions.view.PermissionsGrid
 * @extends Bleext.abstract.Grid
 * requires 
 * @autor Crysfel Villa
 * @date Fri Aug  5 19:09:43 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.privileges.view.PermissionsGrid",{
	extend		: "Bleext.abstract.Grid",
	store		: "Bleext.modules.catalogs.privileges.store.Permissions",
	
	title		: "Application Permissions",
	split		: true,
	collapsible	: true,
	full		: true,

	initComponent	: function() {
		var me = this;
		
		me.columns = [
			{header:"Permission",dataIndex:"name",flex:1}
		];
        
		if(this.full){
			me.columns.push(
				{header:"Action",dataIndex:"action",flex:1},
				{header:"Description",dataIndex:"description",flex:1}
			);
		}
		me.callParent();
	}
});