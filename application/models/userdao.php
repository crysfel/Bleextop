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
	
	function getAll($params = array(0,25)){
		$rs = $this->db->query("select U.*,(select count(*) from users) as total from users U limit ?,?",$params);

		return $rs->result_array();
	}
}