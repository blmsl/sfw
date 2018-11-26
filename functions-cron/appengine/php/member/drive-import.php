<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";
require "../base.class.php";

$time_start = microtime(true);

$project = new sfwApp('sportfreunde-winterbach', array('driveService', 'sheetService'));

echo $project->generateHeader();

echo "<h1>Importiere Mitglieder des Google-Drive</h1>";

try {

    // set batch
    $batch = $project->db->batch();
    $batch2 = $project->db->batch();

    $startAt = isset($_GET["startAt"]) ? $_GET['startAt'] : null;

    // set club
    $club = $project->getClubByTitle($project->defaultClub, $batch);

    echo "<h3>Datei: Mitgliederliste " . $club["title"] . "</h3>";

    $driveFileList = $project->getDriveFile('Mitgliederliste ' . $club["title"]);

    if (count($driveFileList) > 0) {

        $memberList = $project->getMembers($club);
        $members = $project->sheetService->spreadsheets_values->get($driveFileList[0]->id, 'Mitgliederliste!A3:V', array())->getValues();

        $noBirthdayList = array();

        echo $project->generateDriveMemberTableHeader();
        $i = 1;
        $batching = false;
        foreach ($members AS $member) {
            if (isset($member[1]) && $member[1] !== '' && isset($member[2]) && $member[2] !== '' && isset($member[19]) && $member[19] !== '' && $member[19] !== 'Geburtsdatum') {

                if ($i <= 499) {
                    $saveStatus = $project->saveDriveMember($member, $club, $memberList, $batch);
                } else {
                    $saveStatus = $project->saveDriveMember($member, $club, $memberList, $batch2);
                }

                if ($saveStatus['newEntry'] || $saveStatus['updateStatus']) {
                    $batching = true;
                }

                echo $project->generateDriveMemberRow($member, $saveStatus);

                if ($i === 499) {
                    $batching = false;
                }

                $i++;

            } elseif (isset($member[1]) && $member[1] !== '' && isset($member[2]) && $member[2] !== '' && !isset($member[19])) {
                $noBirthdayList[] = $member[1] . ' ' . $member[2];
            }
        }

        if ($batching) {
            if ($i < 499) {
                $batch->commit();
            } else {
                $batch2->commit();
            }
        }

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
        exit();
    }

    echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
    echo $project->generateFooter();


} catch (Exception $e) {
    debug_print_backtrace();
    var_dump($e);
    echo($e->getMessage());
}
