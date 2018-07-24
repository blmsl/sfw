<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

putenv('GOOGLE_APPLICATION_CREDENTIALS=../club/sfw-dev-17f1e9438978.json');

require "../simple_html_dom.php";
require "../base.class.php";
require "../../vendor/autoload.php";

$projectId = 'sfw-dev';

$db = getFirebaseConnection($projectId);
$client = getGoogleClient($projectId);

$sheetService = new Google_Service_Sheets($client);
$driveService = new Google_Service_Drive($client);

// get existing members
$dbMembers = $db->collection('members');
$memberList = array();
foreach ($dbMembers->documents() as $key => $member) {
  $memberList[$member["id"]] = $member;
}

echo generateHeader();

echo "<h1>Importiere Mitglieder des DFB.net</h1>";

$dbClubs = $db->collection('clubs');
foreach ($dbClubs->documents() as $club) {

  // Save data to googleDrive
  $result = $driveService->files->listFiles(array(
    'includeTeamDriveItems' => true,
    'supportsTeamDrives' => true,
    'q' => 'name="Export-DFBnet ' . $club["title"] . '"'
  ));

  if (count($result) === 1) {

    $foundFile = $result[0];

    $range = 'Liste!A10:O';

    $params = array();
    $members = $sheetService->spreadsheets_values->get($foundFile->id, $range, $params)->getValues();

    foreach ($members AS $member) {

      $birthday = DateTime::createFromFormat('d.m.Y', $member[4]);
      $official = DateTime::createFromFormat('d.m.Y', $member[5]) ? DateTime::createFromFormat('d.m.Y', $member[5])->format('Y-m-d') : '';
      $friendly = DateTime::createFromFormat('d.m.Y', $member[6]) ? DateTime::createFromFormat('d.m.Y', $member[6])->format('Y-m-d') : '';
      $guestRight = DateTime::createFromFormat('d.m.Y', $member[9]) ? DateTime::createFromFormat('d.m.Y', $member[9])->format('Y-m-d') : '';
      $passPrint = DateTime::createFromFormat('d.m.Y', $member[12]) ? DateTime::createFromFormat('d.m.Y', $member[12])->format('Y-m-d') : '';
      $signOut = DateTime::createFromFormat('d.m.Y', $member[7]);

      $id = $member[1] . "-" . $member[2] . "-" . $birthday->format('Y-m-d');

      $data = array(
        "id" => $id,
        "gender" => strpos($member[3], 'innen') > -1 ? 'female' : 'male',
        "dfbImport" => true,
        "clubData" => array(
          "assignedClub" => $club["id"]
        ),
        "mainData" => array(
          "firstName" => $member[2],
          "lastName" => $member[1],
          "birthday" => $birthday->format('Y-m-d')
        ),
        "dfbData" => array(
          "passNumber" => $member[0],
          "ageGroup" => $member[3],
          "eligibleForOfficialMatches" => $official,
          "eligibleForFriendlyMatches" => $friendly,
          "signOut" => $signOut,
          "playerStatus" => $member[8],
          "guestPlayer" => array(
            "guestRight" => $guestRight,
            "season" => $member[10],
            "type" => $member[11],
          ),
          "passPrint" => $passPrint,
          "allowedToPlay" => $member[13]
        )
      );

      saveDFBMember($id, $data, $dbMembers, $memberList);
    }

  } elseif (count($result) === 0) {
    echo "Keine Datei mit dem Titel Export-DFBnet " . $club['title'] . " gefunden";
    exit();
  } else {
    echo "Mehrere Dateien mit dem Titel Export-DFBnet " . $club['title'] . " gefunden";
    exit();
  }

}
echo "Import durchgeführt!";

echo generateFooter();
