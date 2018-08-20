<?php

use Google\Cloud\Firestore\FieldValue;
use Google\Cloud\Firestore\FirestoreClient;
use Google\Cloud\Storage\StorageClient;

use duzun\hQuery;

require_once "article.class.php";
require_once "calendar.class.php";
require_once "category.class.php";
require_once "category-type.class.php";
require_once "club.class.php";
require_once "drive.class.php";
require_once "location.class.php";
require_once "match.class.php";
require_once "member.class.php";
require_once "season.class.php";
require_once "team.class.php";

class sfwApp
{
  use sfwArticle;
  use sfwBase;
  use sfwCalendar;
  use sfwCategory;
  use sfwCategoryType;
  use sfwClub;
  use sfwDrive;
  use sfwLocation;
  use sfwMatch;
  use sfwMember;
  use sfwSeason;
  use sfwTeam;
}

trait sfwBase
{
  public $projectId = null;
  /**
   * @var $db Google\Cloud\Firestore\FirestoreClient
   */
  public $db;
  /**
   * @var $client Google_Client
   */
  public $client;

  public $sheetService = null;
  public $driveService = null;
  public $calendarService = null;
  public $twitterConfig = null;
  public $storage = null;

  public $twitter = null;

  public function __construct($projectId, $initParts = array())
  {
    $this->projectId = $projectId;
    $this->client = $this->getGoogleClient($projectId);
    $this->db = $this->getFireStoreConnection($projectId);

    if(in_array('sheetService', $initParts)){
      $this->sheetService = new Google_Service_Sheets($this->client);
    }
    if(in_array('driveService', $initParts)){
      $this->driveService = new Google_Service_Drive($this->client);
    }
    if(in_array('calendarService', $initParts)){
      $this->calendarService = new Google_Service_Calendar($this->client);
    }
    if(in_array('storageService', $initParts)){
      $this->storage = $this->getStorageConnection($projectId);
    }

    $this->articleCollection = $this->db->collection('articles');
    $this->categoryCollection = $this->db->collection('categories');
    $this->categoryTypeCollection = $this->db->collection('category-types');
    $this->clubCollection = $this->db->collection('clubs');
    $this->locationCollection = $this->db->collection('locations');
    $this->matchCollection = $this->db->collection('matches');
    $this->memberCollection = $this->db->collection('members');

    $this->seasonCollection = $this->db->collection('seasons');
    $this->teamCollection = $this->db->collection('teams');
  }

  public function getGoogleClient($projectId)
  {
    $client = new Google_Client([
      'projectId' => $projectId
    ]);
    $client->useApplicationDefaultCredentials();

    $client->setApplicationName("SFW via FlexEngine");
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

  public function setUpTwitter(){
    if(!getenv('TWITTER_APPLICATION_CREDENTIALS') || !file_get_contents(getenv('TWITTER_APPLICATION_CREDENTIALS'))){
      exit('Twitter Config not loaded');
    }

    $string = file_get_contents(getenv('TWITTER_APPLICATION_CREDENTIALS'));
    $this->twitterConfig = json_decode($string, true);

    Codebird\Codebird::setConsumerKey($this->twitterConfig["consumerKey"], $this->twitterConfig["consumerSecret"]);
    $cb = Codebird\Codebird::getInstance();
    $cb->setToken($this->twitterConfig["accessToken"], $this->twitterConfig["accessTokenSecret"]);
    return $cb;
  }

  public function getStorageConnection($projectId){
    try {
      $storage = new StorageClient([
        'projectId' => $projectId
      ]);
    } catch (Exception $e) {
      var_dump($e);
      exit();
    }
    return $storage;
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

  public function loadRemoteHTML($link){
      return hQuery::fromUrl($link); // , ['Accept' => 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8']
  }

  /**
   * @param $collection Google\Cloud\Firestore\CollectionReference
   * @param $data
   * @param $batch Google\Cloud\Firestore\WriteBatch
   * @return mixed
   */
  public function saveFireStoreObject($collection, $data, $batch)
  {
    $addedDocRef = $collection->newDocument();
    $data["id"] = $addedDocRef->id();
    $data["creation"] = $this->generateCreation();
    $data["isImported"] = true;
    $data["publication"] = $this->generatePublication();

    if ($batch) {
      $batch->create($addedDocRef, $data);
      return $data;
    } else {
      $addedDocRef->set($data);
      return $data;
    }
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
                <style>
                    .table-fixed thead {
                      width: 97%;
                    }
                    .table-fixed tbody {                   
                      overflow-y: auto;
                      width: 100%;
                    }
                    .table-fixed thead, .table-fixed tbody, .table-fixed tr, .table-fixed td, .table-fixed th {
                      display: block;
                    }
                    .table-fixed tbody td, .table-fixed thead > tr> th {
                      float: left;
                      border-bottom-width: 0;
                    }
                </style>
              </head>
              <body>
                <div class="container-fluid">' . PHP_EOL;
  }

  public function generateFooter()
  {
    return '</div>' . PHP_EOL . '</body>' . PHP_EOL. '</html>';
  }

  /**
   * Round up minutes to the nearest upper interval of a DateTime object.
   *
   * @param \DateTime $dateTime
   * @param int $minuteInterval
   * @return \DateTime
   */
  public function roundUpToMinuteInterval(\DateTime $dateTime, $minuteInterval = 10)
  {
    return $dateTime->setTime(
      $dateTime->format('H'),
      ceil($dateTime->format('i') / $minuteInterval) * $minuteInterval,
      0
    );
  }

  /**
   * @param DateTime $dateTime
   * @param int $minuteInterval
   * @return DateTime|false
   */
  public function roundDownToMinuteInterval(\DateTime $dateTime, $minuteInterval = 10)
  {
    return $dateTime->setTime(
      $dateTime->format('H'),
      floor($dateTime->format('i') / $minuteInterval) * $minuteInterval,
      0
    );
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
