<?php


require_once(BASEPATH.'../application/core/BleextBI'.EXT);

class ApplicationBI extends BleextBI{
	
	function ApplicationBI(){
		parent::BleextBI();
		
		$this->instance->load->model("applicationdao");
		$this->appdao = $this->instance->applicationdao;
	}
	
	public function getApplications($params){
		
		$apps = $this->appdao->getApplications($params);
		
		$tree = $this->buildTree($apps,"menu");
		
		return $tree->getRoot();

	}
	
	public function getTree(){
		
		$apps = $this->appdao->getAll();
		
		$tree = $this->buildTree($apps,"children");
		
		return $tree->getRoot();
	}
	
	public function save($form){
		$form->date_updated = date("Y-m-d h:i:s");
		$form->date_created = date("Y-m-d h:i:s");
		$this->appdao->save($form);
	}
	
	public function update($form){
		$form->date_updated = date("Y-m-d h:i:s");
		$this->appdao->update($form);
	}
	
	private function buildTree($apps,$text){
		$CI =& get_instance();
		$CI->load->library("tree");
		
		$temp = array();
		foreach($apps as $app){
			$iconCls = "";
			if($app["configurations"]){
				$conf = json_decode($app["configurations"]);
				if($conf){
					if(property_exists($conf,"iconCls")){
						$iconCls = $conf->iconCls;
					}
				}
			}
			array_push($temp,array(
				"text"			=> $app["name"],
				"name"			=> $app["name"],
				"application_k"	=> $app["application_k"],
				"application_parent_k"=> $app["application_parent_k"],
				"klass"			=> $app["klass"],
				"description"	=> $app["description"],
				"configurations"=> $app["configurations"],
				"active"		=> $app["active"],
				"iconCls"		=> $iconCls
			));
		}
		
		// Creating the Tree
		$tree = new Tree();
		$tree->setChildProperty($text);
		$tree->setIdProperty("application_k");
		foreach($temp as $app){
			$tree->addChild($app,$app["application_parent_k"]);
		}
		return $tree;
	}
}