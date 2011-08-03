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
	
	initComponent	: function(){
		var me = this;
		
		me.plugins = [Ext.create("Ext.grid.plugin.RowEditing")];
		
		me.columns = [
			{header:"ID",dataIndex:"role_k",width:50},
			{header:"Nombre",dataIndex:"nombre",flex:1,field:"textfield"},
			{header:"Descripción",dataIndex:"descripcion",flex:1,field:"textfield"}
		];
		
		me.callParent();
	}
});