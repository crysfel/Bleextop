<?php

class RoleDAO extends CI_Model{
	
	public function getAll(){
		$rs = $this->db->get("roles");
		
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