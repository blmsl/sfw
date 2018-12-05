<?php

session_start();

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";
require "../base.class.php";
require_once "../utils.global.php";

use Facebook\Facebook;

try {
    $project = new sfwApp();

    // set batch
    $batch = $project->db->batch();
    $application = $project->getCurrentApplication($batch);

    foreach ($application['socialNetworks'] as $socialNetwork){

        switch ($socialNetwork["title"]){
            case "Facebook":

                $fb = new Facebook(array(
                    'app_id' => $socialNetwork["appId"],
                    'app_secret' => $socialNetwork["appSecret"],
                    'default_graph_version' => 'v2.10'
                ));

                $fb->getDefaultAccessToken();

                $helper = $fb->getRedirectLoginHelper();

                $permissions = ['manage_pages','publish_actions','publish_pages'];
                $loginUrl = $helper->getLoginUrl('fb-callback.php', $permissions);

                echo '<a href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';

                break;
        }
    }

} catch (\Facebook\Exceptions\FacebookResponseException $e) {
    var_dump($e);
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
} catch (\Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    var_dump($e);
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
} catch (Exception $exception){
    var_dump($e);
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
