<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");


require "../../vendor/autoload.php";
require "../base.class.php";


putenv('GOOGLE_APPLICATION_CREDENTIALS=../client_secret.json');

$project = new sfwApp('sf-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();
echo "<h1>Importiere den Spielplan von fussball.de</h1>";


$jahr = isset($_GET['jahr']) ? DateTime::createFromFormat('Y', $_GET['jahr']) : new DateTime();

$loadingLimit = null;
if (isset($_GET['jahr'])) {
    $seasonStart = $project->getSeasonStartDate($jahr);
    $seasonEnd = $project->getSeasonEndDate($jahr);
    echo "<h3>Lade Daten vom " . $seasonStart->format('d.m.Y') . " bis " . $seasonEnd->format('d.m.Y') . " </h3>";
} else {
    // load data for the next 4 months
    $seasonStart = $jahr;
    $seasonStartClone = clone($seasonStart);
    $loadingLimit = $seasonStartClone->modify('+4 month');
    $seasonEnd = $seasonStartClone->modify('+1 year');
    echo "<h3>Lade Daten vom " . $seasonStart->format('d.m.Y') . " bis " . $loadingLimit->format('d.m.Y') . " </h3>";
}


$clubData = isset($_GET['club']) ? $project->getClubDataByTitle($_GET['club']) : $project->getClubDataByTitle('SF Winterbach');
if (!$clubData) {
    echo "Kein Verein mit diesen Daten im Skript hinterlegt (vgl. club.class.php).";
    exit();
}

$club = $project->getClubByTitle($clubData["title"]);
if ($club) {

    #$season = $project->getSeasonByDate($seasonStart, $seasonEnd);
    #var_dump($season);

    $matchPlanUrl = $project->generateMatchPlanUrl($club["fussballde"]["clubId"], $seasonStart, $loadingLimit ? $loadingLimit : $seasonEnd);
    $doc = $project->loadRemoteHTML($matchPlanUrl);

    $matchPlan = $project->scrapeMatchPlan($doc);
}


#$categoryTypes = $project->getCategoryTypes();
#var_dump($categoryTypes);

#$locations = $project->getLocations();

/*
$categoryTypes = $project->getCategoryTypes();
$project->getLocations();
echo $project->generateHeader();

$currentSeason = isset($_GET['current-season']) && $_GET['current-season'] === true ?  new DateTime() : null;
$currentClub = isset($_GET['club']) ?  $_GET['club'] : null;

foreach ($project->getSeasons($currentSeason) as $season) {

    $seasonStart = $project->getSeasonStartDate($season);
    $seasonEnd = $project->getSeasonEndDate($season);

    echo $project->generateSeasonHeading($season);

    // Batch to create and delete matches in the calendar
    $batch = $project->db->batch();

    foreach ($project->getClubs($currentClub) as $club) {
        $request = $project->getMatchPlan($club, $seasonStart, $seasonEnd);
        $output = $project->scrap_matchPlan($request, $club, $season, $batch);
        echo $project->generateMatchPlanTable($output);
    }
    $batch->commit();
}
*/

echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
