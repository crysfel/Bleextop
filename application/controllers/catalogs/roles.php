<?php

class Roles extends Bleext_Controller{
	
	public $permissions = array(
		"getAll"	=> "permissions_read",
		"remove"	=> "role_permission_delete",
		"adduser"	=> "role_permission_adduser"
	);
	
	function Roles(){
		parent::Bleext_Controller();
		
		$this->load->library("rolebi");
	}
	
	public function getAll(){
		$this->load->model("roledao");
		
		$this->response(true,array(
			"data"	=> $this->roledao->getAll()
		));
		
	}
	
	public function save(){
		$this->load->model("roledao");
		
		$roles = $this->input->post("roles");
		$roles = json_decode($roles);
		
		foreach($roles as $role){
			if($role->role_k !== ""){
				$this->roledao->update($role);
			}else{
				$this->roledao->save($role);
			}
			
		}
		
		$this->response(true,array(
			"message"	=> "Roles guardados con éxito"
		));
	}
	
	public function adduser(){
		$form = json_decode($this->input->post("form"));
		
		$r = $this->rolebi->addUser($form);
		
		$this->response($r["success"],$r);
	}
	
	public function remove(){
		$this->load->model("roledao");
		
		$roles = $this->input->post("roles");
		$roles = json_decode($roles);
		
		foreach($roles as $role){
			if($role->role_k !== ""){
				$this->roledao->delete($role);
			}
		}
		
		$this->response(true,array(
			"message"	=> "Roles borrados con éxito"
		));
	}
	
	public function getusers(){
		$role_k = $this->input->post("role_k");
		
		$this->response(true,array(
			"data"	=> $this->rolebi->getUsers($role_k)
		));
	}
}