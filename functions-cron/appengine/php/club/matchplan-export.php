<?php

/**
 * Laden aller Spiele und Exportieren der Spiele in den Google Drive
 * Ist ein Spiel vorhanden -> weiter
 * neues Spiel -> anlegen
 * Spiel nicht mehr vorhanden -> löschen
 */

echo "Export des Spielplans in den Google-Drive - zum Erfassen der Mitgliederzahlen";


/*
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
} */