/**
 * @class CRM.catalogs.roles.controller.Roles
 * @extends Ext.app.Controller
 * @autor Crysfel Villa
 * @date Thu Jul 28 10:00:03 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.roles.controller.Roles",{
	extend 	: "Bleext.abstract.Controller",
	views	: [
		"Bleext.modules.catalogs.roles.view.Viewport",
		"Bleext.modules.catalogs.roles.view.RolesGrid",
		"Bleext.modules.catalogs.roles.view.RoleForm"
	],
	stores	: ["Bleext.modules.catalogs.roles.store.Roles"],
	models	: ["Bleext.modules.catalogs.roles.model.Role"],
	
	init	: function(app){
		this.win.add(Ext.create("Bleext.modules.catalogs.roles.view.Viewport"));
		
		this.control({
			"#roles button[action=new]"	: {
				click	: this.addRole
			},
			"#roles button[action=save]" : {
				click	: this.saveRole
			},
			"#roles button[action=delete]":{
				click	: this.deleteRole
			}
		});
	},
	
	addRole	: function(){
		var grid = this.win.down("panel[region=center]"),
			store = grid.getStore();
			
		store.insert(0,{});
		grid.editingPlugin.startEdit(0,0);
	},
	
	saveRole	: function(){
		var grid = this.win.down("panel[region=center]"),
			store = grid.getStore(),
			records = Ext.Array.merge(store.getNewRecords(),store.getUpdatedRecords()),
			data = [];
			
		Ext.each(records,function(rec,i){
			data.push(rec.data);
		});	
		
		Bleext.Ajax.request({
			url		: Bleext.BASE_PATH+"index.php/roles/saveRoles",
			params	: {roles : Ext.encode(data)},
			el		: this.win.el,
			success	: function(info,options){
				Ext.Msg.alert("Mensaje",info.message);
				store.load();
			},
			failure	: function(info){
				Bleext.log(info);
				Ext.Msg.alert("Error","No se guardaron los roles!");
			}
		});
	},
	
	deleteRole	: function(){
		var grid = this.win.down("panel[region=center]"),
			store = grid.getStore(),
			sm = grid.getSelectionModel();
			
		if(sm.hasSelection()){
			Ext.Msg.confirm(
				"Confirmación",
				"Estás seguro de querer borrar estos registros?",
				function(btn){
					if(btn === "yes"){
						var records = sm.getSelection(),	//tomar los resocords seleccionados
							data = [];
						
						Ext.each(records,function(rec){
							if(!rec.phantom){
								//capturar los registros que si existen en el servidor
								data.push(rec.data);
							}
						});//end each
						
						//enviar al servidor para ser borrados
						Bleext.Ajax.request({
							url		: Bleext.BASE_PATH+"roles/deleteRoles",
							params	: {roles:Ext.encode(data)},
							success	: function(info){
								Bleext.Msg.info(info.message);
							},
							failure	: function(info){
								Bleext.Msg.error(info.message);
								store.load();
							}
						});
						
						//eliminar todos los records seleccionados
						store.remove(records);
						
						
					}
				}
			);
		}
	}
});