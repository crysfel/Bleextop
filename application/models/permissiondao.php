<?php

class PermissionDao extends CI_Model{
	
	public function get($id){
		$rs = $this->db->where("permission_k",$id)
						->get("permissions");
						
		return $rs->result_array();
	}
	public function getAll(){
		$rs = $this->db->get("permissions");
		
		return $rs->result_array();
	}
	
	public function save($data){
		$this->db->insert("permissions",$data);
	}
	
	public function update($data){
		$this->db->where("permission_k",$data->permission_k)
				->update("permissions",$data);
	}
	
	public function delete($data){
		$this->db->where("permission_k",$data["permission_k"])
				->delete("permissions");
	}
	
	public function getByApplication($application_k){
		$this->db->order_by("name asc");
		$rs = $this->db->get_where("permissions",array(
				"application_k"	=> $application_k
			));
		
		return $rs->result_array();
	}
	
	public function deleteRolePermissions($data){
		$this->db->where("role_permission_k",$data["role_permission_k"])
				->delete("role_permissions");
	}
	
	public function updateRolePermissions($data){
		return $this->db->where(array(
					"permission_k"	=> $data->permission_k,
					"role_k"		=> $data->role_k
				))
				->update("role_permissions",$data);
		
	}
	
	//add a permission to a role
	public function addRolePermissions($data){
		$this->db->insert("role_permissions",$data);
	}
	
	public function getRolePermissions($application_k){
		$rs = $this->db->select("RP.*")
						->from("role_permissions RP")
						->join("roles R","R.role_k=RP.role_k")
						->join("permissions P","P.permission_k=RP.permission_k")
						->where("P.application_k",$application_k)
						->get();

		return $rs->result_array();
	}
	
	//get application permissions for an user based in his role
	public function getUserRoleAppPermission($data){
		$rs = $this->db->select("upper(P.action) as action, RP.value")
							->from("permissions P")
							->join("role_permissions RP","RP.permission_k = P.permission_k")
							->join("roles R","R.role_k = RP.role_k")
							->join("user_roles UR","UR.role_k = R.role_k")
							->join("users U","U.user_k = UR.user_k")
							->where(array(
								"P.application_k" 	=> $data["application_k"],
								"U.user_k" 			=> $data["user_k"]
							))
							->get();
							
		return $rs->result_array();
	}
}