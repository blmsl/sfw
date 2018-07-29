<?php

/**
 * Alle Spiele laden und mit dem Google Kalender vergleichen
 * nicht mehr vorhandene Spiele werden aus dem Kalender gelöscht
 * neue Spiele werden im Kalender angelegt
 */

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../../vendor/autoload.php";
require "../base.class.php";

$project = new sfwApp('sf-winterbach');
$time_start = microtime(true);

echo $project->generateHeader();

echo "<h1>Importiere Spielplan in den Google-Kalender</h1>";

$eventList = array();
$savedMatches = array();

$locations = $project->getLocationsById();

$currentSeason = isset($_GET['current-season']) && $_GET['current-season'] === true ? new DateTime() : null;
$currentClub = isset($_GET['club']) ? $_GET['club'] : null;

foreach ($project->getSeasons($currentSeason) as $season) {

  $seasonStart = $project->getSeasonStartDate($season);
  $seasonEnd = $project->getSeasonEndDate($season);

  foreach ($project->getClubs($currentClub) as $club) {

    if (key_exists('matches', $club["assignedCalendars"])) {

      $calendarId = $club["assignedCalendars"]["matches"];
      $googleCalendarEvents = $project->getEvents($calendarId, $seasonStart, $seasonEnd);

      // Alle Spiele dieser Saison laden und in einem Array speichern
      $matches = $project->getMatches($seasonStart);
      foreach ($matches as $match) {
        $matchStartDate = $match["matchStartDate"];
        /**
         * @var $matchStartDate Google\Cloud\Core\Timestamp
         */
        $title = $match['title'] . '-' . $locations[$match['assignedLocation']] . '-' . $matchStartDate->get()->format('d.m.Y H:i:s');

        $matchEvent = $project->generateEventItem($match, $locations);
        $savedMatches[$title] = $matchEvent;
        $eventList[] = $matchEvent;
      }

      $calendarEvents = array();
      $eventsToDelete = array();
      // Alle Calender-Termine laden; wenn ein Termin zu einem gelöschten Spiel gefunden wurde wird der Termin gelöscht
      foreach ($googleCalendarEvents as $event) {
        $startDate = new DateTime($event->getStart()->dateTime);
        $title = $event["summary"] . "-" . $event["location"] . "-" . $startDate->format('d.m.Y H:i:s');

        if (!array_key_exists($title, $savedMatches)) {
          $eventsToDelete[] = $event->getId();
        } else {
          $calendarEvents[$event["summary"] . "-" . $event["location"] . "-" . $startDate->format('d.m.Y H:i:s')] = true;
        }
      }

      $eventsToCreate = array();
      // Laden aller Spiele => wenn kein Termin zu diesem Spiel gefunden wurde, wird dieser erstellt
      foreach ($savedMatches as $key => $matchEvent) {
        if (!array_key_exists($key, $calendarEvents)) {
          $eventsToCreate[] = $project->saveCalendarEvent($matchEvent);
        }
      }

      // Batch to create and delete matches in the calendar
      $project->client->setUseBatch(true);
      $batch = new Google_Http_Batch($project->client);
      foreach ($eventsToCreate as $event){
        $project->calendarService->events->insert($calendarId, $event);
      }

      // Birthday events to delete (members don´t exist any longer)
      foreach($eventsToDelete as $value){
        $project->calendarService->events->delete($calendarId, $value);
      }
      $batch->execute();

      echo '<p>Spieltermine wurden in den Google-Kalender übertragen.</p>';

    } else {
      echo "<p>Kein Mannschafts-Spielplan-Kalender für den Verein " . $club["title"] . " hinterlegt.</p>";
    }
  }
}

echo '<p><b>Ausführungsdauer :</b> '. (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
