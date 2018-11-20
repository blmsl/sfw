<?php

session_start();

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";
require "../base.class.php";
require_once "../utils.global.php";

$appId = '';
$appSecret = '';
$requiredPermissions = 'public_profile, publish_actions, user_groups';
$redirectURL = '';

$minDelayTime = 20; // Set the min delay in seconds between api requests
$maxDelayTime = 40; // Set the max delay in seconds between api requests
$maxGroups = 1; // Set the max amount of groups to post to


use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\GraphUser;
use Facebook\FacebookRedirectLoginHelper;
FacebookSession::setDefaultApplication($appId , $appSecret);


$session = new FacebookSession('access-token-here');

// Get the GraphUser object for the current user:

try {
  $me = (new FacebookRequest($session, 'GET', '/me'))->execute()->getGraphObject(GraphUser::className());
  echo $me->getName();
} catch (FacebookRequestException $e) {
  // The Graph API returned an error
} catch (\Exception $e) {
  // Some other error occurred
}

/*
$helper = new FacebookRedirectLoginHelper($redirectURL);

try {
  $session = $helper->getSessionFromRedirect();
}
catch(FacebookRequestException $ex) {
  die("FacebookRequestException: " . $ex->getMessage());
}
catch(\Exception $ex) {
  die("Exception: " . $ex->getMessage());
}

// if I'm logged in and ready to post on group pages
if ($session) {
  $groups = (new FacebookRequest(
    $session,
    'GET',
    '/me/groups'
  ))->execute()->getGraphObject()->asArray();
  $_SESSION["groups"] = $groups["data"];
  echo "Total Groups: " . count($groups["data"]);
  if(isset($_SESSION["groups"])) {
    echo '<br>Hi, you are logged into Facebook [ <a href="?logOut=1">Log Out</a> ] ';

    writeToLogs("\n\n\nPosting to Facebook Walls [" . date("Y-m-d h:i:sa", time()) . "]");
    writeToLogs("\n----------------------------------------");
    for($i = 0; $i < $maxGroups; $i++) {

      if($_SESSION["groups"][$i]) {
        $group = $_SESSION["groups"][$i];
        // exclude certain groups
        $continue = true;
        if (strpos($group->name,'Science') !== false) { $continue = false; }
        else if (strpos($group->name,'UCC') !== false) { $continue = false; }
        else if(strpos($group->name,'Udemy') !== false) { $continue = false; }
        else if (strpos($group->name,'JCI') !== false) { $continue = false; }
        else if (strpos($group->name,'Cappamore') !== false) { $continue = false; }
        if($continue) {
          $postURL = '/' . $group->id . '/feed';
          $message = array(
            'message' => 'Hey guys!
							Thought I’d give something back to the community :)
						 	Check out v2 of AppLandr, which allows you to generate beautifully crafted (free or paid) landing pages for your mobile applications! And of course it’s on Product Hunt!
							
							Would love to hear your thoughts!
							
							http://applandr.com',
            'link' => 'http://applandr.com',
            'picture' => 'http://www.applandr.com/lib/images/dark.png'
          );

          $groupUrl = "http://www.facebook.com/groups/" . $group->id;
          try {
            $postRequest = new FacebookRequest($session, 'POST', $postURL, $message);
            $postRequest->execute();

            $logMessage = "\nSUCCESS: posting message to $groupUrl";
            writeToLogs($logMessage);
            echo "<br>SUCCESS: posting message to <a href='$groupUrl' target='_blank'>" . $group->name . "</a>";
          }
          catch(FacebookRequestException $ex) {
            $logMessage = "\nFAIL: posting message to " . $groupUrl . " with ERROR: " . $e->getMessage();
            writeToLogs($logMessage);
            echo "<br>FAIL: posting message to <a href='$groupUrl' target='_blank'>" . $group->name . "</a> with ERROR: " . $e->getMessage();
          }
          $delayTime = rand($minDelayTime, $maxDelayTime);
          sleep($delayTime);
        }
      }
    }
  }
} else {
  $loginURL = $helper->getLoginUrl( array( 'scope' => $requiredPermissions ) );
  echo '<a href="'.$loginURL.'">Login with Facebook</a>';
}
if(isset($_GET["logOut"]) && $_GET["logOut"]==1){
  unset($_SESSION["groups"]);
  header("location: ". $redirectURL);
}

function writeToLogs($textToWrite) {
  $currentfile = "logs.txt";
  $updatedFile = file_get_contents($currentfile);
  $updatedFile .= $textToWrite;
  file_put_contents($currentfile, $updatedFile);
}

/*

use Abraham\TwitterOAuth\TwitterOAuth;

if (!strpos(gethostname(), 'appspot.com')) {
    putenv('GOOGLE_APPLICATION_CREDENTIALS=../client_secret.json');
}

putenv('TWITTER_APPLICATION_CREDENTIALS=../twitter_secret.json');

$project = new sfwApp('sf-winterbach', array('storageService'));

$time_start = microtime(true);

echo $project->generateHeader();

/**
 * @var $storage Google\Cloud\Storage\StorageClient
 *
$storage = $project->storage;
$bucket = $storage->bucket($project->projectId . ".appspot.com");

// get all Articles with publication.datetime within next 15 minutes
$startDateTime = new DateTime();
$startDateTime = $project->roundDownToMinuteInterval($startDateTime, 15);

$endDateTime = new DateTime();
$endDateTime = $project->roundUpToMinuteInterval($endDateTime, 15);

echo "<h1>Lade zu veröffentlichende Artikel</h1>" . PHP_EOL;
echo "<p>Geladen werden alle Artikel, die zwischen dem " . $startDateTime->format('d.m.Y') . ", " . $startDateTime->format('H:i:s') . " Uhr und " . $endDateTime->format('d.m.Y') . ", " . $endDateTime->format('H:i:s') . " Uhr veröffentlich werden sollen.</p>" . PHP_EOL;

$string = file_get_contents(getenv('TWITTER_APPLICATION_CREDENTIALS'));
$config = json_decode($string, true);

$connection = new TwitterOAuth(
    $config["consumerKey"],
    $config["consumerSecret"],
    $config["accessToken"],
    $config["accessTokenSecret"]
);
$content = $connection->get("account/verify_credentials");
var_dump($content);

$scheduledArticles = $project->getArticlesByPublishDate($startDateTime, $endDateTime);
if (count($scheduledArticles) > 0) {

    echo $project->generateArticleTable();


    //$facebook = $project->setUpFacebook();
    //$facebookAuth = new MartinGeorgiev\SocialPost\SocialNetwork\Facebook\SDK5($facebook, '184670324910855' /*$facebookPageId );

    $i = 1;
    foreach ($scheduledArticles as $article) {


        $message = new \MartinGeorgiev\SocialPost\Message('your test message');
        $message->setNetworksToPublishOn([SocialNetwork::LINKEDIN, SocialNetwork::TWITTER]);


        //if ($article["publication"]["status"] === 2) {
        # echo $project->generateArticleRow($i, $article);

    }

    echo $project->generateArticleFooter();
}

echo '<p><span style="font-weight: bold">Ausführungsdauer :</span> ' . (microtime(true) - $time_start) . '</p>' . PHP_EOL;
echo $project->generateFooter();*/
