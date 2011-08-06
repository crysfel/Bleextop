<?php

class Permissions extends Bleext_Controller{

	public $permissions = array(
		"getAll"	=> "permissions_read",
		"save"		=> "permissions_save",
		"delete"	=> "permissions_delete"
	);
	
	function Permissions(){
		parent::Bleext_Controller();
		
		$this->load->library("permissionsbi");
	}
	
	public function getAll(){
		
		$this->response(true,array(
			"data"	=> $this->permissionsbi->getAll()
		));
	}
	
}