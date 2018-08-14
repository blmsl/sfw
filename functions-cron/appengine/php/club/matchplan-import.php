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
echo "<h1>Importiere den Spielplan von fussball.de</h1>";

// Batch erstellen
# $batch = $project->db->batch();

$jahr = isset($_GET['jahr']) ? DateTime::createFromFormat('Y', $_GET['jahr']) : new DateTime();

// falls ein Jahr übergeben wurde wird die komplette Saison als Start- und Ende gesetzt,
// ansonsten die nächsten 4 Monate ab heute
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

// nur definierte Vereine zulassen
$clubData = isset($_GET['club']) ? $project->getClubDataByTitle($_GET['club']) : $project->getClubDataByTitle('SF Winterbach');
if (!$clubData) {
    echo "Kein Verein mit diesen Daten im Skript hinterlegt (vgl. club.class.php).";
    exit();
}

// Verein aus der DB laden
$club = $project->getClubByTitle($clubData["title"]);
if (!$club) {
    echo "Kein Verein mit diesen Daten in der Datenbank vorhanden. Bitte den Verein " . $clubData["title"] . " erst in der Datenbank anlegen";
    exit();
}

if(!$club["fussballde"]["clubId"]){
    echo "Bei dem Verein " . $clubData["title"] . " fehlt die Fussball.de-Id.";
    exit();
}

// Laden der aktuellen Saison
#$season = $project->getSeasonByDate($seasonStart, $seasonEnd);
#var_dump($season);

// die Spielplan-URL anhand des Saison-Startes und -Endes ODER des aktuellen Datums und des Limits laden
$matchPlanUrl = $project->generateMatchPlanUrl($club["fussballde"]["clubId"], $seasonStart, $loadingLimit ? $loadingLimit : $seasonEnd);
$doc = $project->loadRemoteHTML($matchPlanUrl);

if (TK_PRINT_ENABLED) echo '<br><br>' . $matchPlanUrl . '<br><br>';

$matchPlan = $project->scrapeMatchPlan($doc);
echo $project->generateMatchPlanTable($matchPlan);

tk_print_counts();

echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
