/**
 * @class Bleext.modules.catalogs.permissions.controller.Permission
 * @extends Ext.app.Controller
 * requires 
 * @autor Crysfel Villa
 * @date Fri Aug  5 19:00:04 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.security.groups.controller.Groups",{
	extend		: "Bleext.abstract.Controller",
	views		: [
		"Bleext.modules.security.groups.view.Viewport",
		"Bleext.modules.catalogs.users.view.UsersView",
		"Bleext.modules.catalogs.roles.view.RolesView",
		"Bleext.modules.catalogs.users.view.UsersGrid"
	],
	
	init		: function(){
		var me = this;
		me.callParent();
		
		me.control({
			"panel[region=center] dataview"	: {
				itemdrop		: this.addRoleUser,
				itemclick		: this.showRoleUsers,
				containerclick	: this.hideRoleUser,
				selectionchange	: this.toggleDelete
			}
		});
	},
	
	add			: function(){
		Bleext.Msg.prompt("Create role","Name:",function(btn,value){
			if(btn === "ok" && value !== ""){
				var view = this.win.down("panel[region=center] dataview");
				
				view.getStore().add({name:value,users:0});
			}
		},this);
	},
	
	addRoleUser	: function(role,data){
		var view = this.win.down("panel[region=center] dataview"),
			values = {
				role_k	: role.get("role_k"),
				user_k	: data.user.user_k
			};

		Bleext.Ajax.request({
			url		: Bleext.BASE_PATH+"index.php/catalogs/roles/adduser",
			params	: {form:Ext.encode(values)},
			statusBar: this.win.statusBar,
			success	: function(data){
				role.set("users",data.total);
			}
		});
	},
	
	showRoleUsers	: function(view,record){
		var grid = this.win.down("gridpanel");
		
		grid.setTitle(record.get("name")+" Role");
		grid.expand(true);
		grid.getStore().getProxy().extraParams = {role_k:record.get("role_k")};
		grid.getStore().load();
	},
	
	hideRoleUser	: function(){
		var grid = this.win.down("panel[region=east]");
		
		grid.setTitle("Select a role");
		grid.collapse(true);
	},
	
	toggleDelete	: function(view,selections){
		var btn = this.win.down("toolbar button[action=delete]");
		if(Ext.isEmpty(selections)){
			btn.disable();
		}else{
			btn.enable();
		}
	},
	
	setViewport	: function(){
		this.win.add(Ext.create("Bleext.modules.security.groups.view.Viewport"));
	}
});