<?php

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller{
	
	function index(){
		$this->load->view("welcome");
	}
	
	function logout(){
		$this->session->sess_destroy(); 
		$this->index();
	}
	
	function validate(){
		$this->load->model("userdao");
		
		$data = array(
			"username"	=> $this->input->post("username"),
			"password"	=> md5($this->input->post("password"))
		);
		
		$isValid = $this->userdao->validate($data);
		
		if($isValid){
			$user = $this->userdao->getUser($data);
			unset($user["password"]);
			
			$this->session->set_userdata(array(
				"user"			=> $user,
				"is_logged_in"	=> true
			));
			
			echo json_encode(array(
				"success"	=> true,
				"url"		=> "index.php/desktop/home"
			));
		}else{
			echo json_encode(array(
				"success"	=> false,
				"message"	=> "Wrong credentials"
			));
		}
	}
	
}