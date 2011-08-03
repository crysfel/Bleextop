<?php

class Users extends Bleext_Controller{
	
	public function getall(){
		$this->load->model("userdao");
		
		$users = $this->userdao->getAll();
		
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