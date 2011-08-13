/**
 * @class Bleext.modules.catalogs.permissions.view.Viewport
 * @extends Bleext.abstract.Viewport
 * requires 
 * @autor Crysfel Villa
 * @date Fri Aug  5 19:05:34 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.privileges.view.Viewport",{
	extend		: "Bleext.abstract.Viewport",
	
	defaults	: {
		border		: false,
		autoScroll	: true
	},
	
	buildItems	: function(){
		var users = Ext.create("Bleext.modules.catalogs.users.view.UsersView"),
			roles = Ext.create("Bleext.modules.catalogs.roles.view.RolesView"),
			usersRole = Ext.create("Bleext.modules.catalogs.users.view.UsersGrid",{
				full	: false,
				editable: false,
				width		: 180,
				title		: "Select a role",
				hideCollapseTool: true,
				collapsible	: true,
				collapsed	: true,
				region		: "east",
				store	: Ext.create("Bleext.modules.catalogs.users.store.Users",{
					url			: "catalogs/role/getusers",
					autoLoad	: false
				})
			});
			
		return [{
			region		: "west",
			width		: 180,
			title		: "Users",
			collapsible	: true,
			split		: true,
			items		: users
		},{
			region	: "center",
			items	: roles
		},usersRole];
	}
	
});