/**
 * @class Bleext.modules.catalogs.applications.view.ApplicationsGrid
 * @extends Bleext.abstract.Grid
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug  2 01:12:14 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.applications.view.ApplicationsGrid",{
	extend		: "Ext.tree.Panel",
	requires	: ["Bleext.modules.catalogs.applications.store.Applications"],
	
	itemId		: "applicationsGrid",
	title		: "Applications",
	split		: true,
	collapsible	: true,
	border		: false,
	useArrows	: true,
	rootVisible	: false,
	multiSelect	: true,
	singleExpand: true,

	initComponent	: function() {
		var me = this;
		
		me.store = Ext.create("Bleext.modules.catalogs.applications.store.Applications");
		
		me.columns = [
			{xtype:"treecolumn",text:"Name",dataIndex:"name",width:180},
			{text:"Description",dataIndex:"description",flex:1},
			{text:"Class",dataIndex:"class",flex:1}
		];
        
		me.callParent();
	}
});