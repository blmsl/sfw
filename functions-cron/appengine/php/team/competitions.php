<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../../vendor/autoload.php";

require "../base.class.php";

$projectId = 'sf-winterbach';
$project = new sfwApp($projectId);

echo $project->generateHeader();

echo "<h1>Importiere Tabellenstände von fussball.de</h1>";

echo $project->generateHeader();

$currentSeasonDates = $project->getCurrentSeason(new DateTime());

foreach ($project->getSeasons($currentSeasonDates) as $season) {

    echo $season["title"];

    /*
        $dbTeams = $db->collection('teams');
        foreach ($dbTeams->documents() as $team) {

            echo "<h2>" . $team["title"] . " &ndash; " . $team["subTitle"] . " ( <a target='new' href='" . $team["externalTeamLink"] . "'>Link</a> )</h2>";

            echo "<h4>Wettbewerbe";

            $parts = explode('/', $season["title"]);
            $startYear = substr($parts[0], -4);
            $startDate = DateTime::createFromFormat('d.m.Y', '01.07.' . $startYear);

            $endYear = substr($parts[1], 0);
            $endDate = DateTime::createFromFormat('d.m.Y', '30.06.' . $endYear);

            echo " <small>" . $startDate->format('d.m.Y') . " &ndash; " . $endDate->format('d.m.Y') . "</small></h4>";

            $curlRequest = curlRequest($team["externalTeamLink"]);
            $output = scrap_competitions($curlRequest);
            echo "<pre>";
            if ($output) {
                $docRef = $dbTeams->document($team["id"]);
                $docRef->update([['path' => 'assignedCompetitions', 'value' => $output]]);
                echo generateCompetitionTable($output);
            } else {
                echo "Keine Wettbewerbe vorhanden";
            }
            echo "</pre>";


            echo "<h4>Tabelle";
            echo " <small>" . $startDate->format('d.m.Y') . " &ndash; " . $endDate->format('d.m.Y') . "</small></h4>";

            $output2 = null; // scrap_standings($curlRequest);
            # echo "<h2>" . $team["title"] . " &ndash; " . $team["subTitle"] . " ( <a target='new' href='" . $team["externalTeamLink"] . "'>Link</a> )</h2>";
            echo "<pre>";
            if ($output2) {
                #$docRef = $dbTeams->document($team["id"]);
                #$docRef->update([['path' => 'standings', 'value' => $output]]);
                print_r($output2);
            } else {
                echo "Keine Tabelle vorhanden";
            }
            echo "</pre>";

            unset($curlRequest);
            unset($output);
            unset($output2);
        }
    */
}
