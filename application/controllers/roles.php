<?php

class Roles extends Bleext_Controller{
	
	public function getAllRoles(){
		$this->load->model("roledao");
		
		$this->response(true,array(
			"data"	=> $this->roledao->getAllRoles()
		));
		
	}
	
	public function saveRoles(){
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
	
	public function deleteRoles(){
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
}