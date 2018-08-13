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

echo "<h1>Lade zu veröffentlichende Artikel</h1>" . PHP_EOL;

echo "<p>Geladen werden alle Artikel, die zwischen dem " . $startDateTime->format('d.m.Y') . ", " . $startDateTime->format('H:i:s') . " Uhr und " . $endDateTime->format('d.m.Y') . ", " . $endDateTime->format('H:i:s') . " Uhr veröffentlich werden sollen.</p>" . PHP_EOL;


$scheduledArticles = $project->getArticlesByPublishDate($startDateTime, $endDateTime);
if (count($scheduledArticles) > 0) {
  $twitter = $project->setUpTwitter();
}
foreach ($scheduledArticles as $article) {

  if ($article["publication"]["status"] === 2) {

    echo "<h3>" . $article["title"] . "</h3>" . PHP_EOL;

    echo "<ul>" . PHP_EOL;

    echo "<li>Publishing in Frontend</li>" . PHP_EOL;

    #if(key_exists('scheduled', $article["meta"]["facebook"]) && $article["meta"]["facebook"]["scheduled"] === true){
    #echo "<li>Publishing to facebook</li>";
    #}

    if (key_exists('scheduled', $article["meta"]["twitter"]) && $article["meta"]["twitter"]["scheduled"] === true) {
      echo "<li>";

      $title = $article["meta"]["twitter"]["title"] !== '' ? $article["meta"]["twitter"]["title"] : $article["title"];
      $description = $article["meta"]["twitter"]["description"] !== '' ? $article["meta"]["twitter"]["description"] : '';
      $description === '' && $article["excerpt"] === '' ? $description = $article["text"] : $description = $article["excerpt"];

      $params = array('status' => substr($description, 0, 280));
      /**
       * @var $twitter object
       */
      $reply = (array)$twitter->statuses_update($params);

      if ($reply["httpstatus"] === 200) {
        $createdAt = DateTime::createFromFormat('D M d H:i:s P Y', $reply["created_at"]);

        echo "Auf Twitter veröffentlicht am " . $createdAt->format('d.m.Y H:i:s') . ": <a target='_blank' href='https://twitter.com/" . $project->twitterConfig["siteName"] . "/status/" . $reply["id"] . "'>Link</a>";

      } else {
        var_dump($reply);
        echo "<span style='color:red'>" . $reply["errors"][0]["message"] . "</span>";

      }
      echo "</li>" . PHP_EOL;
    }

    echo "</ul>" . PHP_EOL;
  }
  echo "<br />" . PHP_EOL;
}


echo '<p><span style="font-weight: bold">Ausführungsdauer :</span> ' . (microtime(true) - $time_start) . '</p>' . PHP_EOL;
echo $project->generateFooter();
