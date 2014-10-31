<?php
	/**
	* Class that will allow connection between mysql to application
	*/
	class ConnectMySql
	{
		private $connection;
		private $rowsaffected;
		public function connectmysql()
		{
			if(!isset($this->connection)){
				$this->connection = (mysql_connect("localhost","root","")) or die(mysql_error());
				mysql_select_db("db_whatdidyousay",$this->connection) or die(mysql_error());
			}
		}
		public function command($consulta){
			$this->rowsaffected++;
			$resultado = mysql_query($consulta,$this->connection);
			if(!$resultado){
				echo "MySql Error: ".mysql_error();
				exit;
			}
			return $resultado;
		}
		public function fetch_array($consulta){
			return mysql_fetch_array($consulta);
		}
		public function NumRowsAffected(){
			return $this->rowsaffected;
		}
		public function GetTotalConsultas(){
			return $this->rowsaffected;
		}
	}
?>