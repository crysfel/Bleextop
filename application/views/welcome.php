<!DOCTYPE html>
<html>
<head>
	<title>Login - Bleextop</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<link rel="stylesheet" href="<?php echo base_url(); ?>themes/default/css/login.css" type="text/css" media="screen" charset="utf-8">	
	
	<script src="<?php echo base_url(); ?>js/Bleext/Bleext.js" type="text/javascript" charset="utf-8"></script>	
	<script type="text/javascript">
		Bleext.BASE_PATH = "<?php echo base_url(); ?>";
	</script>
	
</head>
<body>
	
	<div id="loading">
		<img src="<?php echo base_url(); ?>themes/default/images/loading.gif" width="120" height="120" alt="Loading..." />
		<p id="msg">Please wait: Loading styles...</p>
	</div>
	<link rel="stylesheet" href="<?php echo base_url(); ?>js/Ext/resources/css/ext-all.css" type="text/css" media="screen" charset="utf-8" />
	<link rel="stylesheet" href="<?php echo base_url(); ?>themes/default/css/bleextop.css" type="text/css" media="screen" title="no title" charset="utf-8">

	<script type="text/javascript">document.getElementById('msg').innerHTML = 'Please wait: Loading ExtJS files';</script> 
	
	<script src="<?php echo base_url(); ?>js/Ext/ext-all-debug.js" type="text/javascript" charset="utf-8"></script>
	<script src="<?php echo base_url(); ?>js/Bleext/core/Ajax.js" type="text/javascript" charset="utf-8"></script>
	<script src="<?php echo base_url(); ?>js/Bleext/core/Log.js" type="text/javascript" charset="utf-8"></script>
	<script src="<?php echo base_url(); ?>js/Bleext/desktop/Constants.js" type="text/javascript" charset="utf-8"></script>
	
	<script type="text/javascript">document.getElementById('msg').innerHTML = 'Please wait: Building user interface';</script> 
	
	<script src="<?php echo base_url(); ?>js/Bleext/modules/login/startup.js" type="text/javascript" charset="utf-8"></script>
	
</body>
</html>