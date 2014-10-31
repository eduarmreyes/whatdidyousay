<?php
	$mysql_host = "mysql5.000webhost.com";
	$mysql_database = "a9758294_uees";
	$mysql_user = "a9758294_uees";
	$mysql_password = "u33sContra";
	$oConn = mysql_connect($mysql_host, $mysql_user, $mysql_password);
	if (!$oConn) {
	 die('Could not connect: ' . mysql_error());
	} else {
		echo "Simon";
	}
	mysql_select_db($mysql_database, $oConn) or die("Error seleccion BD");
?>