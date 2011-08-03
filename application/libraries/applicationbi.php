<?php

class ApplicationBi{
	
	public function getApplications($params){
		$CI =& get_instance();
		
		$CI->load->model("applicationdao");
		
		
		$apps = $CI->applicationdao->getApplications($params);
		
		$tree = $this->buildTree($apps,"menu");
		
		return $tree->getRoot();

	}
	
	public function getTree(){
		$CI =& get_instance();
		$CI->load->model("applicationdao");
		
		$apps = $CI->applicationdao->getAll();
		$tree = $this->buildTree($apps,"children");
		
		return $tree->getRoot();
	}
	
	private function buildTree($apps,$text){
		$CI =& get_instance();
		$CI->load->library("tree");
		
		$temp = array();
		foreach($apps as $app){
			array_push($temp,array(
				"text"			=> $app["name"],
				"idApp"			=> $app["application_k"],
				"idParent"		=> $app["application_parent_k"],
				"class"			=> $app["class"],
				"description"	=> $app["description"],
				"config"		=> $app["configurations"]
			));
		}
		
		// Creating the Tree
		$tree = new Tree();
		$tree->setChildProperty($text);
		$tree->setIdProperty("idApp");
		foreach($temp as $app){
			$tree->addChild($app,$app["idParent"]);
		}
		return $tree;
	}
}