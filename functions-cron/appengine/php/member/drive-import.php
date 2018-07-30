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

$startAt = isset($_GET["startAt"]) ? $_GET['startAt'] : null;

echo "<h1>Importiere Mitglieder des Google-Drive</h1>";

foreach ($project->getClubs() as $club) {

    $driveFileList = $project->getDriveFile('Mitgliederliste ' . $club["title"]);
    if (count($driveFileList) > 0) {

        $foundFile = $driveFileList[0];
        $range = 'Mitgliederliste!A3:V';
        $params = array();

        $memberList = $project->getMembers($club);
        $members = $project->sheetService->spreadsheets_values->get($foundFile->id, $range, $params)->getValues();

        $noBirthdayList = array();

        // Batch to create and delete matches in the calendar
        $batch = $project->db->batch();
        $batch2 = $project->db->batch();

        echo $project->generateDriveMemberTableHeader();
        $i = 1;
        foreach ($members AS $member) {
            if (isset($member[1]) && $member[1] !== '' && isset($member[2]) && $member[2] !== '' && isset($member[19]) && $member[19] !== '' && $member[19] !== 'Geburtsdatum') {

                if ($i <= 499) {
                    $saveStatus = $project->saveDriveMember($member, $club, $memberList, $batch);
                } else {
                    $saveStatus = $project->saveDriveMember($member, $club, $memberList, $batch2);
                }
                echo $project->generateDriveMemberRow($member, $saveStatus);
                $i++;

            } elseif (isset($member[1]) && $member[1] !== '' && isset($member[2]) && $member[2] !== '' && !isset($member[19])) {
                $noBirthdayList[] = $member[1] . ' ' . $member[2];
            }
        }

        $batch->commit();
        $batch2->commit();

        echo $project->generateMemberTableFooter();

        if (count($noBirthdayList) > 0) {
            echo "<p>Kein Geburtstag eingetragen für:</p>";
            echo "<ul>";
            foreach ($noBirthdayList as $key => $member) {
                echo "<li>" . $member . "</li>";
            }
            echo "</ul>";
        }

        echo "<p>Import durchgeführt!</p>";

    } else {
        echo "<p>Die Datei Mitgliederliste " . $club["title"] . " wurde nicht im GoogleDrive gefunden oder wurde nicht für den Service Account freigegeben.</p>";
    }
}

echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
