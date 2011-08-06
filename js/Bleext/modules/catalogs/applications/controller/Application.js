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
	extend		: "Ext.app.Controller",
	views		: [
		"Bleext.modules.catalogs.applications.view.Viewport",
		"Bleext.modules.catalogs.applications.view.ApplicationsTree",
		"Bleext.modules.catalogs.applications.view.ApplicationForm",
		"Bleext.modules.catalogs.applications.view.ConfigurationsGrid"
	],
	models		: ["Bleext.modules.catalogs.applications.model.Application"],
	stores		: ["Bleext.modules.catalogs.applications.store.Applications"],

	init	: function() {
		this.win = this.application.win;
        this.win.add(Ext.create("Bleext.modules.catalogs.applications.view.Viewport"));

		this.control({
			"#application treepanel[itemId=applicationsTree]"	: {
				itemclick	: this.editApplication
			},
			"#application button[action=new]"	: {
				click		: this.clearForm
			},
			"#application button[action=save]"	: {
				click		: this.saveApplication
			}
		});
	},
	
	clearForm		: function(){
		var form = this.win.down("form"),
			props = this.win.down("propertygrid");
			
		form.getForm().reset();
		props.setSource({
			iconCls			: "",
			width			: Bleext.desktop.Constants.DEFAULT_WINDOW_WIDTH,
			height			: Bleext.desktop.Constants.DEFAULT_WINDOW_HEIGHT,
			shorcutIconCls	: ""
		});
	},
	
	saveApplication	: function(){
		var form = this.win.down("form"),
			props = this.win.down("propertygrid"),
			params = form.getValues(),
			tree = this.win.down("treepanel");
		
		if(form.getForm().isValid()){
			params.configurations = Ext.encode(props.getSource());	

			Bleext.Ajax.request({
				url			: Bleext.BASE_PATH+"index.php/catalogs/applications/saveapp",
				statusBar 	: this.win.statusBar,
				params		: {data:Ext.encode(params)},
				success		: function(data){
					tree.getStore().load();
				}
			});
		}else{
			this.win.statusBar.setStatus({
				text	: "There's a few error in the form, please make sure everything is fine",
				iconCls	: 'x-status-error'
			});
		}
	},
	
	editApplication	: function(tree,record){
		var form = this.win.down("form"),
			props = this.win.down("propertygrid"),
			configs = record.get("configurations") || "{}";
			
		configs = Ext.decode(configs);

		form.loadRecord(record);
		props.setSource(Ext.applyIf(configs,{
			iconCls			: "",
			width			: Bleext.desktop.Constants.DEFAULT_WINDOW_WIDTH,
			height			: Bleext.desktop.Constants.DEFAULT_WINDOW_HEIGHT,
			shorcutIconCls	: ""
		}));
	}
});