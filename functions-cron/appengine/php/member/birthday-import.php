<?php

require "../../vendor/autoload.php";
require "../base.class.php";

$project = new sfwApp('sf-winterbach');

$time_start = microtime(true);

echo $project->generateHeader();

echo "<h1>Importiere Geburtstage in den Google-Kalender</h1>";


/*
$eventList = array();
$currentSeason = isset($_GET['current-season']) && $_GET['current-season'] === true ? new DateTime() : null;
$currentClub = isset($_GET['club']) ? $_GET['club'] : null;

foreach ($project->getSeasons($currentSeason) as $season) {

  $seasonStart = $project->getSeasonStartDate($season);
  $seasonEnd = $project->getSeasonEndDate($season);
  foreach ($project->getClubs() as $club) {

    if (key_exists('birthdays', $club["assignedCalendars"])) {

      $calendarId = $club["assignedCalendars"]["birthdays"];
      $googleCalendarEvents = $project->getEvents($calendarId, $seasonStart, $seasonEnd);

      // Speichern aller Termine in einem Array
      $calendarEvents = array();
      foreach ($googleCalendarEvents AS $event){
        /**
         * @var $event Google_Service_Calendar_Event
         *
        $calendarEvents[$event->getSummary()] = $event->getId();
      }

      // Erstellen neuer Termine, falls ein Termin mit diesem Titel nicht vorhanden ist
      $memberList = array();
      $eventsToCreate = array();

      foreach ($project->getMembers($club) as $key => $member) {
        /**
         * @var $member Google_Service_Firestore_Document
         *
        $date = DateTime::createFromFormat('Y-m-d', $member['birthday']);
        if($date){
          $title = 'Geburtstag von ' . $member['firstName'] . ' ' . $member['lastName'];
          if (!key_exists($title, $calendarEvents)) {
            $eventsToCreate[] = $project->createBirthdayEvent($member);
          }
          // Löschen des Eintrags -> später werden alle übrig gebliebenen Termine gelöscht!
          unset($calendarEvents[$title]);
        }
      }

      // Starting Batch to create the birthday events in calendar
      $project->client->setUseBatch(true);
      $batch = new Google_Http_Batch($project->client);
      foreach ($eventsToCreate as $event){
        $project->calendarService->events->insert($calendarId, $event);
      }

      // Birthday events to delete (members don´t exist any longer)
      foreach($calendarEvents as $key => $value){
        $project->calendarService->events->delete($calendarId, $value);
      }
      $batch->execute();

      echo '<p>Geburtstage aktualisiert</p>';

    } else {
      echo "<p>Kein Geburtstagskalender für den Verein " . $club["title"] . " hinterlegt.</p>";
    }

  }
} */

echo '<p><b>Ausführungsdauer :</b> '. (microtime(true) - $time_start) . '</p>';
echo $project->generateFooter();
