<?php

    error_reporting(E_ALL);
    ini_set('display_errors', true);
    ini_set('memory_limit', '-1');

    header("Content-Type: text/html; charset=utf-8");

    putenv('GOOGLE_APPLICATION_CREDENTIALS=sfw-dev-17f1e9438978.json');

    require "../simple_html_dom.php";
    require "../functions.php";
    require "../../vendor/autoload.php";

    use Google\Cloud\Firestore\FirestoreClient;

    $projectId = 'sfw-dev';

    try {
        $db = new FirestoreClient([
            'projectId' => $projectId
        ]);
    } catch (\Google\Cloud\Core\Exception\GoogleException $e) {
        var_dump($e);
        exit();
    }

    // Calendar
    $client = new Google_Client([
        'projectId' => $projectId
    ]);
    $client->useApplicationDefaultCredentials();

    $client->setApplicationName("SFW Import Matchplan via FlexEngine");
    $client->setScopes([
            Google_Service_Drive::DRIVE,
            Google_Service_Drive::DRIVE_FILE,
            Google_Service_Sheets::DRIVE,
            Google_Service_Sheets::DRIVE_FILE,
            Google_Service_Sheets::SPREADSHEETS,
            Google_Service_Calendar::CALENDAR
        ]
    );

    $calendarService = new Google_Service_Calendar($client);
    $sheetService = new Google_Service_Sheets($client);
    $driveService = new Google_Service_Drive($client);

    $optParams = array(
        'maxResults' => 30,
        'showDeleted' => false,
    );

    /* $calendarList = $calendarService->calendarList->listCalendarList($optParams);
    foreach ($calendarList->getItems() as $calendarListEntry) {
        #if ($calendarListEntry->getAccessRole() == "owner") // show only calendars where user is owner
        echo $calendarListEntry->getID() . "<br />";
        # $calendarListEntry->
    } */

    // CategoryTypes
    $dbCategoryTypes = $db->collection('category-types');
    $categoryTypes = array();
    foreach ($dbCategoryTypes->documents() as $categoryType) {
        $categoryTypes[$categoryType["link"]] = $categoryType["id"];
    }

    // Categories
    $dbCategories = $db->collection('categories');
    $categories = array();
    foreach ($dbCategories->documents() as $category) {
        $categories[$category["title"]] = $category["id"];
    }

    // Locations
    $dbLocations = $db->collection('locations');
    $locations = array();
    foreach ($dbLocations->documents() as $location) {
        $locations[$location["title"]] = $location["id"];
    }

    // Teams
    $dbTeams = $db->collection('teams');
    $teams = array();
    foreach ($dbTeams->documents() as $team) {
        $teams[$team["title"] . "-" . $team["subTitle"] . "-" . $team["assignedSeason"]] = $team["id"];
    }

    // Matches
    $dbMatches = $db->collection('matches');
    $matches = array();
    foreach ($dbMatches->documents() as $match) {
        $matches[$match["title"] . '-' . $match['matchLink']] = $match["id"];
    }

    echo generateHeader();

    // Get all seasons and the current Season
    $dbSeasons = $db->collection('seasons');
    $seasons = array();
    foreach ($dbSeasons->documents() as $season) {

        $parts = explode('/', $season["title"]);
        $startYear = substr($parts[0], -4);
        $startDate = DateTime::createFromFormat('d.m.Y', '01.07.' . $startYear);

        $endYear = substr($parts[1], 0);
        $endDate = DateTime::createFromFormat('d.m.Y', '30.06.' . $endYear);

        echo "<h1>Spielplan&nbsp;";
        echo "<small>" . $startDate->format('d.m.Y') . " &ndash; " . $endDate->format('d.m.Y') . "</small></h1>";

        $dbClubs = $db->collection('clubs');
        foreach ($dbClubs->documents() as $club) {

            $clubId = $club["fussballde"]["clubId"];

            $url = 'http://www.fussball.de/ajax.club.matchplan/-/id/' . $club["fussballde"]["clubId"] . '/mime-type/HTML/mode/PAGE/show-filter/false/max/9999/datum-von/' . $startDate->format('Y-m-d') . '/datum-bis/' . $endDate->format('Y-m-d') . '/show-venues/checked/offset/0';

            $curlRequest = curlRequest($url);

            // get Output and save to fireStore
            $output = scrap_matchPlan($curlRequest, $club, $locations, $dbLocations, $teams, $dbTeams, $categories, $dbCategories, $categoryTypes, $season, $dbMatches, $matches);

            echo generateMatchPlanTable($output, $categories, $locations, $teams);

            // Save data to googleDrive
            $result = $driveService->files->listFiles(array(
                'includeTeamDriveItems' => 'user,allTeamDrives',
                'supportsTeamDrives' => true
            ));
            foreach ($result->getFiles() as $file) {

                if ($file->name === 'Spielpläne') {

                    $folderContent = $driveService->files->listFiles(array(
                        'includeTeamDriveItems' => 'user,allTeamDrives',
                        'supportsTeamDrives' => true,
                        'q' => "'$file->id' in parents"
                    ));

                    $found = false;
                    foreach ($folderContent->getFiles() as $foundFile) {

                        if ($foundFile->name === 'Spielplan ' . $club["title"]) {

                            echo $file->name . "<br />";

                            $found = true;
                            $sheetTitle = $startDate->format('Y') . '-' . $endDate->format('Y');
                            $sheets = array();
                            $response = $sheetService->spreadsheets->get($foundFile->id);
                            foreach ($response->getSheets() as $s) {
                                $sheets[$s['properties']['title']] = $s['properties']['sheetId'];
                            }

                            if (!array_key_exists($sheetTitle, $sheets)) {
                                echo "create Sheet " . $sheetTitle . "<br />";
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

                            $valueRange = new Google_Service_Sheets_ValueRange($client);
                            $valueRange->setValues($output);
                            $valueRange->setMajorDimension('ROWS');

                            $range = $sheetTitle . '!A1:I' . count($valueRange["values"]);

                            $updateBody = new Google_Service_Sheets_ValueRange([
                                'range' => $range,
                                'majorDimension' => 'ROWS',
                                'values' => $output,
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
                        echo 'Spielplan ' . $club["title"] . " nicht gefunden";
                        exit();
                    }
                }
                /* else{
                    echo 'Verzeichnis Spielpläne wurde nicht gefunden';
                    exit();
                } */
            }


            // Delete all events between $startDate and $endDate
            $optParams = array(
                'timeMin' => $startDate->format('c'),
                'timeMax' => $endDate->format('c')
            );

            $eventList = $calendarService->events->listEvents($club['calendarId'], $optParams);
            foreach ($eventList as $event){
                $calendarService->events->delete($club['calendarId'], $event->getId());
            }

            // Save data to Calendar
            foreach ($output as $match) {
                $eventData = generateCalendarEvent($match, $locations);
                #$event = $calendarService->events->insert($club['calendarId'], $eventData);
                #printf('Event created: %s\n', $event->htmlLink);
            }

        }
    }
    echo "Import durchgeführt!";

    echo generateFooter();
