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
				->where(
					array(
					"U.username"	=> $params["username"],
					"P.action"		=> "access",
					"RP.value"		=> true
					)
				)
				->group_by("A.application_k")
				->order_by("A.application_parent_k","ASC");

		$rs = $this->db->get();

		return $rs->result_array();
	}
	
	public function getAll(){
		$rs = $this->db->get("applications");
		
		return $rs->result_array();
	}
	
	public function save($app){
		$success = $this->db->insert("applications",$app);
		
		if($success){
			return $this->db->insert_id();
		}else{
			return false;
		}
	}
	
	public function update($app){
		$success = $this->db->where("application_k",$app->application_k)
					->update("applications",$app);

		return $success;
	}
	
	public function remove($application_k){
		
		$this->db->where("application_k",$application_k)
					->delete("applications");
	}
	
	public function move($form){
		return $this->db->where("application_k",$form->application_k)
					->update("applications",array(
						"application_parent_k"	=> $form->application_parent_k
					));
	}
	
	public function addPermissions($id){
		$permissions = array(
			array("application_k"=>$id,"action"=>"access","name"=>"Access"),
			array("application_k"=>$id,"action"=>"view","name"=>"View"),
			array("application_k"=>$id,"action"=>"list","name"=>"List"),
			array("application_k"=>$id,"action"=>"edit","name"=>"Edit"),
			array("application_k"=>$id,"action"=>"delete","name"=>"Delete"),
			array("application_k"=>$id,"action"=>"export","name"=>"Export"),
			array("application_k"=>$id,"action"=>"print","name"=>"Print")
		);
		
		foreach($permissions as $p){
			$this->db->insert("permissions",$p);
		}
	}
	
}