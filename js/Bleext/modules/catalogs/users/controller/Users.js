/**
 * @class Bleext.modules.catalogs.users.controller.Users
 * @extends Ext.app.Controller
 * requires 
 * @autor Crysfel Villa
 * @date Sun Jul 17 19:00:53 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.users.controller.Users",{
	extend 	: "Bleext.abstract.Controller",
	views	: [
		"Bleext.modules.catalogs.users.view.Viewport",
		"Bleext.modules.catalogs.users.view.UsersGrid",
		"Bleext.modules.catalogs.users.view.UserForm"
	],
	stores	: ["Bleext.modules.catalogs.users.store.Users"],
	models	: ["Bleext.modules.catalogs.users.model.User"],

	init	: function() {
		
		this.buildItems();
		
		this.control({
			"#users button[action=new]"	: {
				click	: this.addUser
			},
			"#users button[action=save]"	: {
				click	: this.saveUsers
			},
			"#users button[action=delete]"	: {
				click	: this.deleteUsers
			}
		});
		
	},
	
	addUser		: function(){
		var grid = this.win.down("panel[region=center]"),
			rec = grid.getStore().insert(0,{name:"",lastname:""});
			
		grid.editingPlugin.startEdit(0,0);
	},
	
	saveUsers	: function(){
		var grid = this.win.down("panel[region=center]"),
			store = grid.getStore(),
			records = Ext.Array.merge(store.getUpdatedRecords(),store.getNewRecords()),
			data = [];
		
		Ext.each(records,function(rec){
			data.push(rec.data);
		});

		Bleext.Ajax.request({
			url		: Bleext.BASE_PATH+"index.php/users/save",
			params	: {users:Ext.encode(data)},
			statusBar : this.win.statusBar
		});
	},
	
	deleteUsers	: function(){
		var grid = this.win.down("panel[region=center]"),
			records = grid.getSelectionModel().getSelection();
			
		//console.log(records);
	},
	
	buildItems	: function(){
		var view = Ext.create("Bleext.modules.catalogs.users.view.Viewport");
		this.win.add(view);
	}
});