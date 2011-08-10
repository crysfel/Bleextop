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
	
	public function save($role){
		$this->db->insert("roles",$role);
		
	}
	
	public function update($role){
		$this->db->where("role_k",$role->role_k);
		$this->db->update("roles",$role);
		
	}
	
	public function delete($role){
		$this->db->where("role_k",$role->role_k);
		$this->db->delete("roles");
	}
}