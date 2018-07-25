<?php
error_reporting(E_ALL);
ini_set('display_errors', true);

if ($handle = opendir('.')) {
  while (false !== ($entry = readdir($handle))) {
    if ($entry != "." && $entry != "..") {
      echo "$entry\n";
    }
  }
  closedir($handle);
}
