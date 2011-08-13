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

Ext.define("Bleext.modules.catalogs.privileges.controller.Privileges",{
	extend		: "Bleext.abstract.Controller",
	views		: [
		"Bleext.modules.catalogs.privileges.view.Viewport",
		"Bleext.modules.catalogs.privileges.view.PermissionsGrid",
		"Bleext.modules.catalogs.users.view.UsersView",
		"Bleext.modules.catalogs.roles.view.RolesView",
		"Bleext.modules.catalogs.users.view.UsersGrid"
	],
	//stores		: ["Bleext.modules.catalogs.privileges.store.UserRoles"],
	//models		: ["Bleext.modules.catalogs.privileges.model.UserRole"],
	
	init		: function(){
		var me = this;
		me.callParent();
		
		me.control({
			"panel[region=center] dataview"	: {
				itemdrop		: this.addRoleUser,
				itemclick		: this.showRoleUsers,
				containerclick	: this.hideRoleUser
			}
		});
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
		grid.getStore().extraParams = {role_k:record.get("role_k")};
		grid.getStore().load();
	},
	
	hideRoleUser	: function(){
		var grid = this.win.down("panel[region=east]");
		
		grid.setTitle("Select a role");
		grid.collapse(true);
	},
	
	setViewport	: function(){
		this.win.add(Ext.create("Bleext.modules.catalogs.privileges.view.Viewport"));
	}
});