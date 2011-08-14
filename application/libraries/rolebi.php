<?php

require_once(BASEPATH.'../application/core/BleextBI'.EXT);

class RoleBI extends BleextBI{
	
	function RoleBI(){
		parent::BleextBI();
		
		$this->instance->load->model("roledao");
		$this->roledao = $this->instance->roledao;
	}
	
	public function addUser($form){
		$user = $this->roledao->getUserRole($form);

		$success = true;
		if(count($user) === 0){
			$success = $this->roledao->addUser($form);
		}
		
		if($success){
			$obj = $this->roledao->getUserCount($form->role_k);
			return array("success"=>true,"total"=>$obj["total"],"message"=>"User successfully added to the role");
		}else{
			return array("success"=>false,"message"=>"There was an error adding the user to the role, please try again");
		}
	}
	
	public function getUsers($role_k){
		return $this->roledao->getUsers($role_k);
	}
	
}