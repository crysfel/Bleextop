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
		"Bleext.modules.catalogs.roles.view.RolesView"
	],
	//stores		: ["Bleext.modules.catalogs.privileges.store.UserRoles"],
	//models		: ["Bleext.modules.catalogs.privileges.model.UserRole"],
	
	init		: function(){
		var me = this;
		me.callParent();
		
		me.control({
			"#privileges panel[region=center] dataview"	: {
				itemdrop		: this.addRoleUser,
				itemclick		: this.showRoleUsers,
				containerclick	: this.hideRoleUser
			}
		});
	},
	
	addRoleUser	: function(role,user){
		Ext.Msg.alert("Testing","User '"+user.userData.name+" "+user.userData.lastname+"' added to role '"+role.get("name")+"' (TODO: Implement saving this information in a database)");
	},
	
	showRoleUsers	: function(view,record){
		var grid = this.win.down("panel[region=east]");
		
		grid.setTitle(record.get("name")+" Role");
		grid.expand(true);
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