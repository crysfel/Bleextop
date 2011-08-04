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
		"Bleext.modules.catalogs.applications.view.ApplicationsGrid",
		"Bleext.modules.catalogs.applications.view.ApplicationForm",
		"Bleext.modules.catalogs.applications.view.ConfigurationsGrid"
	],
	models		: ["Bleext.modules.catalogs.applications.model.Application"],
	stores		: ["Bleext.modules.catalogs.applications.store.Applications"],

	init	: function() {
		this.win = this.application.win;
        this.win.add(Ext.create("Bleext.modules.catalogs.applications.view.Viewport"));

		this.control({
			"#application treepanel[itemId=applicationsGrid]"	: {
				itemclick	: this.editApplication
			}
		});
	},
	
	editApplication	: function(tree,record){
		var form = this.win.down("form"),
			props = this.win.down("propertygrid"),
			configs = record.get("configurations") || "{}";
			
		configs = Ext.decode(configs);

		form.loadRecord(record);
		props.setSource(Ext.applyIf(configs,{
			width	: Bleext.desktop.Constants.DEFAULT_WINDOW_WIDTH,
			height	: Bleext.desktop.Constants.DEFAULT_WINDOW_HEIGHT
		}));
	}
});