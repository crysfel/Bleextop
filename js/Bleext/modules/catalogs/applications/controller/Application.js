/**
 * @class Bleext.modules.catalogs.applications.controller.Application
 * @extends Ext.app.Controller
 * requires requires
 * @autor Crysfel Villa
 * @date Tue Aug  2 01:00:19 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.applications.controller.Application",{
	extend		: "Bleext.abstract.Controller",
	views		: [
		"Bleext.modules.catalogs.applications.view.Viewport",
		"Bleext.modules.catalogs.applications.view.ApplicationsTree",
		"Bleext.modules.catalogs.applications.view.ApplicationForm",
		"Bleext.modules.catalogs.applications.view.ConfigurationsGrid"
	],
	models		: ["Bleext.modules.catalogs.applications.model.Application"],
	stores		: ["Bleext.modules.catalogs.applications.store.Applications"],

	init	: function(){
		this.callParent();
		
		this.control({
			"treepanel[itemId=applicationsTree]"	: {
				itemclick	: this.editApplication,
				itemmove	: this.changeParent
			}
		});
	},
	
	add		: function(){
		var form = this.win.down("form"),
			props = this.win.down("propertygrid"),
			tree = this.win.down("treepanel"),
			nodes = tree.getSelectionModel().getSelection();

		form.getForm().reset();
		if(!Ext.isEmpty(nodes)){
			form.getForm().setValues({application_parent_k:nodes[0].get("application_k")});
		}
		props.setSource({
			iconCls			: "",
			width			: Bleext.desktop.Constants.DEFAULT_WINDOW_WIDTH,
			height			: Bleext.desktop.Constants.DEFAULT_WINDOW_HEIGHT,
			shorcutIconCls	: ""
		});
	},
	
	save	: function(){
		var form = this.win.down("form"),
			props = this.win.down("propertygrid"),
			params = form.getValues(),
			tree = this.win.down("treepanel");
		
		if(form.getForm().isValid()){
			var obj = props.getSource();
			obj.singleton = params.singleton;
			params.configurations = Ext.encode(obj);	
			delete params.singleton;
			
			Bleext.Ajax.request({
				url			: Bleext.BASE_PATH+"index.php/catalogs/applications/saveapp",
				statusBar 	: this.win.statusBar,
				params		: {data:Ext.encode(params)},
				success		: function(data){
					tree.getStore().load();
					form.getForm().setValues({application_k:data.application_k});
				}
			});
		}else{
			this.win.statusBar.setStatus({
				text	: "There's a few error in the form, please make sure everything is fine",
				iconCls	: 'x-status-error'
			});
		}
	},
	
	remove			: function(){
		var tree = this.win.down("treepanel"),
			nodes = tree.getSelectionModel().getSelection();
		if(Ext.isEmpty(nodes)){
			this.showError("You need to select an application to delete.");
			return false;
		}
		
		if(!Ext.isEmpty(nodes[0].childNodes)){
			this.showError("You you can't delete a folder that contains applications, delete applications first.");
			return false;
		}
		
		Bleext.Msg.confirm("Are you sure you want to delete this application?",function(btn){
			if(btn === "yes"){
				var form = this.win.down("form");
				
				Bleext.Ajax.request({
					url		: Bleext.BASE_PATH+"index.php/catalogs/applications/remove",
					params	: {application_k:form.getForm().getValues().application_k},
					statusBar : this.win.statusBar,
					success		: function(data){
						tree.getStore().load();
						form.getForm().reset();
					}
				});
			}
		},this);
	},
	
	editApplication	: function(tree,record){
		var form = this.win.down("form"),
			props = this.win.down("propertygrid"),
			configs = record.get("configurations") || "{}";
			
		configs = Ext.decode(configs);
		record.data.singleton = configs.singleton === 1;

		form.loadRecord(record);
		props.setSource(Ext.applyIf(configs,{
			iconCls			: "",
			width			: Bleext.desktop.Constants.DEFAULT_WINDOW_WIDTH,
			height			: Bleext.desktop.Constants.DEFAULT_WINDOW_HEIGHT,
			shorcutIconCls	: ""
		}));
	},
	
	changeParent	: function(application,oldParent,newParent,index,options){
		var tree = this.win.down("treepanel"),
			values = {
				application_k		: application.get("application_k"),
				application_parent_k: newParent.get("application_k")
			};
			
		Bleext.Ajax.request({
			url		: Bleext.BASE_PATH+"index.php/catalogs/applications/move",
			params	: {app:Ext.encode(values)},
			el		: tree.el,
			statusBar: this.win.statusBar
		});
	},
	
	setViewport		: function(){
        this.win.add(Ext.create("Bleext.modules.catalogs.applications.view.Viewport"));
	}
});