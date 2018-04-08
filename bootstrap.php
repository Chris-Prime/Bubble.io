<?php

const PATH      = "";
const LIBRARIES = "lib";
const SOURCE    = "js";
const CLASSES   = "js/classes"; // Relative path
const SCENES    = "js/scenes"; // Relative path

$p = [
    SOURCE      => PATH.SOURCE.DIRECTORY_SEPARATOR,
    LIBRARIES   => PATH.LIBRARIES.DIRECTORY_SEPARATOR,
    CLASSES     => PATH.CLASSES.DIRECTORY_SEPARATOR,
    SCENES      => PATH.SCENES.DIRECTORY_SEPARATOR
    ];
    
$depends = [
    "entity" => ["main"],
    "colorButton" => ["entity"],
    "singlePlayerGame" => ["target"]
];

function spit($string) {
    echo "    ".$string.PHP_EOL;
}
    
function getFiles($selector) {
    $ret = [];
    $files = glob($selector);
    foreach($files as $file) {
        if(strpos($file, ".") !== false) $ret[] = $file;
    }
    return $ret;
}

function sortdepends($files) {
    global $depends;
    usort($files, function($a, $b) {
        $a = pathinfo($a, PATHINFO_FILENAME);
        $b = pathinfo($a, PATHINFO_FILENAME);
        if($a === "utility") return 1;
        if(isset($depends[$a])) {
            return in_array($b, $depends[$a], true) ? -1 : 1; 
        }
        return false;
    });
    return $files;
}
    
function includeScripts($header, $path) {
    spit("<!-- $header -->");
    $files = getFiles($path."*");
    $files = sortdepends($files);
    foreach($files as $file) {
        spit("<script src='$file' type='text/javascript'></script>");
    }
}

// Now add files
function _header() {
    global $p;
    includeScripts("LIBRARIES", $p[LIBRARIES]);
    includeScripts("SOURCE", $p[SOURCE]);
    includeScripts("CLASSES", $p[CLASSES]);
    includeScripts("SCENES", $p[SCENES]);
}

?>