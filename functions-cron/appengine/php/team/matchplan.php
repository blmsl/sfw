<?php

error_reporting(E_ALL);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../functions.php";
require "../../vendor/autoload.php";

use Google\Cloud\Firestore\FirestoreClient;

$db = new FirestoreClient();

$dbClubs = $db->collection('clubs');
$dbMatches = $db->collection('matches');
$dbLocations = $db->collection('locations');
$dbSeasons = $db->collection('seasons');

foreach($dbSeasons->documents() as $season){
    $currentSeason = getCurrentSeasonFromTitle($season["title"]);

    foreach($dbClubs->documents() as $club){
        $clubId = $club["fussballde"]["clubId"];

        $url = 'http://www.fussball.de/ajax.club.matchplan/-/id/' . $clubId . '/mime-type/HTML/mode/PAGE/show-filter/false/max/9999/datum-von/' . $currentSeason["StartDate"]->format('Y-m-d') . '/datum-bis/' . $currentSeason["EndDate"]->format('Y-m-d') . '/show-venues/checked/offset/0';

        $curlRequest = curlRequest($url);
        $output = scrap_matchPlan($curlRequest, $club["Title"]);
        // var_dump($output);
        echo "<br />";
        echo "<br />";
    }

}
echo "<br />";

/*
foreach($dbLocations->documents() as $location){
    echo $location["title"] . " " . $location["address"]["streetName"] . " " . $location["address"]["houseNumber"] . " " . $location["address"]["zip"] . " " . $location["address"]["city"] . " -- ". $location["id"];
    echo "<br />";
}

/*
$curlRequest = curlRequest($url);
$output = scrap_matchPlan($curlRequest, 'SF Winterbach');
*/

/*
$batch = $db->batch();
foreach ($output as $key => $match) {
    $ref = $db->collection('matches')->newDocument();
    $batch->set($ref, $match);
}
$batch->commit();
*/
/* add all results
foreach($output as $match){
    $addedDoc = $dbMatches->add($match);
    printf('Added document with ID: %s' . PHP_EOL, $addedDoc->id() . "<br />");
}

// retrieve all documents from database
$matches = $dbMatches->documents();
echo generateMatchPlanTable($matches); */