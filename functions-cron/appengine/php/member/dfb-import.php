<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";
require "../base.class.php";

require_once "../utils.global.php"; # by emre isik

if(!strpos(gethostname(), 'appspot.com')) {
  putenv('GOOGLE_APPLICATION_CREDENTIALS=../client_secret.json');
}

$time_start = microtime(true);

$project = new sfwApp('sf-winterbach', array('driveService', 'sheetService'));

echo $project->generateHeader();

echo "<h1>Importiere Mitglieder des DFB.net</h1>";

// nur definierte Vereine zulassen
$clubData = isset($_GET['club']) ? $project->getClubDataByTitle($_GET['club']) : $project->getClubDataByTitle('SF Winterbach');
if (!$clubData) {
  echo "Kein Verein mit diesen Daten im Skript hinterlegt (vgl. club.class.php).";
  exit();
}

// Verein aus der DB laden
$club = $project->getClubByTitle($clubData["title"]);
if (!$club) {
  echo "Kein Verein mit diesen Daten in der Datenbank vorhanden. Bitte den Verein " . $clubData["title"] . " erst in der Datenbank anlegen";
  exit();
}

$batch = $project->db->batch();
$batch2 = $project->db->batch();

echo "<h3>Datei: Export-DFBnet " . $club["title"] . "</h3>";

$startAt = isset($_GET['startAt']) ? $_GET['startAt'] : 'A10';

$driveFileList = $project->getDriveFile('Export-DFBnet ' . $club["title"]);

if (count($driveFileList) > 0) {

  $memberList = $project->getMembers($club);
  $members = $project->sheetService->spreadsheets_values->get($driveFileList[0]->id, 'Liste!' . $startAt . ':O', array())->getValues();

  echo $project->generateDFBMemberTableHeader();
  $batching = false;
  $i = 1;
  foreach ($members AS $member) {
    if (isset($member[0]) && $member[0] !== '') {

      if ($i <= 499) {
        $saveStatus = $project->saveDFBMember($member, $club, $memberList, $batch);
      } else {
        $saveStatus = $project->saveDFBMember($member, $club, $memberList, $batch2);
      }

      if($saveStatus['newEntry'] || $saveStatus['updateStatus']){
        $batching = true;
      }

      echo $project->generateDFBMemberRow($member, $club, $saveStatus);

      if($i === 499){
        $batching = false;
      }

      $i++;
    }
  }

  if($batching){
    if($i < 499){
      $batch->commit();
    } else{
      $batch2->commit();
    }
  }


  echo $project->generateMemberTableFooter();
  echo "<p>Import durchgeführt!</p>";

} else {
  echo "<p>Die Datei Export-DFBnet " . $club["title"] . " wurde nicht im GoogleDrive gefunden oder wurde nicht für den Service Account freigegeben.</p>";
}


echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
