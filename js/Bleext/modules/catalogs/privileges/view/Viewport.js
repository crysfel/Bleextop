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
			roles = Ext.create("Bleext.modules.catalogs.roles.view.RolesView");
			
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
		},{
			region		: "east",
			width		: 150,
			title		: "Select a role",
			hideCollapseTool: true,
			collapsible	: true,
			collapsed	: true
		}];
	}
	
});