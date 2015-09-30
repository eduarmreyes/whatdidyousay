<?php
// $oFileName = $_FILES['trivia'];
// var_dump($oFileName["name"]["second_answer_file"]);
// $oFile = $_FILES;
// var_dump($oFile);
// exit();

header('Content-Type: text/plain; charset=utf-8');
$sFile = isset($_FILES['trivia']['error']["second_answer_file"]) ? "second_answer_file" : "first_answer_file";
$aData = array(
	"error" => array(),
	"initialPreview" => array(),
	"append" => false,
	"fileInfo" => array()
);
try {
    
    // Undefined | Multiple Files | $_FILES Corruption Attack
    // If this request falls under any of them, treat it invalid.
    if (
        !isset($_FILES['trivia']['error']["{$sFile}"]) ||
        is_array($_FILES['trivia']['error']["{$sFile}"])
    ) {
        array_push($aData["error"], 'Invalid parameters.');
    }

    // Check $_FILES['trivia']['error']["{$sFile}"] value.
    switch ($_FILES['trivia']['error']["{$sFile}"]) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            array_push($aData["error"], 'No file sent.');
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            array_push($aData["error"], 'Exceeded filesize limit.');
        default:
            array_push($aData["error"], 'Unknown errors.');
    }

    // You should also check filesize here. 
    if ($_FILES['trivia']['size']["{$sFile}"] > 10000000) {
        array_push($aData["error"], 'Exceeded filesize limit.');
    }

    // DO NOT TRUST $_FILES['trivia']['mime']["{$sFile}"] VALUE !!
    // Check MIME Type by yourself.
    // $finfo = new finfo(FILEINFO_MIME_TYPE);
    // if (false === $ext = array_search(
    //     $finfo->file($_FILES['trivia']['tmp_name']["{$sFile}"]),
    //     array(
    //         'jpg' => 'image/jpeg',
    //         'png' => 'image/png',
    //         'gif' => 'image/gif',
    //     ),
    //     true
    // )) {
    //     array_push($aData["error"], 'Invalid file format.');
    // }
    // Pick a file extension 

    if (preg_match('/^image\/p?jpeg$/i', $_FILES['trivia']['type']["{$sFile}"])) { 
    	$ext = 'jpg'; 
    } else if (preg_match('/^image\/gif$/i', $_FILES['trivia']['type']["{$sFile}"])) {
    	$ext = 'gif';
    } else if (preg_match('/^image\/(x-)?png$/i', $_FILES['trivia']['type']["{$sFile}"])) {
    	$ext = 'png';
    } else {
    	$ext = 'unknown';
    }

    // You should name it uniquely.
    // DO NOT USE $_FILES['trivia']['name']["{$sFile}"] WITHOUT ANY VALIDATION !!
    // On this example, obtain safe unique name from its binary data.
    $sSrcFile = sprintf('./uploads/%s.%s',
    	sha1_file($_FILES['trivia']['tmp_name']["{$sFile}"]),
        $ext
    );
    $sNameFile = sprintf('../uploads/%s.%s',
    	sha1_file($_FILES['trivia']['tmp_name']["{$sFile}"]),
        $ext
    );

    if (!move_uploaded_file(
        $_FILES['trivia']['tmp_name']["{$sFile}"],
        $sNameFile
    )) {
        array_push($aData["error"], 'Failed to move uploaded file.');
    } else {
    	$sInitialPreview = "<img src='{$sSrcFile}' class='file-preview-image' alt='{$_FILES['trivia']['name']["{$sFile}"]}' title='{$_FILES['trivia']['name']["{$sFile}"]}'>";
    	array_push(
    		$aData["initialPreview"],
    		$sInitialPreview
		);
    	array_push(
    		$aData["fileInfo"],
    		$sNameFile
		);
    	array_push(
    		$aData["fileInfo"],
    		$sSrcFile
		);
    	array_push(
    		$aData["fileInfo"],
    		$sFile
		);
    }
    echo json_encode($aData);

} catch (RuntimeException $e) {

    echo $e->getMessage();

}

?>