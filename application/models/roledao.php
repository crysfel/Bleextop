<?php

class RoleDAO extends CI_Model{
	
	public function getAll($params = array(0,25)){
		$rs = $this->db->query("select R.*,U.users 
								from roles R
								left join (
									select R.role_k,count(R.role_k) as users 
									from roles R
									join user_roles UR on UR.role_k=R.role_k
									group by R.role_k
								) U on U.role_k=R.role_k
								limit ?,?;",$params);
		
		return $rs->result_array();
	}
	
	public function getUsers($role_k){
		$rs = $this->db->select("U.*")
						->from("users U")
						->join("user_roles UR","UR.user_k=U.user_k")
						->where("UR.role_k",$role_k)
						->get();
						
		return $rs->result_array();
	}
	
	public function getUserCount($role_k){
		$rs = $this->db->query("select count(*) as total from roles R 
								join user_roles UR on UR.role_k=R.role_k
								where R.role_k= ?",array($role_k));
		return $rs->row_array();
	}
	
	public function getUserRole($form){
		$rs = $this->db->get_where("user_roles",array(
				"role_k"	=> $form->role_k,
				"user_k"	=> $form->user_k
			));
		return $rs->row_array();
	}
	
	public function addUser($form){
		$form->date_created = date("Y-m-d h:i:s");
		return $this->db->insert("user_roles",$form);
	}
	
	public function save($role){
		return $this->db->insert("roles",$role);
	}
	
	public function update($role){
		$this->db->where("role_k",$role->role_k);
		return $this->db->update("roles",$role);
	}
	
	public function delete($role){
		$this->db->where("role_k",$role["role_k"]);
		return $this->db->delete("roles");
	}
	
	//Get all roles that contain the given permission
	public function getByPermissions($permission_k){
		$rs = $this->db->select("RP.*,R.name")
					->from("role_permissions RP")
					->join("roles R","R.role_k=RP.role_k")
					->where("RP.permission_k",$permission_k)
					->get();
					
		return $rs->result_array();
	}
}