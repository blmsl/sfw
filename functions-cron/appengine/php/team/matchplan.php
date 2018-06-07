<?php

header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../functions.php";
require "../../vendor/autoload.php";

use Google\Cloud\Firestore\FirestoreClient;

$clubId = '00ES8GNBEO00001UVV0AG08LVUPGND5I';
$db = new FirestoreClient();

$dbClubs = $db->collection('clubs');
$dbMatches = $db->collection('matches');
$dbSeasons = $db->collection('seasons');

$currentSeason = array(
    'StartDate' => new DateTime('2017-07-01'),
    'EndDate' => new DateTime('2018-06-30')
);

echo $url = 'http://www.fussball.de/ajax.club.matchplan/-/id/' . $clubId . '/mime-type/HTML/mode/PAGE/show-filter/false/max/9999/datum-von/' . $currentSeason["StartDate"]->format('Y-m-d') . '/datum-bis/' . $currentSeason["EndDate"]->format('Y-m-d') . '/show-venues/checked/offset/0';

$curlRequest = curlRequest($url);

$output = scrap_matchPlan($curlRequest, 'SF Winterbach');
echo "<br />";
var_dump($output);

/*
$ref = $db->collection('matches')->newDocument();


$batch = $db->batch();
foreach ($output as $key => $match) {
    $ref = $db->collection('matches')->newDocument();
    $batch->set($ref, [
        'name' => 'New York City'
    ]);
    // $batch->create($ref, $match);
}
$batch->commit();
*/

#$dbMatches->add($output);
/* add all results
foreach($output as $match){
    $addedDoc = $dbMatches->add($match);
    printf('Added document with ID: %s' . PHP_EOL, $addedDoc->id());
}

// retrieve all documents from database
$matches = $dbMatches->documents();
echo generateMatchPlanTable($matches); */