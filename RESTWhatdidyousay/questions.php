<?php
	error_reporting(E_STRICT);
	include_once("cls_connection.php");
	$db = new ConnectMySql;
	if (isset($_POST["get"])) {
		$action = $_POST["get"];
	} else {
		$aValues = json_decode(file_get_contents("php://input"), true);
		$action = $aValues["get"];
		$action = $aValues["random"];
	}
	$aData = array();
	$aData["records"] = array();
	$aData["message_list"] = array();
	$sSelectTrivia = "SELECT question.qes_question, first_answer.ans_answer AS 'answer_1', first_answer.ans_correct AS 'answer_1_correct', second_answer.ans_answer AS 'answer_2', second_answer.ans_correct AS 'answer_2_correct', question.qes_active "
		. " FROM wds_answers_question trivia "
		. " INNER JOIN wds_answer first_answer ON (trivia.anqe_first_answer_id = first_answer.ans_id) "
		. " INNER JOIN wds_answer second_answer ON (trivia.anqe_second_answerd_id = second_answer.ans_id) "
		. " INNER JOIN wds_questions question ON (trivia.anqe_question_id = question.qes_id) "
		. " WHERE trivia.anqe_active = TRUE";
	if (is_null($action)) {
		$aValues = $_POST["trivia"];
		$aValues["question"] = str_replace("\"", "\"", str_replace("'", "\'", htmlentities($aValues["question"])));
		$cmd = $db->command("select * from wds_questions q where q.qes_question = '{$aValues["question"]}'");
		if ($db->NumRowsAffected()>0) {
			array_push($aData["message_list"], "Question <div class='alert alert-warning'>{$aValues["question"]}</div> is already on our data base, please send another one.");
		} else {
			$aValues["first_answer_correct"] = (isset($aValues["first_answer_correct"])) ? 1 : 0;
			$aValues["second_answer_correct"] = (isset($aValues["second_answer_correct"])) ? 1 : 0;
			$aValues["second_answer"] = str_replace("\"", "\"", str_replace("'", "\'", htmlentities($aValues["second_answer"])));
			$aValues["second_answer"] = str_replace("\"", "\"", str_replace("'", "\'", htmlentities($aValues["second_answer"])));

			$sInsertFirstAnswer = "INSERT INTO wds_answer (ans_answer, ans_correct, ans_created_by, ans_updated_by, ans_created_at, ans_updated_at, ans_active) VALUES ('{$aValues["first_answer"]}', {$aValues["first_answer_correct"]}, 1, 1, now(), now(), 1)";
			
			$cmdInsertFirstAnswers = $db->command($sInsertFirstAnswer, true);
			$iFirstAnswerID = $db->GetInsertedID();

			$sInsertSecondAnswer = "INSERT INTO wds_answer (ans_answer, ans_correct, ans_created_by, ans_updated_by, ans_created_at, ans_updated_at, ans_active) VALUES ('{$aValues["second_answer"]}', {$aValues["second_answer_correct"]}, 1, 1, now(), now(), 1)";
			

			$cmdInsertSecondAnswers = $db->command($sInsertSecondAnswer, true);
			$iSecondAnswerID = $db->GetInsertedID();

			$sInsertQuestion = "INSERT INTO wds_questions (qes_question, qes_created_by, qes_updated_by, qes_created_at, qes_updated_at, qes_active) VALUES  ('{$aValues["question"]}', 1, 1, now(), now(), 1)";
			$cmdInsert = $db->command($sInsertQuestion, true);
			$iQuestionID = $db->GetInsertedID();

			$sInsertAnsQues = "INSERT INTO wds_answers_question (anqe_first_answer_id, anqe_second_answerd_id, anqe_question_id, anqe_created_by, anqe_updated_by, anqe_created_at, anqe_updated_at, anqe_active) VALUES ({$iFirstAnswerID[0]}, {$iSecondAnswerID[0]}, {$iQuestionID[0]}, 1, 1, now(), now(), 1)";

			$cmdInsertAnsQues = $db->command($sInsertAnsQues, true);
			$iSetAnswerQuestionID = $db->GetInsertedID();

			$sSelectTrivia .= " AND trivia.anqe_id = {$iSetAnswerQuestionID[0]}";
			$cmdSavedTrivia = $db->command($sSelectTrivia);
			
			if ($db->NumRowsAffected() > 0) {
				$aData["success"] = "Trivia {$aValues["question"]} created successfully";
				$aData["records"] = $db->fetch_array($cmdSavedTrivia);
			} else {
				array_push($aData["message_list"], "Trivia was unable to be inserted. This is the error: " . $db->GetError());
			}
		}
	} else {
		$sSelectTrivia .= (isset($aValues["random"])) ? " ORDER BY RAND() LIMIT 10" : "";
		$cmdGetTrivias = $db->command($sSelectTrivia);
		$aData["records"] = $db->fetch_array($cmdGetTrivias);
	}
	echo json_encode($aData);
?>