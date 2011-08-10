<?php

require_once(BASEPATH.'../application/core/BleextBI'.EXT);

class UserBI extends BleextBI{
	
	function UserBI(){
		parent::BleextBI();
		
		$this->instance->load->model("userdao");
	}
	
	public function getAll(){
		return $this->instance->userdao->getAll();
	}
	
}