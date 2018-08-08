<?php

require "../../vendor/autoload.php";
require "../base.class.php";

$project = new sfwApp('sf-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();

echo "<h1>Importiere den Spielplan von fussball.de</h1>";

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

echo '<p><b>Ausführungsdauer :</b> '. (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
