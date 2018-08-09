<?php

require "../../vendor/autoload.php";
require "../base.class.php";

$project = new sfwApp('sf-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();

/*
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
echo json_encode($eventList); */
