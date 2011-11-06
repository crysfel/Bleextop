/**
 * @class Bleext.modules.catalogs.applications.view.ApplicationsTree
 * @extends Bleext.abstract.Tree
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug  2 01:12:14 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.applications.view.ApplicationsTree",{
	extend		: "Bleext.abstract.Tree",
	
	itemId		: "applicationsTree",
	title		: "Applications",
	split		: true,
	collapsible	: true,
	border		: false,
	multiSelect	: false,
	rootVisible	: false,
	full		: true,
	viewConfig	: {
		plugins	: {
			ptype: "treeviewdragdrop"
		}
	},

	initComponent	: function() {
		var me = this;
		
		me.store = Ext.create("Bleext.modules.catalogs.applications.store.Applications");
		
		
		me.callParent();
	}
});