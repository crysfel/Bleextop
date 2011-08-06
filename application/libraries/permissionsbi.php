<?php

require_once(BASEPATH.'../application/core/BleextBI'.EXT);

class PermissionsBI extends BleextBI{
	
	function PermissionsBI(){
		parent::BleextBI();
		
		$this->instance->load->model("permissiondao");
	}
	
	public function getAll(){
		return $this->instance->permissiondao->getAll();
	}
	
}