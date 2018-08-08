<?php

require "../../vendor/autoload.php";
require "../base.class.php";

$project = new sfwApp('sf-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();

echo "<h1>Importiere Mitglieder des DFB.net</h1>";

// $startAt = $_GET['startAt'] ? $_GET['startAt'] : 'A10';

/*
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
} */

echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
