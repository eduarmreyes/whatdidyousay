<?php
	error_reporting(E_STRICT);
	include_once("cls_connection.php");
	$db = new ConnectMySql;
	$aValues = json_decode(file_get_contents("php://input"), true);
	$aData = array();
	$aData["records"] = array();
	$aData["message_list"] = array();
	if (isset($aValues)) {
		$sTriviaText = $aValues["text"];
		$iCorrect = (bool) $aValues["correct"];
		$aUser = $aValues["user"];
		if ($aValues["target"] === "#Q0") {
			$sResetUser = "UPDATE wds_users SET user_game_score = 0 "
				. " WHERE user_id = {$aUser["user_id"]}";
			$cmd = $db->command($sResetUser);		
			$aUser["user_game_score"] = 0;
		}
		if ($iCorrect) {
			$aUser["user_lifetime_score"] = $aUser["user_lifetime_score"] + 1;
			$aUser["user_game_score"] = $aUser["user_game_score"] + 1;
			$sUpdateUserProfile = "UPDATE wds_users SET user_lifetime_score = {$aUser["user_lifetime_score"]}, user_game_score = {$aUser["user_game_score"]} "
				. " WHERE user_active = TRUE AND user_id = {$aUser["user_id"]}";
			$cmd = $db->command($sUpdateUserProfile);
			if ($db->NumRowsAffected() > 0) {
				array_push($aData["records"], $aUser);
			} else {
				array_push($aData["message_list"], "An error occurred and we were not able to update you profile, please try again. Error: " . $db->GetError());
			}
		}
	} else {
		array_push($aData["message_list"], "Page is allowed only by ajax requests.");
	}
	echo json_encode($aData);
?>