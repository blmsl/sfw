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

$currentSeason = isset($_GET['current-season']) && $_GET['current-season'] === true ?  new DateTime() : null;
$currentClub = isset($_GET['club']) ?  $_GET['club'] : null;

$eventList = array();
foreach ($project->getSeasons($currentSeason) as $season) {

    $seasonStart = $project->getSeasonStartDate($season);
    $seasonEnd = $project->getSeasonEndDate($season);

    foreach ($project->getClubs($currentClub) as $club) {
        foreach ($club["assignedCalendars"] as $calendarId) {

            try {
                $googleCalendarEvents = $project->getEvents($calendarId, $seasonStart, $seasonEnd);
                foreach ($googleCalendarEvents as $event) {
                    /**
                     * @var $event Google_Service_Calendar_Event
                     */
                    $eventList[] = array(
                        'summary' => $event->getSummary(),
                        'location' => $event->getLocation(),
                        'description' => $event->getDescription(),
                        'start' => $event->getStart(),
                        'end' => $event->getEnd()
                    );
                }
            } catch (Exception $e) {
                echo $e->getMessage();
                exit();
            }
        }
    }
}

echo json_encode($eventList);