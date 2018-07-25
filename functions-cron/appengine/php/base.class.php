<?php

use Google\Cloud\Firestore\FieldValue;
use Google\Cloud\Firestore\FirestoreClient;

require "calendar.class.php";
require "category.class.php";
require "category-type.class.php";
require "club.class.php";
require "location.class.php";
require "match.class.php";
require "season.class.php";
require "team.class.php";

class sfwApp {
  use sfwBase;
  use sfwCalendar;
  use sfwCategory;
  use sfwCategoryType;
  use sfwClub;
  use sfwLocation;
  use sfwMatch;
  use sfwSeason;
  use sfwTeam;
}

trait sfwBase {

  public $db;
  public $client;

  public $sheetService = null;
  public $driveService = null;
  public $calendarService = null;

  public function __construct($projectId)
  {

    $this->client = $this->getGoogleClient($projectId);
    $this->sheetService = new Google_Service_Sheets($this->client);
    $this->driveService = new Google_Service_Drive($this->client);
    $this->calendarService = new Google_Service_Calendar($this->client);

    $this->db = $this->getFireStoreConnection($projectId);
    $this->client = $this->getGoogleClient($projectId);

    $this->categoryCollection = $this->db->collection('categories');
    $this->categoryTypeCollection = $this->db->collection('category-types');
    $this->clubCollection = $this->db->collection('clubs');
    $this->locationCollection = $this->db->collection('locations');
    $this->matchCollection = $this->db->collection('matches');

    $this->seasonCollection = $this->db->collection('seasons');
    $this->teamCollection = $this->db->collection('teams');
  }

  public function getGoogleClient($projectId)
  {
    $client = new Google_Client([
      'projectId' => $projectId
    ]);
    $client->useApplicationDefaultCredentials();

    $client->setApplicationName("SFW Import Matchplan via FlexEngine");
    $client->setScopes([
        Google_Service_Drive::DRIVE,
        Google_Service_Drive::DRIVE_FILE,
        Google_Service_Sheets::DRIVE,
        Google_Service_Sheets::DRIVE_FILE,
        Google_Service_Sheets::SPREADSHEETS,
        Google_Service_Calendar::CALENDAR
      ]
    );
    return $client;
  }

  public function getFireStoreConnection($projectId)
  {
    try {
      $db = new FirestoreClient([
        'projectId' => $projectId
      ]);
    } catch (\Google\Cloud\Core\Exception\GoogleException $e) {
      var_dump($e);
      exit();
    }
    return $db;
  }

  public function curlRequest($url){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
    $str = curl_exec($curl);
    curl_close($curl);
    return str_get_html($str);
  }

  /**
   * @param $collection Google\Cloud\Firestore\CollectionReference
   * @param $data
   * @return mixed
   */
  public function saveFireStoreObject($collection, $data)
  {
    $addedDocRef = $collection->newDocument();
    $data["id"] = $addedDocRef->id();
    $data["creation"] = $this->generateCreation();
    $data["publication"] = $this->generatePublication();
    $addedDocRef->set($data);
    return $data;
  }

  public function generateCreation()
  {
    return array('from' => 'system', 'at' => FieldValue::serverTimestamp());
  }


  public function generatePublication()
  {
    return array('from' => '', 'at' => '', 'status' => 0);
  }

  public function generateHeader()
  {
    return '<!DOCTYPE html><html lang="de">
              <head>
                <meta charset="utf-8" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
              </head>
              <body>
                <div class="container-fluid">';
  }

  public function generateFooter()
  {
    return '</div>
          </body>
        </html>';
  }

}

