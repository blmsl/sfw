<?php

/**
 * Alle
 */

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');
header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../../vendor/autoload.php";
require "../base.class.php";

$projectId = 'sf-winterbach';
$project = new sfwApp($projectId);

$calendarId = isset($_GET['calendarId']) ?  $_GET['calendarId'] : '';
$currentSeason = isset($_GET['current-season']) && $_GET['current-season'] === true ?  new DateTime() : null;
$currentClub = isset($_GET['club']) ?  $_GET['club'] : null;

$eventList = array();

if($calendarId !== ''){
    $currentDate = new DateTime();
    $eventList = $project->loadGoogleEventList($calendarId, $currentDate->modify('-6 month'), $currentDate->modify('+12 month'));
} else {

    foreach ($project->getSeasons($currentSeason) as $season) {

        $seasonStart = $project->getSeasonStartDate($season);
        $seasonEnd = $project->getSeasonEndDate($season);

        foreach ($project->getClubs($currentClub) as $club) {
            foreach ($club["assignedCalendars"] as $calendarId) {
                try {
                    $eventList = $project->loadGoogleEventList($calendarId, $seasonStart, $seasonEnd);
                } catch (Exception $e) {
                    echo $e->getMessage();
                    exit();
                }
            }
        }
    }
}
echo json_encode($eventList);