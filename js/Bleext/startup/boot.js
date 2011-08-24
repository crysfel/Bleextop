

if(Ext.isEmpty(Bleext.BASE_PATH)){
	Bleext.log("Please set a correct value for the 'Bleext.BASE_PATH' constant!");
	Ext.Msg.alert("Error!!","Please set a correct value for the 'Bleext.BASE_PATH' constant!");
}

Ext.Loader.setConfig({
	enabled : true,
	paths   : {
		Bleext 	: Bleext.desktop.Constants.JS_PATH+"Bleext",
		Ext		: Bleext.desktop.Constants.JS_PATH+"Ext"
	} 
});

Ext.require("Bleext.abstract.MessageBox");
Ext.require("Bleext.desktop.Application");

Ext.onReady(function(){

	Bleext.App = Ext.create("Bleext.desktop.Application",{
		name		: "Bleext.App",
		listeners	: {
			ready	: function(){
				setTimeout(function(){
					Ext.get("loading").remove();
					Ext.get("loading-mask").fadeOut({remove:true});
				},250);
			}
		}
	});
	
});
