<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");


require "../../vendor/autoload.php";
require "../base.class.php";

require_once "../utils.global.php";


putenv('GOOGLE_APPLICATION_CREDENTIALS=../client_secret.json');
putenv('TWITTER_APPLICATION_CREDENTIALS=../twitter_secret.json');

$project = new sfwApp('sf-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();

// get all Articles with publication.datetime within next 15 minutes
$startDateTime = new DateTime();
$startDateTime = $project->roundDownToMinuteInterval($startDateTime, 15);

$endDateTime = new DateTime();
$endDateTime = $project->roundUpToMinuteInterval($endDateTime, 15);

echo "<h1>Lade zu veröffentlichende Artikel</h1>";
echo "<p>Geladen werden alle Artikel, die zwischen dem 
" . $startDateTime->format('d.m.Y') . ", " . $startDateTime->format('H:i:s') . " Uhr und
" . $endDateTime->format('d.m.Y') . ", " . $endDateTime->format('H:i:s') . " Uhr veröffentlich werden sollen.</p>";


$twitter = $project->setUpTwitter();
var_dump($twitter);

$scheduledArticles = $project->getArticlesByPublishDate($startDateTime, $endDateTime);
foreach($scheduledArticles as $article){

  if($article["publication"]["status"] === 2){

      echo "<h3>" . $article["title"] . "</h3>";
      echo "<ul>";

      echo "<li>Publishing in Frontend</li>";

      if(key_exists('scheduled', $article["meta"]["facebook"]) && $article["meta"]["facebook"]["scheduled"] === true){
        echo "<li>Publishing to facebook</li>";
      }

      if(key_exists('scheduled', $article["meta"]["twitter"]) && $article["meta"]["twitter"]["scheduled"] === true){
        echo "<li>Publishing to twitter</li>";

        /*$params = array(
          'status' => 'SF Winterbach - SV Überroth - Morgen Abend, 19:30 in Winterbach #pokal #saarlandpokal #amateure #sfw'
        );
        $reply = (array) $cb->statuses_update($params);
        var_dump($reply);*/
      }

      echo "<ul>";
  }

}


echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
