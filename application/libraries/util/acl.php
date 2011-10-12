<?php

class ACL{
	var $perms = array();		//Array : Stores the permissions for the user
	var $userID;				//Integer : Stores the ID of the current user
	var $userRoles = array();	//Array : Stores the roles of the current user
	var $ci;
	
	function ACL($config=array()) {
		$this->ci = &get_instance();

		$this->userID = floatval($config['user_k']);
		$this->userRoles = $this->getUserRoles();
		$this->buildACL();
	}

	function buildACL() {
		//first, get the rules for the user's role
		if (count($this->userRoles) > 0){
			$this->perms = array_merge($this->perms,$this->getRolePerms($this->userRoles));
		}
		//then, get the individual user permissions
		$this->perms = array_merge($this->perms,$this->getUserPerms($this->userID));
	}

	function getPermKeyFromID($permID) {

		$this->ci->db->select('action');
		$this->ci->db->where('permission_k',floatval($permID));
		$sql = $this->ci->db->get('permissions',1);
		$data = $sql->result();
		
		return $data[0]->action;
	}

	function getPermNameFromID($permID) {
		//SELECT name FROM permissions WHERE permission_k = ? LIMIT 1
		$this->ci->db->select('name');
		$this->ci->db->where('permission_k',floatval($permID));
		$sql = $this->ci->db->get('permissions',1);
		$data = $sql->result();
		
		return $data[0]->name;
	}

	function getRoleNameFromID($roleID) {
		//SELECT name FROM roles WHERE role_k = ? LIMIT 1
		$this->ci->db->select('name');
		$this->ci->db->where('role_k',floatval($roleID),1);
		$sql = $this->ci->db->get('roles');
		$data = $sql->result();
		
		return $data[0]->name;
	}

	function getUserRoles() {
		//select * from user_roles where user_k = ? order by date_created asc
		$this->ci->db->where(array('user_k'=>floatval($this->userID)));
		$this->ci->db->order_by('date_created','asc');
		$rs = $this->ci->db->get('user_roles');
		$data = $rs->result();

		$resp = array();
		foreach( $data as $row ){
			$resp[] = $row->user_k;
		}
		return $resp;
	}

	function getAllRoles($format='ids') {
		$format = strtolower($format);
		//SELECT * FROM roles ORDER BY name ASC
		$this->ci->db->order_by('name','asc');
		$sql = $this->ci->db->get('roles');
		$data = $sql->result();

		$resp = array();
		foreach( $data as $row ){
			if ($format == 'full')
			{
				$resp[] = array("id" => $row->ID,"name" => $row->name);
			} else {
				$resp[] = $row->role_k;
			}
		}
		return $resp;
	}

	function getAllPerms($format='ids') {
		$format = strtolower($format);
		//SELECT * FROM permissions ORDER BY action ASC";

		$this->ci->db->order_by('action','asc');
		$sql = $this->ci->db->get('permissions');
		$data = $sql->result();

		$resp = array();
		foreach( $data as $row ){
			if ($format == 'full'){
				$resp[$row->action] = $row;
			} else {
				$resp[] = $row->permission_k;
			}
		}
		return $resp;
	}

	function getRolePerms($role) {
		if (is_array($role)){
			//SELECT * FROM role_permissions WHERE role_k IN (?,?,?) ORDER BY role_permission_k ASC
			$this->ci->db->where_in('role_k',$role);
		} else {
			//SELECT * FROM role_permissions WHERE role_k = ? ORDER BY role_permission_k ASC
			$this->ci->db->where(array('role_k'=>floatval($role)));

		}
		$this->ci->db->order_by('role_permission_k','asc');
		$rs = $this->ci->db->get('role_permissions');
		
		$data = $rs->result();
		$perms = array();
		
		foreach( $data as $row ){
			$pK = strtolower($this->getPermKeyFromID($row->permission_k));
			if ($pK == '') { continue; }
			if ($row->value === '1') {
				$hP = true;
			} else {
				$hP = false;
			}
			$perms[$pK] = array('perm' => $pK,'inheritted' => true,'value' => $hP,'name' => $this->getPermNameFromID($row->permission_k),'permission_k' => $row->permission_k);
		}
		return $perms;
	}

	function getUserPerms($userID) {
		//SELECT * FROM user_permissions WHERE user_k = ? ORDER BY date_created ASC";

		$this->ci->db->where('user_k',floatval($userID));
		$this->ci->db->order_by('date_created','asc');
		$rs = $this->ci->db->get('user_permissions');
		$data = $rs->result();

		$perms = array();
		foreach( $data as $row ){
			$pK = strtolower($this->getPermKeyFromID($row->permission_k));
			if ($pK == '') { continue; }
			if ($row->value == '1') {
				$hP = true;
			} else {
				$hP = false;
			}
			$perms[$pK] = array('perm' => $pK,'inheritted' => false,'value' => $hP,'name' => $this->getPermNameFromID($row->permission_k),'permission_k' => $row->permission_k);
		}
		return $perms;
	}

	function hasRole($roleID) {
		foreach($this->userRoles as $k => $v){
			if (floatval($v) === floatval($roleID)){
				return true;
			}
		}
		return false;
	}

	function hasPermission($permKey) {
		$permKey = strtolower($permKey);
		if (array_key_exists($permKey,$this->perms)){
			if ($this->perms[$permKey]['value'] === '1' || $this->perms[$permKey]['value'] === true){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}