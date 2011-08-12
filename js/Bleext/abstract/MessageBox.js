/**
 * @class Bleext.abstract.MessageBox
 * @extends Ext.Msg
 * @autor Crysfel Villa
 * @date Fri Jul 29 10:15:49 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.abstract.MessageBox",{
	extend 				: "Ext.window.MessageBox",
	alternateClassName	: "Bleext.Msg",
	singleton			: true,
	
	alert	: function(message){
		this.show({
			title	: "Alert",
			modal	: true,
			icon	: Ext.Msg.WARNING,
			buttons	: Ext.Msg.OK,
			msg		: message
		});
	},
	
	info	: function(message){
		this.show({
			title	: "Information",
			modal	: true,
			icon	: Ext.Msg.INFO,
			buttons	: Ext.Msg.OK,
			msg		: message
		});
	},
	
	error	: function(message){
		this.show({
			title	: "Error",
			modal	: true,
			icon	: Ext.Msg.ERROR,
			buttons	: Ext.Msg.OK,
			msg		: message
		});
	},
	
	warning	: function(message){
		this.show({
			title	: "Warning",
			modal	: true,
			icon	: Ext.Msg.WARNING,
			buttons	: Ext.Msg.OK,
			msg		: message
		});
	},
	
	confirm	: function(message,callback,scope){
		this.show({
			title	: "Confirm",
			modal	: true,
			icon	: Ext.Msg.QUESTION,
			buttons	: Ext.Msg.YESNO,
			msg		: message,
			fn		: callback || Ext.emptyFn,
			scope	: scope || this
		});
	}
	
});