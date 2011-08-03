<?php

class UserDAO extends CI_Model{
	
	function validate($data){
		$this->db->where($data);
		$rs = $this->db->get("users");

		return $rs->num_rows === 1;
	}
	
	function getUser($data){
		$this->db->where($data);
		$rs = $this->db->get("users");

		return $rs->row_array();
	}
	
	function getAll(){
		$rs = $this->db->get("users");
		//$this->db->query("select * from (select campo1,campo2 from tabla) B where nombre=$nombre");
		return $rs->result_array();
	}
}