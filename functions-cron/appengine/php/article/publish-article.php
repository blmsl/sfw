<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");


require "../../vendor/autoload.php";
require "../base.class.php";

require_once "../utils.global.php";

if(!strpos(gethostname(), 'appspot.com')) {
  putenv('GOOGLE_APPLICATION_CREDENTIALS=../client_secret.json');
}

putenv('TWITTER_APPLICATION_CREDENTIALS=../twitter_secret.json');

$project = new sfwApp('sf-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();

// get all Articles with publication.datetime within next 15 minutes
$startDateTime = new DateTime();
$startDateTime = $project->roundDownToMinuteInterval($startDateTime, 15);

$endDateTime = new DateTime();
$endDateTime = $project->roundUpToMinuteInterval($endDateTime, 15);

echo "<h1>Lade zu veröffentlichende Artikel</h1>" . PHP_EOL;

echo "<p>Geladen werden alle Artikel, die zwischen dem " . $startDateTime->format('d.m.Y') . ", " . $startDateTime->format('H:i:s') . " Uhr und " . $endDateTime->format('d.m.Y') . ", " . $endDateTime->format('H:i:s') . " Uhr veröffentlich werden sollen.</p>" . PHP_EOL;


$scheduledArticles = $project->getArticlesByPublishDate($startDateTime, $endDateTime);
if (count($scheduledArticles) > 0) {

  echo $project->generateArticleTable();

  $project->twitter = $project->setUpTwitter();

  $i = 1;
  foreach ($scheduledArticles as $article) {
    if ($article["publication"]["status"] === 2) {
      echo $project->generateArticleRow($i, $article);
    }
  }

  echo $project->generateArticleFooter();
}

echo '<p><span style="font-weight: bold">Ausführungsdauer :</span> ' . (microtime(true) - $time_start) . '</p>' . PHP_EOL;
echo $project->generateFooter();
