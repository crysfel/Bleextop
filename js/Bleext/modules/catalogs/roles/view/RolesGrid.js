/**
 * @class Bleext.RolesGrid
 * @extends extendsClass
 * requires requires
 * @autor Crysfel Villa
 * @date Thu Jul 28 10:46:57 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.roles.view.RolesGrid",{
	extend 		: "Bleext.abstract.Grid",
	store		: "Bleext.modules.catalogs.roles.store.Roles",
	
	title		: "Roles",
	border		: false,
	split		: true,
	collapsible	: true,
	editable	: true,
	
	initComponent	: function(){
		var me = this;

		if(me.editable){
			me.plugins = [Ext.create("Ext.grid.plugin.RowEditing")];
		}
		
		me.columns = [
			{header:"Name",dataIndex:"name",flex:1,field:"textfield"}
		];
		
		if(me.full){
			me.columns.push(
				{header:"Description",dataIndex:"description",flex:1,field:"textfield"}
			);
		}
		
		me.callParent();
	}
});