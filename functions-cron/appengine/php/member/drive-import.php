<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

putenv('GOOGLE_APPLICATION_CREDENTIALS=../club/sfw-dev-17f1e9438978.json');

require "../simple_html_dom.php";
require "../base.class.php";
require "../../vendor/autoload.php";

use Google\Cloud\Firestore\FirestoreClient;

$projectId = 'sfw-dev';

try {
  $db = new FirestoreClient([
    'projectId' => $projectId
  ]);
} catch (\Google\Cloud\Core\Exception\GoogleException $e) {
  var_dump($e);
  exit();
}

// Calendar
$client = new Google_Client([
  'projectId' => $projectId
]);
$client->useApplicationDefaultCredentials();

$client->setApplicationName("SFW Import Drive Members via FlexEngine");
$client->setScopes([
    Google_Service_Drive::DRIVE,
    Google_Service_Drive::DRIVE_FILE,
    Google_Service_Sheets::DRIVE,
    Google_Service_Sheets::DRIVE_FILE,
    Google_Service_Sheets::SPREADSHEETS
  ]
);

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
    'q' => 'name="Mitgliederliste ' . $club["title"] . '"'
  ));

  if (count($result) === 1) {

    $foundFile = $result[0];

    $range = 'Mitgliederliste!A3:V';

    $params = array();
    $members = $sheetService->spreadsheets_values->get($foundFile->id, $range, $params)->getValues();

    foreach ($members AS $member) {

      if(isset($member[1]) && isset($member[2]) && isset($member[19]) && $member[19] !== 'Geburtsdatum') {

        var_dump($member);
        exit();

        /*
        $birthday = DateTime::createFromFormat('d.m.Y', $member[19]);

        $id = $member[1] . "-" . $member[2] . "-" . $birthday->format('Y-m-d');

        $data = array(
          "id" => $id,
          "driveImport" => true,
          "clubData" => array(
            "assignedClub" => $club["id"],
            "status" => $member[8],
            "joined" => $member[9],
            "left" => $member[10],
            "payment" => $member[11],
            "positionsInClub" => $member[20],
          ),
          "mainData" => array(
            "gender" => $member[0] === 'Frau' ? 'female' : 'male',
            "firstName" => $member[2],
            "lastName" => $member[1],
            "title" => $member[7],
            "birthday" => $birthday->format('Y-m-d')
          ),
          "address" => array(
            "streetName" => $member[3],
            "houseNumber" => $member[4],
            "zip" => $member[5],
            "city" => $member[6],
          ),
          "ahData" => array(
            "status" => $member[12],
            "joined" => $member[13],
            "left" => $member[14],
            "payment" => $member[15],
          ),
          "contact" => array(
            "phoneHome" => $member[16],
            "phoneMobile" => $member[17],
            "email" => $member[18]
          ),
        );

        saveDriveMember($id, $data, $dbMembers, $memberList);
        */
      }
    }

  } elseif (count($result) === 0) {
    echo "Keine Datei mit dem Titel Mitgliederliste " . $club['title'] . " gefunden";
    exit();
  } else {
    echo "Mehrere Dateien mit dem Titel Mitgliederliste " . $club['title'] . " gefunden";
    exit();
  }

}

echo "Import durchgeführt!";

echo generateFooter();
