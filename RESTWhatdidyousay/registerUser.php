<?php
	error_reporting(E_STRICT);
	include_once("cls_connection.php");
	$db = new ConnectMySql;
	$aValues = $_POST["user"];
	$aData = array();
	$aData["message_list"] = array();
	if ($aValues["userid"] !== "") {
		$cmd = $db->command("select * from wds_users u where u.user_username = '{$aValues["userid"]}'");
		if ($db->NumRowsAffected()>0) {
			array_push($aData["message_list"], "Username {$aValues["userid"]} is already taken, please select another.");
		} else {
			$aValues["password"] = md5("WhatdidyousayUser " . $aValues["password"]);
			$cmdInsert = $db->command("INSERT INTO wds_users (user_full_name, user_username, user_password, user_is_online, user_created_at, user_updated_at, user_active) VALUES  ('{$aValues["name"]}', '{$aValues["userid"]}', 0, '{$aValues["password"]}', now(), now(), 1)");

			if ($db->NumRowsAffected() > 0) {
				$aData["success"] = "User {$aValues["userid"]} created successfully";
			} else {
				array_push($aData["message_list"], "User was unable to be inserted. This is the error: " . $db->GetError());
			}
		}
	} else {
		array_push($aData["message_list"], "Please fill form so we can sign you up.");
	}
	echo json_encode($aData);
?>