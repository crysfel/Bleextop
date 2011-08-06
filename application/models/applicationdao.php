<?php

class ApplicationDAO extends CI_Model{
	
	public function getApplications($params){
		
		$this->db->select("A.*")
				->from("applications A")
				->join("permissions P","P.application_k=A.application_k")
				->join("role_permissions RP","RP.permission_k=P.permission_k")
				->join("roles R","R.role_k=RP.role_k")
				->join("user_roles UR","UR.role_k=R.role_k")
				->join("users U","U.user_k=UR.user_k")
				->where("U.username",$params["username"])
				->order_by("A.application_parent_k","ASC");

		$rs = $this->db->get();

		return $rs->result_array();
	}
	
	public function getAll(){
		$rs = $this->db->get("applications");
		
		return $rs->result_array();
	}
	
	public function save($app){
		$this->db->insert("applications",$app);
	}
	
	public function update($app){
		
		$this->db->where("application_k",$app->application_k)
					->update("applications",$app);
	}
	
}