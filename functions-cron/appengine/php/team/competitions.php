<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";
require "../base.class.php";

require_once "../utils.global.php"; # by emre isik

if(!strpos(gethostname(), 'appspot.com')) {
  putenv('GOOGLE_APPLICATION_CREDENTIALS=../client_secret.json');
}

$project = new sfwApp('sf-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();
echo "<h1>Importiere die Wettbewerbe + Tabelle von fussball.de</h1>";

// Batch erstellen
$batch = $project->db->batch();
#$batch2 = $project->db->batch();

$jahr = isset($_GET['jahr']) ? DateTime::createFromFormat('Y', $_GET['jahr']) : new DateTime();

// falls ein Jahr übergeben wurde wird die komplette Saison als Start- und Ende gesetzt,
// ansonsten die nächsten 4 Monate ab heute
$loadingLimit = null;
if (!isset($_GET['jahr'])) {
  $jahr = date('Y');
}

$seasonStart = $project->getSeasonStartDate($jahr);
$seasonStartClone = clone($seasonStart);
$loadingLimit = $seasonStartClone->modify('+1 year')->modify('-1 day');
$seasonEndDate = $loadingLimit;
echo "<h3>Lade Daten vom " . $seasonStart->format('d.m.Y') . " bis " . $loadingLimit->format('d.m.Y') . " </h3>";

// Laden der aktuellen Saison
$assignedSeason = $project->getSeasonByDate($seasonStart, $seasonEndDate, $batch);

// Laden aller Mannschaften aus dieser Saison
$assignedTeams = $project->getTeamsBySeason($assignedSeason);

var_dump($assignedTeams);

