<?php

class ApplicationDAO extends CI_Model{
	
	public function getApplications($params){
		
		$this->db->select("A.*")
				 ->from("applications A")
				 ->join("applications_actions AA","A.application_k=AA.application_k")
				 ->join("applications_actions_roles AAR","AA.application_action_k=AAR.application_action_k")
				 ->join("roles R","R.role_k=AAR.role_k")
				 ->join("users U","U.role_k=R.role_k")
				 ->where("U.username",$params["username"])
				 ->order_by("A.application_parent_k","ASC");

		$rs = $this->db->get();

		return $rs->result_array();
	}
	
	public function getAll(){
		$rs = $this->db->get("applications");
		
		return $rs->result_array();
	}
	
}