/*
function scrap_competitions($html)
{
  $output = array();
  if ($html && is_object($html) && isset($html->nodes)) {
    $items = $html->find("#team-competitions .factfile-data .column-left, #team-competitions .factfile-data .column-right");
    foreach ($items as $item) {
      $output[] = array(
        'title' => $item->find('a', 0)->plaintext,
        'competitionType' => $item->find('.label', 0)->plaintext,
        'link' => $item->find('a', 0)->href
      );
    }
    $html->clear();
  }
  return $output;
}

function scrap_standings($html)
{
  $output = array();
  if ($html && is_object($html) && isset($html->nodes)) {

    $items = $html->find("#team-fixture-league-tables tr");
    // loop through items on current page
    foreach ($items as $item) {
      $output_item = array();
      $counter = 0;
      $tds = $item->find("td");
      foreach ($tds as $td) {
        if ($counter > 0) {
          $output_item[] = trim($td->plaintext);
        }
        $counter++;
      }

      if (!empty($output_item)) {
        $output[] = $output_item;
      }
    }
    $html->clear();
  }
  return $output;
}

function saveDriveMember($id, $data, $dbMembers, $members)
{
  $docRef = $dbMembers->document($id);
  if (array_key_exists($id, $members)) {

    $docRef->update([
      ['path' => 'driveImport', 'value' => true]
    ]);

    printf('Member edited ' . $id . '<br />' . PHP_EOL);
  } else {
    $data["creation"] = generateCreation();
    printf('New Member created ' . $id . '<br />' . PHP_EOL);
  }
}

function saveDFBMember($id, $data, $dbMembers, $members)
{
  $docRef = $dbMembers->document($id);
  if (array_key_exists($id, $members)) {

    $docRef->update([
      ['path' => 'dfbImport', 'value' => true],
      ['path' => 'clubData.assignedClub', 'value' => $data["clubData"]["assignedClub"]],
      ['path' => 'dfbData.passNumber', 'value' => $data["dfbData"]["passNumber"]],
      ['path' => 'dfbData.ageGroup', 'value' => $data["dfbData"]["ageGroup"]],
      ['path' => 'dfbData.eligibleForOfficialMatches', 'value' => $data["dfbData"]["eligibleForOfficialMatches"]],
      ['path' => 'dfbData.eligibleForFriendlyMatches', 'value' => $data["dfbData"]["eligibleForFriendlyMatches"]],
      ['path' => 'dfbData.signOut', 'value' => $data["dfbData"]["signOut"]],
      ['path' => 'dfbData.playerStatus', 'value' => $data["dfbData"]["playerStatus"]],
      ['path' => 'dfbData.guestPlayer.guestRight', 'value' => $data["dfbData"]["guestPlayer"]["guestRight"]],
      ['path' => 'dfbData.guestPlayer.season', 'value' => $data["dfbData"]["guestPlayer"]["season"]],
      ['path' => 'dfbData.guestPlayer.type', 'value' => $data["dfbData"]["guestPlayer"]["type"]],
      ['path' => 'dfbData.passPrint', 'value' => $data["dfbData"]["passPrint"]],
      ['path' => 'dfbData.allowedToPlay', 'value' => $data["dfbData"]["allowedToPlay"]]
    ]);

    printf('Member edited ' . $id . '<br />' . PHP_EOL);
  } else {
    $data["creation"] = generateCreation();
    printf('New Member created ' . $id . '<br />' . PHP_EOL);
  }
}

function generateCompetitionTable($competitions)
{
  $returnString = '';
  $returnString .= '<table class="table table-striped table-bordered table-hover table-sm">';
  $returnString .= '<thead class="thead-light">';
  $returnString .= '<tr>';
  $returnString .= '<th>Nr.</th>';
  $returnString .= '<th>Title</th>';
  $returnString .= '<th>Type</th>';
  $returnString .= '<th>Link</th>';
  $returnString .= '</tr>';
  $returnString .= '</thead>';
  $returnString .= '<tbody>';

  $i = 1;
  foreach ($competitions AS $competition) {
    $returnString .= generateCompetitionRow($competition, $i);
    $i++;
  }

  $returnString .= '</tbody>';
  $returnString .= '</table>';

  return $returnString;
}

function generateCompetitionRow($competition, $i)
{
  $returnString = '<tr>';
  $returnString .= '<td scope="row">' . $i . '</td>';
  $returnString .= '<td>' . $competition["title"] . '</td>';
  $returnString .= '<td>' . $competition["competitionType"] . '</td>';
  $returnString .= '<td><a target="_blank" href="' . $competition["link"] . '">Link</a></td>';
  return $returnString;
}

function generateSpreadsheetFromOutput($match, $locations)
{

  $assignedLocation = '';
  foreach ($locations as $title => $id) {
    if ($id === $match["assignedLocation"]) {
      $assignedLocation = $title;
    }
  }

  return array(
    $match["title"],
    $match["matchStartDate"]->format('d.m.Y H:i:s'),
    $match["matchEndDate"]->format('d.m.Y H:i:s'),
    '',
    $assignedLocation
  );
}
 */
