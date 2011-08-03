/**
 * @class Bleext.ui.Form
 * @extends Ext.form.Panel
 * @autor Crysfel Villa
 * @date Sun Jul 10 17:08:54 CDT 2011
 *
 * Form panel
 *
 **/


Ext.define("Bleext.abstract.Form",{
	extend 			: "Ext.form.Panel",
	
	columns			: 1,
	border			: false,
	defaultType		: 'textfield',
	fieldDefaults	: {
		labelAlign	: 'left',
		msgTarget	: 'side',
		width		: 180
	},
	layout			: {
		type	: 'table'
	},
	bodyPadding	: 5,

	initComponent	: function(){
		this.layout.columns = this.columns;
		this.callParent();
	}
});