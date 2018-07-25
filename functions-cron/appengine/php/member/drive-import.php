<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../../vendor/autoload.php";

require "../base.class.php";

$projectId = 'sf-winterbach';
$project = new sfwApp($projectId);

echo $project->generateHeader();

echo "<h1>Importiere Mitglieder des Google-Drive</h1>";

foreach ($project->getClubs() as $club) {

  $driveFileList = $project->getDriveFile('Mitgliederliste ' . $club["title"]);
  if (count($driveFileList) > 0) {

    $foundFile = $driveFileList[0];
    $range = 'Mitgliederliste!A3:V';
    $params = array();
    $members = $project->sheetService->spreadsheets_values->get($foundFile->id, $range, $params)->getValues();

    #$noBirthdayList = array();
    echo $project->generateDriveMemberTableHeader();
    foreach ($members AS $member) {
      if (isset($member[1]) && $member[1] !== '' && isset($member[2]) && $member[2] !== '') { // && isset($member[19]) && $member[19] !== '' && $member[19] !== 'Geburtsdatum'
        $project->saveDriveMember($member, $club);
        echo $project->generateDriveMemberRow($member, $club, true);
      }
      #elseif (isset($member[1]) && $member[1] !== '' && isset($member[2]) && $member[2] !== '' && !isset($member[19])) {
      #  $noBirthdayList[] = $member[1] . ' ' . $member[2];
      #}
    }
    echo $project->generateMemberTableFooter();

    #var_dump($noBirthdayList);
  }
}

echo "<p>Import durchgeführt!</p>";
echo $project->generateFooter();
