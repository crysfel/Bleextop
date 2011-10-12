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
			},
			"gridpanel"	: {
				itemclick	: this.toggleValue
			}
		});
		
		Bleext.Ajax.request({
			url		: Bleext.BASE_PATH+"index.php/catalogs/roles/getAll",
			scope	: this,
			success	: this.buildGrid
		});
	},
	
	loadPermissions	: function(tree,record){
		var grid = this.win.down("gridpanel");
		
		grid.getStore().load({
			params	: {application_k:record.raw.application_k}
		});
	},
	
	buildGrid	: function(roles){
		var grid = this.win.down("gridpanel");

		grid.buildColumns(roles);
	},
	
	toggleValue	: function(grid, record) {
		var clicked = grid.getSelectionModel().getCurrentPosition(),
			dataIndex = grid.panel.columns[clicked.column].dataIndex;
		
		if(dataIndex !== "permission"){
			record.set(dataIndex,!!!record.get(dataIndex));
		}
    },
	
	save		: function(){
		var grid = this.win.down("gridpanel"),
			store = grid.getStore(),
			modified = store.getUpdatedRecords(),
			records = [];
		
		Ext.each(modified,function(r){
			records.push(r.data);
		});
		Bleext.Ajax.request({
			url			: Bleext.BASE_PATH+"index.php/catalogs/permissions/save",
			params		: {permissions:Ext.encode(records)},
			statusBar	: this.win.statusBar,
			success		: function(){
				store.sync();
			}
		});
	},
	
	setViewport	: function(){
		this.win.add(Ext.create("Bleext.modules.security.permissions.view.Viewport"));
	}
});