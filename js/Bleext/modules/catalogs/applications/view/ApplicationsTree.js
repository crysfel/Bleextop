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

	initComponent	: function() {
		var me = this;
		
		me.store = Ext.create("Bleext.modules.catalogs.applications.store.Applications");
		
		
		me.callParent();
	},
	
	setAppIcon		: function(value,metadata,record){
		try{
			var cfg = Ext.decode(record.get("configurations"));
		}catch(e){
			var cfg = {iconCls:""};
		}
		
		//if doesn't have a controller class then it's a folder
		if(Ext.isEmpty(record.get("class"))){
			cfg.iconCls = "bleext-folder-icon";
		}
		
		return '<img src="'+Ext.BLANK_IMAGE_URL+'" class="'+cfg.iconCls+'" style="width:16px;height16px;vertical-align:middle;margin-right:10px;" /> '+value;
	}
});