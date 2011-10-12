/**
 * @class Bleext.desktop.LoadingModule
 * @extends Bleext.ui.ModalWindow
 * requires 
 * @autor Crysfel Villa
 * @date Thu Jul 21 15:09:28 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.desktop.LoadingModule",{
	extend		: "Bleext.abstract.ModalWindow",

	bodyCls		: "bleext-loading-module",
	layout		: "auto",
	width		: 400,
	height		: 240,
	closable	: false,
	
	initComponent	: function() {
		var me = this;
		
        me.html = "<p>Please wait, loading module...</p>";

		me.callParent();
	}
});