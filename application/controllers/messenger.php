<?php

class Messenger extends	Bleext_Controller{
	
	public function conectados(){
		
		echo json_encode(array(
			array("text"=>"Friends","expanded"=>true,"children"=>array(
				array("idUser"=>1,"text"=>"John Doe","iconCls"=>"clients-icon","leaf"=>true),
				array("idUser"=>2,"text"=>"Zoe Smith","iconCls"=>"clients-icon","leaf"=>true),
				array("idUser"=>3,"text"=>"Susan Moore","iconCls"=>"clients-icon","leaf"=>true),
				array("idUser"=>4,"text"=>"Sasha Cohen","iconCls"=>"clients-icon","leaf"=>true)
			)),
			array("text"=>"Family","expanded"=>true,"children"=>array(
				array("idUser"=>5,"text"=>"Daniel McDown","iconCls"=>"clients-icon","leaf"=>true),
				array("idUser"=>6,"text"=>"Tim McMorris","iconCls"=>"clients-icon","leaf"=>true),
				array("idUser"=>7,"text"=>"Mary Ann","iconCls"=>"clients-icon","leaf"=>true),
				array("idUser"=>8,"text"=>"Fili Touch","iconCls"=>"clients-icon","leaf"=>true)
			))
		));
		
	}
}