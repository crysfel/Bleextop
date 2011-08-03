<?php

class Applications extends Bleext_Controller{
	
	public function getAll(){
		$this->load->library("applicationbi");
		
		$this->response(true,array(
			"text"		=> "Applications",
			"children"	=> $this->applicationbi->getTree()
		));
	}
	
}