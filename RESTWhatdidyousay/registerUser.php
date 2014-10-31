<?php
	include_once("cls_connection.php");
	$db = new ConnectMySql;
	$aValues = $_POST["user"];
	$aData = array();
	$aData["message_list"] = array();
	if ($aValues["userid"] !== "") {
		$cmd = $db->command("select * from wds_users u where u.user_username = {$aValues["userid"]}");
		if ($db->NumRowsAffected()>0) {
			array_push($aData["message_list"], "Username {$aValues["userid"]} is already taken, please select another.");
		} else {
			array_push($aData["message_list"], "It seems that everything's OK");
		}
	} else {
		array_push($aData["message_list"], "Please fill form so we can sign you up.");
	}
	echo json_encode($aData);
?>