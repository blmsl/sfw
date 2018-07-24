<?php

error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('memory_limit', '-1');

header("Content-Type: text/html; charset=utf-8");

require "../simple_html_dom.php";
require "../../vendor/autoload.php";

require "../base.class.php";

  // private $locations = array();
  // private $matches = array();
  // private $teams = array();



$projectId = 'sf-winterbach';
$project = new sfwApp($projectId);

$categoryTypes = $project->getCategoryTypes();

$project->getLocations();

echo $project->generateHeader();

foreach ($project->getSeasons() as $season) {

  echo $project->generateSeasonHeading($season);

  foreach ($project->getClubs() as $club){

    // Liste der gespeicherten Spiele für den Zeitraum und den Verein laden
    # $savedMatchList = $project->getMatchesForClubAndDateInterval($club, $project->getSeasonStartDate($season), $project->getSeasonEndDate($season));

    // Spielplan lesen, Spielplan in der DB erstellen und ausgeben
    $request = $project->getMatchPlan($club, $project->getSeasonStartDate($season), $project->getSeasonEndDate($season));
    $output = $project->scrap_matchPlan($request, $club, $season);
    echo $project->generateMatchPlanTable($output);

    // Spiele, die nicht im neuen $this->matches Array enthalten sind löschen
    #foreach ($savedMatchList AS $savedMatch){
    #  echo $savedMatch["title"] . "<br />";
    #}

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

