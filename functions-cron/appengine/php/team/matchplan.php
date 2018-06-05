<?php

require '../../vendor/autoload.php';

new FireStoreApiClient();

$client = new \Google_Client();
$client->useApplicationDefaultCredentials();
$client->setScopes('https://www.googleapis.com/auth/drive');

if ($client->isAccessTokenExpired()) {
    $client->refreshTokenWithAssertion();
}

$seasonList = array();
$seasons = $this->getFM()->getDBList('seasons');
foreach ($seasons AS $season) {
    $seasonList[$season["title"]["stringValue"]] = $season['id']['stringValue'];
}

$date = new DateTime();
$seasonDate = DateTime::createFromFormat('Y-m-d', RequestHandler::getValue('season', $date->format('Y-m-d')));
$currentSeason = $this->getFM()->getSeason('seasons', $seasonList, $seasonDate);

// , array('orderBy' => '"importToCalendar"', 'equalTo' => '"true"')
$clubList = $this->getFM()->getDBList('clubs');

if(count($clubList) === 0){
    $clubList[] = $newClub = array(
        'newClub' => true,
        'id' => '00ES8GNBEO00001UVV0AG08LVUPGND5I',
        'name' => 'SF Winterbach'
    );
    $this->getFM()->setClub($newClub["id"], $newClub["name"], 'clubs');
}

foreach ($clubList AS $key => $club) {

    $this->getFM()->club = $club;

    $clubId = key_exists('newClub', $club) ? $club["id"] : $club["fussballde"]["mapValue"]["fields"]["clubId"]["stringValue"];

    $link = 'http://www.fussball.de/ajax.club.matchplan/-/id/' . $clubId . '/mime-type/HTML/mode/PAGE/show-filter/false/max/9999/datum-von/' . $currentSeason["StartDate"]->format('Y-m-d') . '/datum-bis/' . $currentSeason["EndDate"]->format('Y-m-d') . '/show-venues/checked/offset/0';

    $html = $this->getFM()->getHTMLByLink($link);
    $rowArray = $this->getFM()->getDataFromDOM($html, $currentSeason);

    $sheetService = new \Google_Service_Sheets($client);
    $driveService = new \Google_Service_Drive($client);
    $result = $driveService->files->listFiles(array(
        'includeTeamDriveItems' => 'user,allTeamDrives',
        'supportsTeamDrives' => true
    ));
    foreach ($result->files as $file) {

        if ($file->name === 'Spielpläne') {

            $folderContent = $driveService->files->listFiles(array(
                'includeTeamDriveItems' => 'user,allTeamDrives',
                'supportsTeamDrives' => true,
                'q' => "'$file->id' in parents"
            ));

            $found = false;
            foreach ($folderContent as $foundFile) {

                if ($foundFile->name === 'Spielplan-' . $clubId) {

                    $found = true;

                    $sheetTitle = $currentSeason["StartDate"]->format('Y') . '-' . $currentSeason["EndDate"]->format('Y');

                    $sheets = array();
                    $response = $sheetService->spreadsheets->get($foundFile->id);
                    foreach($response->getSheets() as $s) {
                        $sheets[$s['properties']['title']] = $s['properties']['sheetId'];
                    }

                    if(!array_key_exists($sheetTitle, $sheets)){
                        $body = new \Google_Service_Sheets_BatchUpdateSpreadsheetRequest(array(
                            'requests' => array(
                                'addSheet' => array(
                                    'properties' => array(
                                        'title' => $sheetTitle
                                    )
                                )
                            )
                        ));
                        $sheetService->spreadsheets->batchUpdate($foundFile->id,$body);
                    }

                    $valueRange = new \Google_Service_Sheets_ValueRange($client);
                    $valueRange->setValues($rowArray);
                    $valueRange->setMajorDimension('ROWS');

                    $range = $sheetTitle . '!A1:I' . count($valueRange["values"]);

                    $updateBody = new \Google_Service_Sheets_ValueRange([
                        'range' => $range,
                        'majorDimension' => 'ROWS',
                        'values' => $rowArray,
                    ]);
                    $sheetService->spreadsheets_values->update(
                        $foundFile->id,
                        $range,
                        $updateBody,
                        ['valueInputOption' => 'RAW']
                    );

                }
            }
            if (!$found) {
                echo 'Spielplan-' . $clubId . " nicht gefunden";
                exit();
            }
        }
    }
}
echo "Import durchgeführt!";