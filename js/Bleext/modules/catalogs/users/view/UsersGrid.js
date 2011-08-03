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
	store		: "Bleext.modules.catalogs.users.store.Users",
	
	title		: "Users",
	border		: false,
	collapsible	: true,
	split		: true,
	
	initComponent	: function() {
		var me = this;
		
		me.selType =  'rowmodel';
		
		me.plugins = [
		        Ext.create('Ext.grid.plugin.RowEditing', {
		            clicksToEdit	: 2,
					id				: "bleext-users-editor"
		        })
		    ];
		
		me.columns = [
			Ext.create('Ext.grid.RowNumberer'),
			{header:"Username",dataIndex:"username",flex:1,field: 'textfield'},
			{header:"Name",dataIndex:"name",flex:1,field: 'textfield'},
			{header:"Lastname",dataIndex:"lastname",flex:1,field: 'textfield'},
			{header:"Email",dataIndex:"email",flex:1,field: 'textfield'},
			{header:"Active",dataIndex:"active",width:50,renderer:this.showActive,scope:this,field: 'checkbox'}
		];
        
		me.callParent();
	},
	
	showActive	: function(value){
		if(value == 1){
			return "Yes";
		}else{
			return "No"
		}
	}
});