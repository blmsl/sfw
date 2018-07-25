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

$categoryTypes = $project->getCategoryTypes();

$project->getLocations();

echo $project->generateHeader();


foreach ($project->getSeasons() as $season) {

  $seasonStart = $project->getSeasonStartDate($season);
  $seasonEnd = $project->getSeasonEndDate($season);

  echo $project->generateSeasonHeading($season);

  foreach ($project->getClubs() as $club) {

    $calendarId = $club["assignedCalendars"]["matches"];

    $savedMatches = array();

    $locations = $project->getLocationsById();
    $googleCalendarEvents = $project->getEvents($calendarId, $seasonStart, $seasonEnd);

    // Spielplan lesen, Spielplan in der DB erstellen und ausgeben
    #$request = $project->getMatchPlan($club, $seasonStart, $seasonEnd);
    #$output = $project->scrap_matchPlan($request, $club, $season);
    #echo $project->generateMatchPlanTable($output);

    $matches = $project->getMatches();
    foreach ($matches as $match) {
      try {
        $startDate = new DateTime($match["matchStartDate"]->get());
        echo $title = $match['title'] . '-' . $locations[$match['assignedLocation']] . '-' . $startDate->format('d.m.Y H:i:s');
      } catch (Exception $e) {
        var_dump($match);
        var_dump($e);
      }

      $savedMatches[$title] = $match;
    }

    /* $i = 1;
    $j = 1;
    $calendarEvents = array();
    foreach ($googleCalendarEvents as $event) {
      $startDate = new DateTime($event->getStart()->dateTime);

      $title = $event["summary"] . "-" . $event["location"] . "-" . $startDate->format('d.m.Y H:i:s');

      if (array_key_exists($title, $savedMatches)) {
        echo $event["summary"] . ' <strong>exisiterte bereits</strong><br />';
        #echo $i + 1 . " <span style='color: red'> Match still there </span><br />";
        $calendarEvents[$event["summary"] . "-" . $event["location"] . "-" . $startDate->format('d.m.Y H:i:s')] = true;
        $i++;
      } else {
        // delete the Match
        echo $event["summary"] . ' <span style="color: red">gelöscht</span><br />';
        $project->calendarService->events->delete($calendarId, $event->getId());
        # echo $j + 1 . " deleting Match " . $title . "<br />";
        $j++;
      }
    }


    foreach ($savedMatches as $key => $match) {
      if (!array_key_exists($key, $calendarEvents)) {

        $startDate = new DateTime($match["matchStartDate"]->get());
        # $startDate->setTimezone(new DateTimeZone(date_default_timezone_get()));

        $title = $match['title'] . '-' . $locations[$match['assignedLocation']] . '-' . $startDate->format('d.m.Y H:i:s');
        echo "Create Event " . $title;
        var_dump($startDate);
        exit();

        $eventData = array(
          'summary' =>  '<a target="_blank" href="'. $match["id"] . '">' . $match['title'] . '</a>',
          'location' => $locations[$match['assignedLocation']],
          'description' => $match["matchType"] . ': <a target="_blank" href="'. $match["matchLink"] . '">Link</a>',
          'startDate' => new DateTime($match["matchStartDate"]->get()->setTimezone(new DateTimeZone(date_default_timezone_get()))->format(DATE_ATOM)),
          #$startDate->setTimezone(new DateTimeZone("UTC"))->format(DATE_ATOM),
          'endDate' => new DateTime($match["matchEndDate"]->get()->format(DATE_ATOM))
        );

        #$project->saveCalendarEvent($eventData, $club["assignedCalendars"]["matches"]);
      }
    }*/
    // Termine aus dem Google-Calendar laden und die Termine löschen, die nicht als match in der DB vorhanden sind
    // $eventList = $project->getEvents($club, $project->getSeasonStartDate($season), $project->getSeasonEndDate($season);
    // $project->deleteEventsBetweenDates($eventList,  $project->getSeasonStartDate($season), $project->getSeasonEndDate($season));
  }

}

echo $project->generateFooter();

/*



  // get all clubs
  $clubs = array();
  $dbClubs = $db->collection('clubs');
  foreach ($dbClubs->documents() as $club) {
    $clubs[$club["title"]] = $club;
    // get new achievements from clubPage, address and contact
    // $curlRequest = curlRequest($club["fussballde"]["clubUrl"]);
    // $data = scrap_clubData($curlRequest, $seasons, $dbSeasons, $club["fussballde"]["clubId"], $club["fussballde"]["clubUrl"]);
  }

    echo generateMatchPlanTable($output, $categories, $locations, $teams);

    // Save data to googleDrive
    /*$result = $driveService->files->listFiles(array(
      'includeTeamDriveItems' => true,
      'supportsTeamDrives' => true,
      'q' => 'name="Spielplan ' . $club["title"] . '"'
    ));

    if (count($result) === 1) {

      $foundFile = $result[0];

      $sheetTitle = $startDate->format('Y') . '-' . $endDate->format('Y');
      $sheets = array();
      $response = $sheetService->spreadsheets->get($foundFile->id);
      foreach ($response->getSheets() as $s) {
        $sheets[$s['properties']['title']] = $s['properties']['sheetId'];
      }

      // Sheet exists?
      if (!array_key_exists($sheetTitle, $sheets)) {
        $body = new Google_Service_Sheets_BatchUpdateSpreadsheetRequest(array(
          'requests' => array(
            'addSheet' => array(
              'properties' => array(
                'title' => $sheetTitle
              )
            )
          )
        ));
        $sheetService->spreadsheets->batchUpdate($foundFile->id, $body);
      }

      #$rangeNumber = 1;
      $range = $sheetTitle; // #' . $rangeNumber . ':E';

      /**
       * ToDo: load entries and save them to array
       * => compare with new matches and save or delete match
       *
      $existingData = array();
      $rows = $sheetService->spreadsheets_values->get($foundFile->id, $range);
      foreach ($rows->getValues() AS $row) {

        foreach ($output AS $match) {
          // Prüfen, ob der Eintrag auch im neuen Array vorhanden ist:
          if ($match["title"] . '-' . $match["matchStartDate"]->format('d.m.Y H:i:s') . '-' . $match["matchEndDate"]->format('d.m.Y H:i:s') === $row[0] . '-' . $row[1] . '-' . $row[2]) {
            $existingData[$row[0] . '-' . $row[1] . '-' . $row[2]] = $row;
          } else {
            // ansonsten wird das Spiel GELÖSCHT
            unset($existingData[$row[0] . '-' . $row[1] . '-' . $row[2]]);
          }
        }
      }

      $values = array();
      foreach ($output AS $match) {
        // bereits vorhanden ==> Daten übernehmen aus dem existingData Array
        if (array_key_exists($match["title"] . '-' . $match["matchStartDate"]->format('d.m.Y H:i:s') . '-' . $match["matchEndDate"]->format('d.m.Y H:i:s'), $existingData)) {
          $values[] = $existingData[$match["title"] . '-' . $match["matchStartDate"]->format('d.m.Y H:i:s') . '-' . $match["matchEndDate"]->format('d.m.Y H:i:s')];
        } else {
          // ansonsten: neuen Eintrag erstellen
          $values[] = generateSpreadsheetFromOutput($match, $locations);
        }
      }

      $params = [
        'valueInputOption' => 'RAW'
      ];

      $body = new Google_Service_Sheets_ValueRange(array(
        'values' => $values
      ));
      $sheetService->spreadsheets_values->update($foundFile->id, $range, $body, $params);

    } else {
      echo "Keine Datei mit dem Titel Spielplan " . $club['title'] . " gefunden";
    }

  }
}
*/

