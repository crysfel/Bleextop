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
			store,model;
		
		for(var i=0,len=roles.data.length;i<len;i++){
			var role = roles.data[i];
			columns.push({header:role.name,dataIndex:"role_"+role.role_k,width:100,renderer:this.showIcon,scope:this});
			fields.push({name:"role_"+role.role_k,defaultValue:false,convert:function(value){if(typeof value === "boolean"){return value;}else{return value === "1";}}});
		}
		columns.unshift({header:"Permission",dataIndex:"permission",width:150,locked:true});
		fields.unshift("permission");
		fields.unshift("permission_k");

		Ext.define("Bleext.modules.security.permissions.model.PermissionGroup",{
			extend 		: "Ext.data.Model",
			fields		: fields,
			idProperty	: "permission_k"
		});
		
		store = Ext.create("Bleext.modules.security.permissions.store.Permissions",{
			model : "Bleext.modules.security.permissions.model.PermissionGroup"
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