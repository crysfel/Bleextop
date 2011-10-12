/**
 * @class CRM.abstract.Viewport
 * @extends Ext.panel.Panel
 * requires 
 * @autor Crysfel Villa
 * @date Fri Jul 22 13:26:32 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.abstract.Viewport",{
	extend		: "Ext.panel.Panel",
	
	layout		: "border",
	height		: 400,
	autoScroll	: true,

	initComponent	: function() {
		this.tbar = this.buildTopButtons();
        this.items = this.buildItems();
		this.callParent();
		
	},
	
	buildItems		: function(){
		return [{
			region	: "center",
			border	: false,
			html	: "Please override the 'buildItems' method in your subclass!"
		}];
	},
	
	buildTopButtons	: function(){
		return [{
			xtype	: "buttongroup",
			title	: "Actions",
			defaults: {scale: 'large',iconAlign:"top",width:45},
			items	: [{
				text 	: "New",
				action	: "new",
				iconCls	: "new-action-icon"
			},{
				text	: "Save",
				action	: "save",
				iconCls	: "save-action-icon"
			},{
				text	: "Delete",
				action	: "delete",
				disabled: true,
				iconCls	: "delete-action-icon"
			}]
		},{
			xtype	: "buttongroup",
			title	: "Export",
			defaults: {scale: 'large',iconAlign:"top",width:45},
			items	: [{
				text	: "Excel",
				action	: "export",
				iconCls	: "export-action-icon"
			},{
				text	: "Print",
				action	: "print",
				iconCls	: "print-action-icon"
			}]
		}];
	}
});