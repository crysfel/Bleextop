<?php

class Users extends Bleext_Controller{
	
	function Users(){
		parent::Bleext_Controller();
		
		$this->load->library("userbi");
	}
	
	public function getall(){
		
		$users = $this->userbi->getAll();
		
		$this->response(true,array(
			"data"	=> $users
		));
	}
	
	public function save(){
		$users = $this->input->post("users");
		
		$this->response(true,array(
			"message"	=> "Successfully saved"
		));
	}
}