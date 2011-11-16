<?php

class Permissions extends Bleext_Controller{
	
	function Permissions(){
		parent::Bleext_Controller();
		
		$this->load->library("permissionsbi");
	}
	
	public function getAll(){
		
		$this->response(true,array(
			"data"	=> $this->permissionsbi->getAll()
		));
	}
	
	public function getByApplication(){
		$application_k = $this->input->post("application_k");
		
		$r = $this->permissionsbi->getByApplication($application_k);
		
		$this->response($r["success"],$r);
	}
	
	public function save(){
		$permissions = json_decode($this->input->post("permissions"));
		
		$r = $this->permissionsbi->updatePermissions($permissions);
		
		$this->response($r["success"],$r);
	}
	
	public function getForCurrentUserApplication(){
		$application_k = $this->input->post("application_k");
		
		$r = $this->permissionsbi->getByUserApplication(array(
			"user"			=> $this->getUser(),
			"application_k"	=> $application_k
		));
		
		$this->response($r["success"],$r);
	}
	
}