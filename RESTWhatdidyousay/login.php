<?php
	error_reporting(E_STRICT);
	include_once("cls_connection.php");
	$db = new ConnectMySql;
	$aValues = json_decode(file_get_contents("php://input"), true);
	$sUsername = $aValues["username"];
	$sPassword = md5("WhatdidyousayUser " . $aValues["password"]);
	$aData = array();
	$aData["message_list"] = array();
	if ($sUsername !== "") {
		$sSelect = "select * from wds_users u where u.user_username = '{$sUsername}' and u.user_password = '{$sPassword}'";
		$cmd = $db->command($sSelect);
		if ($db->NumRowsAffected()>0) {
			$aData = $db->fetch_array($cmd);
		} else {
			array_push($aData["message_list"], "Username {$sUsername} was not found on our DB.");
		}
	} else {
		array_push($aData["message_list"], "Please fill form so we can sign you in.");
	}
	echo json_encode($aData);
?>