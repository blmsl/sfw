<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../../vendor/autoload.php";
require "../base.class.php";

require_once "../utils.global.php"; # by emre isik

if (!strpos(gethostname(), 'appspot.com')) {
    putenv('GOOGLE_APPLICATION_CREDENTIALS=../../client_secret.json');
}

$project = new sfwApp('sportfreunde-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();
echo "<h1>Importiere den Spielplan von fussball.de</h1>";

// Batch erstellen
$batch = $project->db->batch();
$batch2 = $project->db->batch();

$seasonStart = isset($_GET['jahr']) ? DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $_GET['jahr'] . '-07-01 00:00:00') : new DateTimeImmutable();

// falls ein Jahr übergeben wurde wird die komplette Saison als Start- und Ende gesetzt,
// ansonsten die nächsten 4 Monate ab heute
if (isset($_GET['jahr'])) {
    $loadingLimit = $seasonStart->add(new DateInterval('P1Y'))->sub(new DateInterval('P1D'));
    echo "<h3>Lade Daten vom " . $seasonStart->format('d.m.Y') . " bis " . $loadingLimit->format('d.m.Y') . " </h3>";
} else {
    $loadingLimit = $seasonStart->add(new DateInterval('P4M'));
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

if (!$club["fussballde"]["clubId"]) {
    echo "Bei dem Verein " . $clubData["title"] . " fehlt die Fussball.de-Id.";
    exit();
}

// Laden der aktuellen Saison
$assignedSeason = $project->getSeasonByDate($seasonStart, $batch);

// die Spielplan-URL anhand des Saison-Startes und -Endes ODER des aktuellen Datums und des Limits laden
$matchPlanUrl = $project->generateMatchPlanUrl($club["fussballde"]["clubId"], $seasonStart, $loadingLimit);
$doc = $project->loadRemoteHTML($matchPlanUrl);

if (TK_PRINT_ENABLED) echo '<br><br>' . $matchPlanUrl . '<br><br>';

$matchPlan = $project->scrapeMatchPlan($doc, $club["title"]);
echo $project->generateMatchPlanTable($matchPlan);

$locationCategoryType = $project->getCategoryTypeByLink('location.types', $batch);
$teamCategoryType = $project->getCategoryTypeByLink('team.types', $batch);

$categories = $project->getCategoryList();
$locationList = $project->getLocationList();
$teamList = $project->getTeamsByClubAndSeason($club, $assignedSeason);
$matchList = $project->getMatchesBetweenStartAndEndDate($seasonStart, $loadingLimit);

$i = 0;
foreach ($matchPlan as $match) {

    if (!key_exists('dontShowThis', $match)) {

        $location = null;

        if (key_exists('assignedLocation', $match)) {
            $locationCategoryName = $match["assignedLocation"]["assignedLocationCategory"];
            if (!key_exists($locationCategoryName, $categories) && $locationCategoryName !== '') {
                $categories[$locationCategoryName] = $project->getCategoryByTitleAndCategoryType($locationCategoryName, $locationCategoryType, $i < 450 ? $batch : $batch2);
                $i++;
            }
            $locationCategory = $categories[$match["assignedLocation"]["assignedLocationCategory"]];

            $locationTitle = $match["assignedLocation"]["type"] . " " . $match["assignedLocation"]["address"]["streetName"] . ", " . $match["assignedLocation"]["address"]["city"];
            if (!key_exists($locationTitle, $locationList) && $locationTitle !== ' ,') {
                $locationList[$locationTitle] = $project->getLocationByLocationDataAndCategory($match["assignedLocation"], $locationCategory, $i < 450 ? $batch : $batch2);
                $i++;
            }
            $location = $locationList[$locationTitle];
        }

        // Mannschaftskategorien
        $teamCategoryName = $match["assignedCategories"]["assignedCategory"];
        if (!key_exists($teamCategoryName, $categories)) {
            $categories[$teamCategoryName] = $project->getCategoryByTitleAndCategoryType($match["assignedCategories"]["assignedCategory"], $teamCategoryType, $i < 450 ? $batch : $batch2);
            $i++;
        }
        $teamCategory = $categories[$teamCategoryName];

        $teamMainCategoryName = $match["assignedCategories"]["assignedMainCategory"];
        if (!key_exists($teamMainCategoryName, $categories)) {
            $categories[$teamMainCategoryName] = $project->getCategoryByTitleAndCategoryType($match["assignedCategories"]["assignedMainCategory"], $teamCategoryType, $i < 450 ? $batch : $batch2);
            $i++;
        }
        $teamMainCategory = $categories[$teamMainCategoryName];

        // Dazugehörige Mannschaft
        $assignedTeam = $match["isHomeTeam"] ? $match["homeTeam"] : $match["guestTeam"];
        $teamName = $teamCategory["title"] . "-" . $assignedTeam["title"];
        if (!key_exists($teamName, $teamList)) {
            $teamList[$teamName] = $project->getTeamByTeamData($assignedTeam, $assignedSeason, $club, $teamCategory, $teamMainCategory, $i < 450 ? $batch : $batch2);
            $i++;
        }
        $team = $teamList[$teamName];

        // save Match
        $matchName = $match['assignedCategories']["assignedCategory"] . ': ' . $match['homeTeam']['title'] . ' – ' . $match['guestTeam']['title'] . "-" . $match["matchLink"];
        if (!key_exists($matchName, $matchList) && array_key_exists("assignedLocation", $match)) {
            $project->saveMatch($match, $team, $location, $teamCategory, $teamMainCategory, $i < 450 ? $batch : $batch2);
            $i++;
        } else {
            // no assignedLocation => matchDate has changed or is canceled => so check if match exists in db and delete it
            // toDo: Delete canceled matches
        }
    }
}

// Scrape Competitions and Standings
$assignedTeams = $project->getTeamsBySeason($assignedSeason);

foreach ($assignedTeams as $team) {
    $doc = $project->loadRemoteHTML($team["externalTeamLink"]);
    $teamPageData = $project->scrapeTeamDetailPage($doc);
    $project->updateTeam($team["id"], $teamPageData, $i < 450 ? $batch : $batch2);
    $i++;
}

// End Competitions and Standings

$batch->commit();
if ($i >= 450) {
    $batch2->commit();
}

tk_print_counts();

echo '<p><b>Ausführungsdauer :</b> ' . (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
