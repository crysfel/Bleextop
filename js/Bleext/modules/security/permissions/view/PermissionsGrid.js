/**
 * @class Bleext.modules.security.permissions.view.PermissionsView
 * @extends Ext.view.View
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug 16 13:33:56 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.security.permissions.view.PermissionsGrid",{
	extend		: "Bleext.abstract.Grid",
	store		: "Bleext.modules.security.permissions.store.Permissions",
	
	paging		: false,
	
	initComponent	: function() {
		var me = this;
		
		me.columns = [
			{header:"Permission",dataIndex:"permission",width:150,locked:true}
		];
		
		me.selType = "cellmodel";
		
		me.callParent();
	},
	
	buildColumns	: function(roles){
		var columns = [],
			fields = [],
			store;
		
		for(var i=0,len=roles.data.length;i<len;i++){
			var role = roles.data[i];
			columns.push({header:role.name,dataIndex:"role_"+role.role_k,width:100,renderer:this.showIcon,scope:this});
			fields.push("role_"+role.role_k);
		}
		columns.unshift({header:"Permission",dataIndex:"permission",width:150,locked:true});
		fields.unshift("permission");

		store = Ext.create("Bleext.modules.security.permissions.store.Permissions",{
			fields	: fields
		});
		
		this.reconfigure(store,columns);
	},
	
	showIcon		: function(value,metadata,record){
		var icon = "bleext-failure-icon-16";
		if(value){
			icon = "bleext-success-icon-16";
		}
		
		return '<img src="'+Ext.BLANK_IMAGE_URL+'" class="bleext-permission-icon '+icon+'" />';
	}
});