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

echo "<h1>Importiere Mitglieder des DFB.net</h1>";

foreach ($project->getClubs() as $club) {

    $driveFileList = $project->getDriveFile('Export-DFBnet ' . $club["title"]);
    if (count($driveFileList) > 0) {

        $foundFile = $driveFileList[0];
        $range = 'Liste!A10:O';
        $params = array();

        $memberList = $project->getMembers($club);
        $members = $project->sheetService->spreadsheets_values->get($foundFile->id, $range, $params)->getValues();

        echo $project->generateDFBMemberTableHeader();
        foreach ($members AS $member) {
            $saveStatus = $project->saveDFBMember($member, $club, $memberList);
            echo $project->generateDFBMemberRow($member, $club, $saveStatus);
        }
        echo $project->generateMemberTableFooter();
    } else {
        echo "<p>Die Datei Export-DFBnet " . $club["title"]. " wurde nicht im GoogleDrive gefunden oder wurde nicht für den Service Account freigegeben.</p>";
    }
}

echo "<p>Import durchgeführt!</p>";
echo $project->generateFooter();