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
				$this->connection = (mysql_connect("localhost","root","")) or die(mysql_error());
				mysql_select_db("db_whatdidyousay",$this->connection) or die(mysql_error());
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