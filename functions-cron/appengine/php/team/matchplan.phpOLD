<?php

    error_reporting(E_ALL);
    ini_set('display_errors', true);
    ini_set('memory_limit', '-1');

    header("Content-Type: text/html; charset=utf-8");

    require "../simple_html_dom.php";
    require "../functions.php";
    require "../../vendor/autoload.php";

    use Google\Cloud\Firestore\FirestoreClient;

    try {
        $db = new FirestoreClient([
            'projectId' => 'sfw-dev'
        ]);
    } catch (\Google\Cloud\Core\Exception\GoogleException $e) {
        var_dump($e);
        exit();
    }

    // CategoryTypes
    $dbCategoryTypes = $db->collection('category-types');
    $categoryTypes = array();
    foreach ($dbCategoryTypes->documents() as $categoryType) {
        $categoryTypes[$categoryType["link"]] = $categoryType["id"];
    }

    // Categories
    $dbCategories = $db->collection('categories');
    $categories = array();
    foreach ($dbCategories->documents() as $category) {
        $categories[$category["title"]] = $category["id"];
    }

    // Locations
    $dbLocations = $db->collection('locations');
    $locations = array();
    foreach ($dbLocations->documents() as $location) {
        $locations[$location["title"]] = $location["id"];
    }

    // Seasons
    $dbSeasons = $db->collection('seasons');
    $seasons = array();
    foreach ($dbSeasons->documents() as $season) {
        $seasons[$season["title"]] = $season["id"];
        if (isset($_GET["season"]) && $season["id"] === $_GET["season"]) {
            $parts = explode('/', $season["title"]);
            $startYear = substr($parts[0], -4);
            $date = DateTime::createFromFormat('d.m.Y', '15.07.' . $startYear);
            $currentSeason = getCurrentSeason($seasons, $dbSeasons, $date->format('Y-m-d'));
        }
    }

    if (!isset($_GET["season"])) {
        $currentSeason = getCurrentSeason($seasons, $dbSeasons);
    }

    // Teams
    $dbTeams = $db->collection('teams');
    $teams = array();
    foreach ($dbTeams->documents() as $team) {
        if ($team["assignedSeason"] === $currentSeason["id"]) {
            $teams[$team["title"] . "-" . $team["subTitle"] . "-" . $team["assignedSeason"]] = $team["id"];
        }
    }

    // Matches
    $dbMatches = $db->collection('matches');
    $matches = array();
    foreach ($dbMatches->documents() as $match) {
        $matches[$match["title"] . '-' . $match['matchLink']] = $match["id"];
    }

    echo "<h1>Spielplan";

    $startDate = DateTime::createFromFormat('Y-m-d', $currentSeason["StartDate"]);
    $endDate = DateTime::createFromFormat('Y-m-d', $currentSeason["EndDate"]);
    echo " <small>".$startDate->format('d.m.Y')." &ndash; ".$endDate->format('d.m.Y')."</small></h1>";

    $dbClubs = $db->collection('clubs');
    foreach ($dbClubs->documents() as $club) {
        $clubId = $club["fussballde"]["clubId"];

        $url = 'http://www.fussball.de/ajax.club.matchplan/-/id/' . $clubId . '/mime-type/HTML/mode/PAGE/show-filter/false/max/9999/datum-von/' . $currentSeason["StartDate"] . '/datum-bis/' . $currentSeason["EndDate"] . '/show-venues/checked/offset/0';

        $curlRequest = curlRequest($url);
        $output = scrap_matchPlan($curlRequest, $club, $locations, $dbLocations, $teams, $dbTeams, $categories, $dbCategories, $categoryTypes, $currentSeason);

        foreach ($output as $match) {
            /* if(!array_key_exists($match["title"] . '-' . $match['matchLink'], $matches)) {
                $addedDocRef = $dbMatches->newDocument();
                $match["id"] = $addedDocRef->id();
                $addedDocRef->set($match);
                printf('New Match ' . $match["title"] . ' with ID ' . $match["id"] . "<br />" . PHP_EOL);
            } */
        }

        echo generateMatchPlanTable($output, $categories, $locations, $teams);
    }
    echo "Import done";
