<?php

class Applications extends Bleext_Controller{
	
	public $permissions = array(
		"getAll"	=> "permissions_read",
		"getActives"=> "permissions_read",
		"saveapp"		=> array("permissions_create","permissions_update"),
		"remove"	=> "application_permission_delete"
	);
	
	function Applications(){
		parent::Bleext_Controller();
		
		$this->load->library("applicationbi");
	}
	
	public function getActives(){
		$list = $this->input->post("list");
		if($list){
			$result = array(
				"data"		=> array()
			);
		}else{
			$result = array(
				"text"		=> "Applications",
				"expanded"	=> true,
				"children"	=> $this->applicationbi->getTree()
			);
		}
		
		$this->response(true,$result);
	}
	
	public function saveapp(){
		$form = json_decode($this->input->post("data"));
		
		if($form->application_k){
			$r = $this->applicationbi->update($form);
		}else{
			$r = $this->applicationbi->save($form);
		}
		
		
		$this->response($r["success"],$r);
	}
	
	public function remove(){
		$application_k = $this->input->post("application_k");
		
		if($application_k){
			$this->applicationbi->remove($application_k);
		}
		$this->response(true);
	}
	
	public function move(){
		$form = json_decode($this->input->post("app"));
		
		$r = $this->applicationbi->move($form);
		
		$this->response($r["success"],$r);
	}
}