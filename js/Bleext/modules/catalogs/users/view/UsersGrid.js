/**
 * @class CRM.catalogs.users.view.UsersGrid
 * @extends Bleext.abstract.Grid
 * requires 
 * @autor Crysfel Villa
 * @date Mon Jul 25 23:24:12 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.users.view.UsersGrid",{
	extend		: "Bleext.abstract.Grid",
	requires	: [
		"Bleext.modules.catalogs.users.model.User",
		"Bleext.modules.catalogs.users.store.Users"
	],
	
	title		: "Users",
	border		: false,
	editable	: true,
	
	initComponent	: function() {
		var me = this;
		
		me.store = me.store || Ext.create("Bleext.modules.catalogs.users.store.Users");
		
		if(this.editable){
			me.plugins = [Ext.create("Ext.grid.plugin.RowEditing")];
		}
	
		
		me.columns = [
			Ext.create('Ext.grid.RowNumberer'),
			{header:"Name",dataIndex:"name",flex:1,field: 'textfield'},
			{header:"Lastname",dataIndex:"lastname",flex:1,field: 'textfield'}
		];
        
		if(me.full){
			me.columns.push(
				{header:"Email",dataIndex:"email",flex:1,field: 'textfield'},
				{header:"Active",dataIndex:"active",width:50,renderer:this.showActive,scope:this,field: 'checkbox'}
			);
		}
		me.callParent();
	},
	
	showActive	: function(value){
		if(value){
			return "Yes";
		}else{
			return "No";
		}
	}
});