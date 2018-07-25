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

$eventList = array();
foreach ($project->getSeasons() as $season) {

    $seasonStart = $project->getSeasonStartDate($season);
    $seasonEnd = $project->getSeasonEndDate($season);

    foreach ($project->getClubs() as $club) {

        $fireStoreList = array();
        /* get all Matches
        $matches = $project->getMatches();
        foreach ($matches AS $match){
            if($match["assignedClub"] === $club["id"]
                && $match["matchStartDate"]->get()->getTimestamp() > $seasonStart->getTimestamp()
                && $match["matchEndDate"]->get()->getTimestamp() < $seasonEnd->getTimestamp()
            ){
                echo $match["title"] . "<br />";
            }
        }

        // get all Birthdays
        $members = $project->getMembers();
        foreach($members as $member){
            if($member["assignedClub"] === $club["id"] && key_exists("birthday", $member["mainData"])){
                echo $member["firstName"] . "<br />";
            }
        }

        // get saved Events
        // remove savedEvents that are not in the array


        // create Events that are not saved
        */

        // display Calendar
        $foundCalendar = false;
        foreach ($club['assignedCalendars'] as $key => $calendarId) {
            $foundCalendar = true;
            $events = $project->getEvents($calendarId, $seasonStart, $seasonEnd);
            $eventList[] = $project->generateJSONEventList($events);
        }

        if (!$foundCalendar) {
            echo '<p>' . $club['title'] . ' hat keinen gespeicherten Kalender hinterlegt</p>';
            exit();
        }
    }
}

echo json_encode($eventList);