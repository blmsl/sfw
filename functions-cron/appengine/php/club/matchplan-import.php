<?php

require "../../vendor/autoload.php";
require "../base.class.php";

$project = new sfwApp('sf-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();

echo "<h1>Importiere den Spielplan von fussball.de</h1>";

if(!isset($_GET["jahr"]) || !isset($_GET["clubId"])){
  echo "Parameter jahr und / oder clubId fehlen";
  exit();
}

$seasonStart = DateTime::createFromFormat('d.m.Y', '01.07.' . $_GET['year']);
$seasonEnd = clone ($seasonStart);
$seasonEnd->modify('+ 1 year')->modify('-1 day');
var_dump($seasonStart);
var_dump($seasonEnd);



/*
$seasons = $project->getSeasons();
var_dump($seasons);

#$doc = hQuery::fromUrl('http://example.com/someDoc.html');
#var_dump($doc->headers);

/*
$categoryTypes = $project->getCategoryTypes();
var_dump($categoryTypes);

$locations = $project->getLocations();
var_dump($locations);

$categories = $project->getCategories();
var_dump($categories);


$clubs = $project->getClubs();
var_dump($clubs);

$teams = $project->getTeams();
var_dump($teams);

$matches = $project->getMatches();
var_dump($matches);

/*
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
} */

echo '<p><b>Ausführungsdauer :</b> '. (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
