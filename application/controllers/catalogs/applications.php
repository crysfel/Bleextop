<?php

class Applications extends Bleext_Controller{
	
	public $permissions = array(
		"getAll"	=> "permissions_read",
		"getActives"=> "permissions_read",
		"save"		=> "permissions_save",
		"delete"	=> "permissions_delete"
	);
	
	function Applications(){
		parent::Bleext_Controller();
		
		$this->load->library("applicationbi");
	}
	
	public function getAll(){
		
		
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
			$this->applicationbi->update($form);
		}else{
			$this->applicationbi->save($form);
		}
		
		
		$this->response(true);
	}
	
}