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
$dbMatches = $db->collection('match-imports');
$dbLocations = $db->collection('locations');
$dbSeasons = $db->collection('seasons');
$dbTeams = $db->collection('teams');
$dbCategories = $db->collection('categories');
$dbCategoryTypes = $db->collection('category-types');

$categoryTypes = array();
foreach($dbCategoryTypes->documents() as $categoryType){
    $categoryTypes[$categoryType["link"]] = $categoryType["id"];
}

$categories = array();
foreach($dbCategories->documents() as $category){
    $categories[$category["title"]] = $category["id"];
}

$locations = array();
foreach($dbLocations->documents() as $location){
    $locations[$location["title"]] = $location["id"];
}
var_dump($locations);

$seasons = array();
foreach($dbSeasons->documents() as $season) {
    $seasons[$season["title"]] = $season["id"];
}
$currentSeason = getCurrentSeason($seasons, $dbSeasons);

// teams from current season
$teams = array();
foreach($dbTeams->documents() as $team){
    if($team["assignedSeason"] === $currentSeason){
        $teams[$team["title"] . "-" . $team["subTitle"]] = array(
            "teamId" => $team["id"],
            "assignedClub" => $team["assignedClub"]
        );
    }
}
#var_dump($teams);
#echo "<br />";
#echo "<br />";

foreach ($dbClubs->documents() as $club) {
    $clubId = $club["fussballde"]["clubId"];

    $url = 'http://www.fussball.de/ajax.club.matchplan/-/id/' . $clubId . '/mime-type/HTML/mode/PAGE/show-filter/false/max/9999/datum-von/' . $currentSeason["StartDate"] . '/datum-bis/' . $currentSeason["EndDate"] . '/show-venues/checked/offset/0';

    $curlRequest = curlRequest($url);
    $output = scrap_matchPlan($curlRequest, $club, $locations, $teams, $categories, $dbCategories, $categoryTypes);

    #foreach($output as $match){
        // $addedDoc = $dbMatches->add($match);
        // printf('Added document with ID: %s' . PHP_EOL, $addedDoc->id() . "<br />");
    #}
}


#$matches = $dbMatches->documents();
#echo generateMatchPlanTable($matches);

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