<?php

/**
 * Spielplan von fussball.de in die DB importieren
 */

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../../vendor/autoload.php";
require "../base.class.php";

$project = new sfwApp('sf-winterbach');
$time_start = microtime(true);

echo $project->generateHeader();
echo "<h1>Importiere den Spielplan von fussball.de</h1>";

$categoryTypes = $project->getCategoryTypes();
$project->getLocations();
echo $project->generateHeader();

$currentSeason = isset($_GET['current-season']) && $_GET['current-season'] === true ?  new DateTime() : null;
$currentClub = isset($_GET['club']) ?  $_GET['club'] : null;

foreach ($project->getSeasons($currentSeason) as $season) {

    $seasonStart = $project->getSeasonStartDate($season);
    $seasonEnd = $project->getSeasonEndDate($season);

    echo $project->generateSeasonHeading($season);

    foreach ($project->getClubs($currentClub) as $club) {
        $request = $project->getMatchPlan($club, $seasonStart, $seasonEnd);
        $output = $project->scrap_matchPlan($request, $club, $season);
        echo $project->generateMatchPlanTable($output);
    }
}

echo "<p>Import erfolgreich</p>";
echo '<p><b>Ausführungsdauer :</b> '. (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
