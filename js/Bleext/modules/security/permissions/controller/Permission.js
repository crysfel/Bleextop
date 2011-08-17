/**
 * @class Bleext.modules.security.permissions.controller.Permission
 * @extends Bleext.abstract.Controller
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug 16 13:12:35 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.security.permissions.controller.Permission",{
	extend		: "Bleext.abstract.Controller",
	views		: [
		"Bleext.modules.security.permissions.view.Viewport",
		"Bleext.modules.security.permissions.view.PermissionsGrid",
		"Bleext.modules.catalogs.applications.view.ApplicationsTree"
	],
	stores		: ["Bleext.modules.security.permissions.store.Permissions"],
	models		: ["Bleext.modules.security.permissions.model.Permission"],
	

	init	: function() {
		var me = this;
		me.callParent();
		
		me.control({
			"treepanel"	: {
				itemclick	: this.loadPermissions
			}
		});
		
		Bleext.Ajax.request({
			url		: Bleext.BASE_PATH+"index.php/catalogs/roles/getAll",
			scope	: this,
			success	: this.buildGrid
		});
	},
	
	loadPermissions	: function(grid,record){
		var grid = this.win.down("gridpanel");
		
		grid.getStore().load({
			params	: {application_k:record.raw.application_k}
		});
	},
	
	buildGrid	: function(roles){
		var grid = this.win.down("gridpanel"),
			columns = [],
			fields = [],
			store;

		for(var i=0,len=roles.data.length;i<len;i++){
			var role = roles.data[i];
			columns.push({header:role.name,dataIndex:"role_"+role.role_k,width:100});
			fields.push("role_"+role.role_k);
		}
		columns.unshift({header:"Permission",dataIndex:"permission",width:150,locked:true});
		fields.unshift("permission");

		store = Ext.create("Bleext.modules.security.permissions.store.Permissions",{
			fields	: fields
		});
		
		grid.reconfigure(store,columns);
	},
	
	setViewport	: function(){
		this.win.add(Ext.create("Bleext.modules.security.permissions.view.Viewport"));
	}
});