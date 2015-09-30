<?php
	/**
	* Class that will allow connection between mysql to application
	*/
	class ConnectMySql
	{
		private $connection;
		private $rowsaffected;
		private $error;
		private $lastInsertedID;
		public function connectmysql()
		{
			if(!isset($this->connection)){
				$mysql_host = "mysql10.000webhost.com";
				$mysql_database = "a3265352_whatdus";
				$mysql_user = "a3265352_whatdus";
				$mysql_password = "WhatDidYouSay1";
				if ($_SERVER["SERVER_NAME"] === "localhost" || $_SERVER["SERVER_NAME"] === "127.0.0.1") {
					$mysql_host = "localhost";
					$mysql_database = "db_whatdidyousay";
					$mysql_user = "ISEMejia";
					$mysql_password = "ISEMejia";
				}
				$this->connection = (mysql_connect("$mysql_host","$mysql_user","$mysql_password")) or die(mysql_error());
				mysql_select_db("$mysql_database",$this->connection) or die(mysql_error());
			}
		}
		public function command($consulta, $insert = null){
			$resultado = mysql_query($consulta,$this->connection);
			if(!$resultado){
				$this->error = mysql_errno() . " :: " . mysql_error();
			}
			$this->rowsaffected = mysql_affected_rows();
			if (!is_null($insert)) {
				$this->lastInsertedID = $this->GetLastID();
			}
			return $resultado;
		}
		public function fetch_array($consulta){
			$aData = array();
			while ($data = mysql_fetch_assoc($consulta)) {
			   array_push($aData, $data);
			}
			return $aData;
		}
		public function NumRowsAffected(){
			return $this->rowsaffected;
		}
		public function GetTotalConsultas(){
			return $this->rowsaffected;
		}
		public function GetError() {
			return $this->error;
		}
		public function GetLastID(){
			return mysql_fetch_array(mysql_query("SELECT LAST_INSERT_ID()"));
		}

		public function GetInsertedID(){
			return $this->lastInsertedID;
		}
	}
?>