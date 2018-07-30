<?php

    /*
    error_reporting(E_ALL);
    ini_set('display_errors', true);
    ini_set('memory_limit', '-1');

    header("Content-Type: text/html; charset=utf-8");

    require "../simple_html_dom.php";
    require "../base.class.php";
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

    $dbTeams = $db->collection('teams');
    $teams = array();
    foreach ($dbTeams->documents() as $team) {
        if ($team["assignedSeason"] === $currentSeason["id"]) {
            $teams[$team["id"]] = $team;
        }
    }

    echo "<h1>Tabellenstände";

    $startDate = DateTime::createFromFormat('Y-m-d', $currentSeason["StartDate"]);
    $endDate = DateTime::createFromFormat('Y-m-d', $currentSeason["EndDate"]);
    echo " <small>".$startDate->format('d.m.Y')." &ndash; ".$endDate->format('d.m.Y')."</small></h1>";

    foreach ($teams AS $teamId => $team) {
        $curlRequest = curlRequest($team["externalTeamLink"]);
        $output = scrap_standings($curlRequest);
        echo "<h2>" . $team["title"] . " &ndash; " . $team["subTitle"] . " ( <a target='new' href='" . $team["externalTeamLink"] . "'>Link</a> )</h2>";
        echo "<pre>";
        if ($output) {
            #$docRef = $dbTeams->document($team["id"]);
            #$docRef->update([['path' => 'standings', 'value' => $output]]);
            print_r($output);
        } else {
            echo "Keine Tabelle vorhanden";
        }
        echo "</pre>";
    } */
