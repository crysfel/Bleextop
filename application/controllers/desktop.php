<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Desktop extends Bleext_Controller {


	public function index()
	{
		$this->load->view('desktop');
	}
	
	public function home(){
		$this->load->view('desktop');
	}
	
	public function config(){
		$this->load->library("applicationbi");

		$this->response(true,array(
			"dock"		=> "bottom",
			"user"		=> $this->getUser(),
			"config"	=> array(
				"wallpaper"	=> "resources/wallpapers/blue2.jpg"
			),
			"applications"	=> $this->applicationbi->getApplications($this->getUser())
		));
	}
}
