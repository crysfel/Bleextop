<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class  Bleext_Controller extends CI_Controller{

	function Bleext_Controller(){
		parent::__construct();
		
		$isLogged = $this->session->userdata("is_logged_in");
		if(!isset($isLogged) || $isLogged != true){
			$isAjax = $this->input->post("ajax_request");
			if(!$isAjax){
				$isAjax = $this->input->get("ajax_request");
			}
			if(isset($isAjax) && $isAjax === "true"){
				show_error("Access denied please login before access this resource",403);
			}
			redirect("login");
		}
	}
	
	function response($success,$data = array()){
		
		$data["success"] = $success;
		
		echo json_encode($data);
	}
	
	function getUser(){
		return $this->session->userdata("user");
	}
	
}