<?php

use Google\Cloud\Firestore\FieldValue;
use Google\Cloud\Firestore\FirestoreClient;
use Google\Cloud\Storage\StorageClient;

// use Abraham\TwitterOAuth\TwitterOAuth;
// use Facebook\Facebook;

use duzun\hQuery;

require_once "application.class.php";
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
    use sfwApplication;
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

    public function __construct($projectId = 'sportfreunde-winterbach', $initParts = array())
    {
        $this->projectId = $projectId;
        $this->client = $this->getGoogleClient($projectId);
        $this->db = $this->getFireStoreConnection($projectId);

        if (in_array('sheetService', $initParts)) {
            $this->sheetService = new Google_Service_Sheets($this->client);
        }
        if (in_array('driveService', $initParts)) {
            $this->driveService = new Google_Service_Drive($this->client);
        }
        if (in_array('calendarService', $initParts)) {
            $this->calendarService = new Google_Service_Calendar($this->client);
        }
        if (in_array('storageService', $initParts)) {
            $this->storage = $this->getStorageConnection($projectId);
        }

        $this->applicationCollection = $this->db->collection('applications');
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

    /**
     * @param $projectId string
     * @return Google_Client
     */
    public function getGoogleClient($projectId)
    {
        try {
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
        } catch (Exception $e) {
            var_dump($e);
            exit();
        }
        return $client;
    }

    /*
    public function setUpFacebook()
    {
      /*if (!getenv('FACEBOOK_APP_ID') || !file_get_contents(getenv('FACEBOOK_APP_SECRET'))) {
          exit('Facebook Config not loaded');
      }

      $string = file_get_contents(getenv('FACEBOOK_APP_CREDENTIALS'));
      $config = json_decode($string, true); *
      $config = array(
        'app_id' => '431939683855219',
        'app_secret' => '578ec9e8836c3a216cc3ed52b6d90bec'
      );

      try {
        return new Facebook($config);
      } catch (Exception $exception) {
        exit($exception);
      }
    }

    public function setUpTwitter()
    {
      if (!getenv('TWITTER_APPLICATION_CREDENTIALS') || !file_get_contents(getenv('TWITTER_APPLICATION_CREDENTIALS'))) {
        exit('Twitter Config not loaded');
      }

      $string = file_get_contents(getenv('TWITTER_APPLICATION_CREDENTIALS'));
      $config = json_decode($string, true);

      return new TwitterOAuth(
        $config["consumerKey"],
        $config["consumerSecret"],
        $config["accessToken"],
        $config["accessTokenSecret"]
      );
    } */

    /**
     * @param $projectId string
     * @return StorageClient
     */
    public function getStorageConnection($projectId)
    {
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

    /**
     * @param $projectId string
     * @return FirestoreClient
     */
    public function getFireStoreConnection($projectId)
    {
        try {
            return new FirestoreClient([
                'projectId' => $projectId
            ]);
        } catch (Exception $e) {
            echo $e->getMessage();
            exit();
        }
    }

    /**
     * @param $link string
     * @return hQuery
     */
    public function loadRemoteHTML($link)
    {
        return hQuery::fromUrl($link); // , ['Accept' => 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8']
    }

    /**
     * @param $collection Google\Cloud\Firestore\CollectionReference
     * @param $data array
     * @param $batch \Google\Cloud\Firestore\WriteBatch
     * @return mixed
     */
    public function saveFireStoreObject($collection, $data, $batch)
    {
        $addedDocRef = $collection->newDocument();
        $data["id"] = $addedDocRef->id();
        $data["creationAt"] = $this->generateCreationAt();
        $data["creationBy"] = $this->generateCreationBy();
        $data["isImported"] = true;
        $data["publicationAt"] = $this->generatePublicationAt();
        $data["publicationFrom"] = $this->generatePublicationFrom();
        $data["publicationStatus"] = $this->generatePublicationStatus();

        $batch->create($addedDocRef, $data);
        return $data;
    }

    /**
     * @param $collection Google\Cloud\Firestore\CollectionReference
     * @param $id string
     * @param $data array
     * @param $batch object
     * @return mixed
     */
    public function updateFireStoreObject($collection, $id, $data, $batch)
    {
        $doc = $collection->name() . '/' . $id;
        $batch->update($doc, $data);
        return $data;
    }

    public function generateCreationAt()
    {
        return FieldValue::serverTimestamp();
    }

    public function generateCreationBy()
    {
        return 'system';
    }

    public function generatePublicationStatus()
    {
        return 0;
    }

    public function generatePublicationFrom()
    {
        return null;
    }

    public function generatePublicationAt()
    {
        return null;
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
        return '</div>' . PHP_EOL . '</body>' . PHP_EOL . '</html>';
    }

    /**
     * @param $title string
     * @param $items array
     */
    public function generateList($title, $items)
    {
        echo "<h3>".$title."</h3>";
        echo "<ul>";
        foreach ($items as $item) {
            echo "<li>" . $item . "</li>";
        }
        echo "</ul>";
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
