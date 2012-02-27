<?php

//LIVE require_once dirname(dirname(dirname(dirname(__FILE__)))).'/config.core.php';
/*PROD*/require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))).'/config.core.php';
require_once MODX_CORE_PATH.'config/'.MODX_CONFIG_KEY.'.inc.php';
require_once MODX_CONNECTORS_PATH.'index.php';


$host = $_SERVER[""];


$url = $_GET["src"];
$width = $_GET["w"];
$height = $_GET["h"];
$sx = $_GET["sx"] || 0;
$sy = $_GET["sy"] || 0;
$sw = $_GET["sw"];
$sh = $_GET["sh"];

$opts = array(
	"w=$width",
	"h=$height",
	"sx=$sx",			// Crop start X
	"sy=$sy",			// Crop start Y
	"sw=$sw",			// Crop width
	"sh=$sh"			// Crop height
);


// run phpthumbof snippet 
$img = $modx->runSnippet('phpthumbof',array(
	'input' => $url,
	'modx' => &$modx,
	'options' => implode('&',$opts)
));

die($img);
