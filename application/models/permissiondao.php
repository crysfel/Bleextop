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
	
	public function delete(){
		$this->db->where("permission_k",$data->permission_k)
				->delete("permissions");
	}
	
	public function getByApplication($application_k){
		$rs = $this->db->get_where("permissions",array(
				"application_k"	=> $application_k
			));
		
		return $rs->result_array();
	}
	
}