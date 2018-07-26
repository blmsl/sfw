<?php

/**
 * Laden des Google Geburtstagskalenders und der Mitglieder
 * Durchlaufen der MitgliederListe:
 * speichern des Geburtstages als wiederkehrendes Ereignis, wenn noch kein Event mit diesem Titel vorhanden ist.
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

$eventList = array();

foreach ($project->getSeasons($currentSeason) as $season) {

    $seasonStart = $project->getSeasonStartDate($season);
    $seasonEnd = $project->getSeasonEndDate($season);
    foreach ($project->getClubs() as $club) {

        if (key_exists('birthdays', $club["assignedCalendars"])) {

            $calendarId = $club["assignedCalendars"]["birthdays"];
            $googleCalendarEvents = $project->getEvents($calendarId, $seasonStart, $seasonEnd);

            $memberList = array();
            foreach ($project->getMembers($club) as $member) {
                if ($member['mainData']['birthday']) {
                    $date = DateTime::createFromFormat('Y-m-d', $member['mainData']['birthday']);
                    $memberList[$date->format(DATE_RFC3339)] = $member['mainData']['firstName'] . ' ' . $member['mainData']['lastName'];
                    # echo $member['mainData']['birthday'] . "<br />";
                    /*$event = new Google_Service_Calendar_Event();
                    $event->setSummary($this->getAge($member['mainData']['birthday']) . ' Geburtstag von ' . $member['mainData']['firstName'] . ' ' . $member['mainData']['lastName']);
                    $start = new Google_Service_Calendar_EventDateTime();
                    $start->setDate($member['mainData']['birthday']);
                    $event->setRecurrence(array('RRULE:FREQ=YEARLY'));
                    var_dump($event);
                    exit(); */
                }
            }
            var_dump($memberList);

            /*$calendarEvents = array();
            // Alle Calender-Termine laden; wenn ein Termin zu einem gelöschten Spiel gefunden wurde wird der Termin gelöscht
            foreach ($googleCalendarEvents as $event) {
                $startDate = new DateTime($event->getStart()->dateTime);
                $title = $event["summary"] . $startDate->format('d.m.Y H:i:s');

                if (!array_key_exists($title, $savedMatches)) {
                    // delete the Match
                    # echo $event["summary"] . ' <span style="color: red">gelöscht</span><br />';
                    $project->calendarService->events->delete($calendarId, $event->getId());
                } else {
                    $calendarEvents[$event["summary"] . "-" . $event["location"] . "-" . $startDate->format('d.m.Y H:i:s')] = true;
                }
            }*/

        } else {
            echo "<p>Kein Geburtstagskalender für den Verein " . $club["title"] . " hinterlegt.</p>";
        }

    }
}