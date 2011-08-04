/**
 * @class Bleext.modules.catalogs.applications.view.ConfigurationsGrid
 * @extends Ext.grid.property.Grid
 * requires 
 * @autor Crysfel Villa
 * @date Thu Aug  4 15:28:44 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.applications.view.ConfigurationsGrid",{
	extend		: "Ext.grid.property.Grid",
	
	itemId		: "configurations",
	title		: "Configurations",
	split		: true,
	collapsible	: true,
	border		: false,
	autoScroll	: true,
	
	source		: {
		iconCls	: "",
		width	: Bleext.desktop.Constants.DEFAULT_WINDOW_WIDTH,
		height	: Bleext.desktop.Constants.DEFAULT_WINDOW_HEIGHT
	},

	initComponent	: function() {
		var me = this;
		
		me.tbar = [
			{text:"Add",iconCls:"bleext-add-icon-16",action:"add-property"},
			{text:"Remove",iconCls:"bleext-delete-icon-16",action:"remove-property"}
		];
        
		me.callParent();
	}
});