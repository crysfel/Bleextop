/**
 * @class Bleext.abstract.TreeStore
 * @extends Ext.data.TreeStore
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug  2 14:01:18 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.abstract.TreeStore",{
	extend		: "Ext.data.TreeStore",
	
	autoLoad	: true,
	folderSort	: true,
	
	constructor	: function() {
		var me = this;
		
        me.proxy = {
			type	: "ajax",
			url		: Bleext.BASE_PATH + "index.php/"+me.url,
			params	: this.params
		};
		
		me.callParent();
	}
});