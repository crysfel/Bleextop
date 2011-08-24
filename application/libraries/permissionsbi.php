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
		$actives = $this->instance->permissiondao->getRolePermissions($application_k);
		
		foreach($permissions as $permission){
			array_push($rows,array(
				"permission_k"	=> $permission["permission_k"],
				"permission"	=> $permission["name"]
			));
		}
		
		$result = array();
		foreach($rows as $row){
			foreach($actives as $role){
				if($role["permission_k"] === $row["permission_k"]){
					$row["role_".$role["role_k"]] = $role["value"];
				}
			}
			array_push($result,$row);
		}
		
		return array(
			"success"	=> true,
			"data"		=> $result
		);
	}
	
}