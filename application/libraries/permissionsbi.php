<?php

require_once(BASEPATH.'../application/core/BleextBI'.EXT);

class PermissionsBI extends BleextBI{
	
	function PermissionsBI(){
		parent::BleextBI();
		
		$this->instance->load->model("permissiondao");
		$this->instance->load->model("roledao");
	}
	
	public function getAll(){
		return $this->instance->permissiondao->getAll();
	}
	
	public function getByApplication($application_k){
		$rows = array();
		$permissions = $this->instance->permissiondao->getByApplication($application_k);
		//$roles = $this->instance->roledao->getAll();
		
		foreach($permissions as $permission){
			array_push($rows,array(
				"permission_k"	=> $permission["permission_k"],
				"permission"	=> $permission["name"]
			));
		}
		
		return array(
			"success"	=> true,
			"data"		=> $rows
		);
	}
	
}