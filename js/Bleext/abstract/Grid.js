/**
 * @class Bleext.abstract.Grid
 * @extends Ext.grid.Panel
 * requires 
 * @autor Crysfel Villa
 * @date Thu Jul 21 19:13:29 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.abstract.Grid",{
	extend		: "Ext.grid.Panel",
	
	border		: false,
	
	initComponent	: function() {
		var me = this;
		
		me.dockedItems = [{
			xtype		: "pagingtoolbar",
			store		: me.store,
			dock		: "bottom",
			displayInfo	: true
	    }];
        
		me.callParent();
	}
});