<?php

/**
 * This class creates a Tree structure of information for the TreePanel component
 * of the ExtJS library.
 *
 * @author Crysfel Villa
 * @date 12/18/2009
 *
 */
class Tree{
	private $tree = array();
	private $index = array();
	private $cont = 0;
	private $childProperty = "children";
	private $idProp = "id";

	/**
	 * 	This method inserts a node to the Tree, the child param may contain an
	 * 	"id" property that will be use as a "key", if the child param doesn't contains
	 *	an "id" property a generated "key" is given to the node.
	 *
	 *	@child the node to insert
	 *	@parentKey(optional) The parent key where the node will be inserted, if null
	 *	the node is inserted in the root of the Tree
	 */
	public function addChild($child,$parentKey = null){
		$key = isset($child[$this->idProp])?$child[$this->idProp]:'item_'.$this->cont;
		$child["leaf"] = true;
		if($this->containsKey($parentKey)){
			//added to the existing node
			$this->index[$key] =& $child;
			$parent =& $this->index[$parentKey];
			if(isset($parent[$this->childProperty])){
				$parent[$this->childProperty][] =& $child;
			}else{
				$parent["leaf"] = false;
				$parent[$this->childProperty] = array();
				$parent[$this->childProperty][] =& $child;
			}
		}else{
			//added to the root
			$this->index[$key] =& $child;
			$this->tree[] =& $child;
		}
		$this->cont++;
	}

	/**
	 *	Return a node by the given key
	 *	@key
	 */
	public function getNode($key){
		return $this->index[key];
	}

	/**
	 *	@TODO Remove the node from the Tree
	 *	@key
	 */
	public function removeNode($key){
		//unset($this->index[key]);
	}

	/**
	 *	Check if exist a node with the given key
	 */
	public function containsKey($key){
		return isset($this->index[$key]);
	}

	/**
	 *	Return a representation of the Tree structure in JSON format
	 */
	public function toJson(){
		return json_encode($this->tree);
	}
	
	public function setChildProperty($prop){
		$this->childProperty = $prop;
	}
	public function setIdProperty($idprop){
		$this->idProp = $idprop;
	}
	public function getRoot(){
		return $this->tree;
	}
}
