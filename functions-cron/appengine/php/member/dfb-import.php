<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../../vendor/autoload.php";
require "../base.class.php";

$project = new sfwApp('sf-winterbach');
$time_start = microtime(true);

$startAt = $_GET['startAt'] ? $_GET['startAt'] : 'A10';

echo $project->generateHeader();
echo "<h1>Importiere Mitglieder des DFB.net</h1>";

foreach ($project->getClubs() as $club) {

    $driveFileList = $project->getDriveFile('Export-DFBnet ' . $club["title"]);
    if (count($driveFileList) > 0) {

        $foundFile = $driveFileList[0];
        $range = 'Liste!' . $startAt . ':O';
        $params = array();

        $memberList = $project->getMembers($club);
        $members = $project->sheetService->spreadsheets_values->get($foundFile->id, $range, $params)->getValues();

        // Batch to create and delete matches in the calendar
        $batch = $project->db->batch();
        $batch2 = $project->db->batch();

        echo $project->generateDFBMemberTableHeader();
        $i = 1;
        foreach ($members AS $member) {
            if (isset($member[0]) && $member[0] !== '') {

                if ($i <= 499) {
                    $saveStatus = $project->saveDFBMember($member, $club, $memberList, $batch);
                } else {
                    $saveStatus = $project->saveDFBMember($member, $club, $memberList, $batch2);
                }
                echo $project->generateDFBMemberRow($member, $club, $saveStatus);
                $i++;
            }
        }
        $batch->commit();
        $batch2->commit();

        echo $project->generateMemberTableFooter();
        echo "<p>Import durchgeführt!</p>";

    } else {
        echo "<p>Die Datei Export-DFBnet " . $club["title"] . " wurde nicht im GoogleDrive gefunden oder wurde nicht für den Service Account freigegeben.</p>";
    }
}

echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
