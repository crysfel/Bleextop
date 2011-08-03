<?php

class RoleDAO extends CI_Model{
	
	public function getAllRoles(){
		//$rs = $this->db->get("roles");
		$rs = $this->db->query("select * from roles");
		
		return $rs->result_array();
	}
	
	public function save($role){
		$this->db->insert("roles",array(
			"name"			=> $role->nombre,
			"description"	=> $role->descripcion
		));
		
	}
	
	public function update($role){
		$this->db->where("role_k",$role->role_k);
		$this->db->update("roles",array(
			"name"			=> $role->nombre,
			"description"	=> $role->descripcion
		));
		
	}
	
	public function delete($role){
		$this->db->where("role_k",$role->role_k);
		$this->db->delete("roles");
	}
}