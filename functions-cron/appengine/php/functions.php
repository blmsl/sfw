<?php

function curlRequest($url)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
    $str = curl_exec($curl);
    curl_close($curl);
    return str_get_html($str);
}

function scrap_matchPlan($html, $club, $locations, $dbLocations, $teams, $dbTeams, $categories, $dbCategories, $categoryTypes, $season)
{
    $savedMatchDate = NULL;
    $i = 0;
    $output = array();
    $matchData = array();
    $assignedCategory = null;

    if ($html && is_object($html) && isset($html->nodes)) {
        $items = $html->find("div.fixtures-matches-table > table > tbody > tr");
        // echo count($items);
        # echo "<br />";
        foreach ($items AS $item) {

            # echo $i . "<br />";

            if ($i > 0) {

                if ($item->getAttribute('class') === "row-headline visible-small") {

                    // Spielart (z.B. Kreisfreundschaftsspiele) festlegen // weiter unten werden weitere Details geladen
                    $parts = explode('|', $item->plaintext);
                    $matchData["matchType"] = trim($parts[2]);

                    // setze die Saison
                    $assignedCategory = trim($parts[1]);
                    $mainCategoryName = getMainTeamCategoryName(trim($parts[1]));

                    if (!key_exists($mainCategoryName, $categories)) {
                        $categories[$mainCategoryName] = saveNewCategory($mainCategoryName, $dbCategories, $categoryTypes['team.types']);
                    }
                    if (!key_exists(trim($parts[1]), $categories)) {
                        $categories[trim($parts[1])] = saveNewCategory(trim($parts[1]), $dbCategories, $categoryTypes['team.types']);
                    }

                    $matchData["assignedCategories"] = array(
                        "assignedCategory" => $categories[trim($parts[1])],
                        "assignedMainCategory" => $categories[$mainCategoryName]
                    );
                } elseif ($item->getAttribute('class') === "odd row-competition hidden-small" || $item->getAttribute('class') === "row-competition hidden-small") {

                    $matchDate = setMatchDate($item->plaintext, $savedMatchDate);
                    if ($matchDate && key_exists("assignedMainCategory", $matchData["assignedCategories"])) {
                        $matchData["matchStartDate"] = $savedMatchDate = $matchDate;
                        $matchData["matchEndDate"] = getMatchDuration($matchData["assignedCategories"]["assignedMainCategory"], $matchData);
                    }

                } // Treffpunkt und Platzartz
                elseif ($item->getAttribute('class') === "odd row-venue hidden-small" || $item->getAttribute('class') === "row-venue hidden-small") {

                    // Treffpunkt-Kategorie
                    $parts = explode(',', $item->plaintext);
                    $locationCategoryName = getLocationCategoryName(trim($parts[0]));
                    if (!key_exists($locationCategoryName, $categories)) {
                        $categories[$locationCategoryName] = saveNewCategory($locationCategoryName, $dbCategories, $categoryTypes["location.types"]);
                    }
                    $matchData["assignedCategories"]['assignedLocationCategory'] = $categories[$locationCategoryName];

                    $address = generateAddressArray($parts);

                    $title = trim($parts[0]) . ' ' . $address['streetName'] . ', ' . $address['city']; //. ' ' .$address['city']. ', ' . $address['zip'] . ' ' . $address['county'];

                    if (!key_exists($title, $locations)) {
                        $locations[$title] = saveNewLocation($title, $address, $dbLocations, $categories[$locationCategoryName]);
                    }

                    $matchData["assignedLocation"] = $locations[$title];

                } elseif ($item->getAttribute('class') !== "thead hidden-small") {

                    foreach ($item->find('td') AS $cell) {
                        if ($cell->getAttribute('class') === 'column-club') {
                            # echo "Heim:" . $cell->plaintext . "<br />";
                            $matchData["homeTeam"]["name"] = trim($cell->plaintext);
                            $matchData["homeTeam"]["externalTeamLink"] = ($cell->find('.club-wrapper', 0) && $cell->find('.club-wrapper', 0) !== null) ? $cell->find('.club-wrapper', 0)->getAttribute('href') : '';
                            $matchData["homeTeam"]["logo"] = ($cell->find('.table-image span', 0) && $cell->find('.table-image span', 0) !== null) ?
                                str_replace('format/3', 'format/2', $cell->find('.table-image span', 0)->getAttribute('data-responsive-image')) : '';

                        } elseif ($cell->getAttribute('class') === 'column-club no-border') {
                            $matchData["guestTeam"]["name"] = trim($cell->plaintext);
                            $matchData["guestTeam"]["externalTeamLink"] = ($cell->find('.club-wrapper', 0) && $cell->find('.club-wrapper', 0) !== null) ? $cell->find('.club-wrapper', 0)->getAttribute('href') : '';
                            $matchData["guestTeam"]["logo"] = ($cell->find('.table-image span', 0) && $cell->find('.table-image span', 0) !== null) ?
                                str_replace('format/3', 'format/2', $cell->find('.table-image span', 0)->getAttribute('data-responsive-image')) : '';

                        } elseif ($cell->getAttribute('class') === 'column-score') {
                            $matchData["result"] = array('homeTeamGoals' => '', 'guestTeamGoals' => '', 'otherEvent' => '');
                        } elseif ($cell->getAttribute('class') === 'column-detail') {

                            // MatchLink und Wettbewerb (eigene Seite) laden
                            if ($cell->find('a', 0) !== null) {
                                $matchData["matchLink"] = $cell->find('a', 0)->getAttribute('href');
                            }
                        }
                    }

                    if (key_exists('assignedCategories', $matchData) && count($matchData['assignedCategories']) > 1
                        && key_exists('homeTeam', $matchData)
                        && key_exists('guestTeam', $matchData)
                    ) {
                        $matchData["isHomeTeam"] = isTeamFromClub($matchData["homeTeam"], $matchData["guestTeam"], $club["title"], $matchData);
                        $matchData["isGuestTeam"] = isTeamFromClub($matchData["guestTeam"], $matchData["homeTeam"], $club["title"], $matchData);

                        $teamData = null;
                        if ($matchData["isHomeTeam"]) {
                            $teamData = $matchData["homeTeam"];
                        } elseif ($matchData["isGuestTeam"]) {
                            $teamData = $matchData["guestTeam"];
                        }

                        $subTitle = $teamData["name"] ? $teamData["name"] : $club["title"];

                        if (key_exists($assignedCategory . "-" . $subTitle . "-" . $season["id"], $teams)) {
                            $matchData["assignedTeam"] = $teams[$assignedCategory . "-" . $subTitle . "-" . $season["id"]];
                        } else {
                            // create new Team
                            $matchData["assignedTeam"]
                                = $teams[$assignedCategory . "-" . $subTitle . "-" . $season["id"]]
                                = saveNewTeam($assignedCategory, // Title
                                $subTitle,
                                $teamData,
                                $matchData["assignedCategories"]["assignedMainCategory"],
                                $matchData["assignedCategories"]['assignedCategory'],
                                $club,
                                $season,
                                $teams,
                                $dbTeams);

                        }
                    }
                }

                // wenn alle Daten vorhanden -> Tabellenzeile generieren
                if (key_exists('assignedTeam', $matchData) &&
                    key_exists('assignedCategories', $matchData) &&
                    key_exists('matchStartDate', $matchData) &&
                    key_exists('matchEndDate', $matchData) &&
                    key_exists('homeTeam', $matchData) &&
                    key_exists('guestTeam', $matchData) &&
                    key_exists('assignedLocation', $matchData) &&
                    key_exists('isHomeTeam', $matchData)
                ) {
                    $matchData["title"] = $assignedCategory . ': ' . $matchData["homeTeam"]["name"] . ' - ' . $matchData["guestTeam"]["name"];
                    $output[] = $matchData;
                    var_dump($matchData);
                    echo PHP_EOL;
                    echo PHP_EOL;
                    $matchData = [];
                }
            }
            $i++;
        }
        $html->clear();
    }
    return $output;
}

/*
function scrap_competitions($scrap_url)
{
    // global $output;
    $html = file_get_html($scrap_url);
    var_dump($html);

    if ($html && is_object($html) && isset($html->nodes)) {

        $items = $html->find(".team-competitions a");
        var_dump($items);

        /* loop through items on current page
        foreach ($items as $item) {

            /*$output_item = array();

            $counter = 0;
            $tds = $item->find("td");
            foreach ($tds as $td) {
                if ($counter > 0) {
                    $output_item[] = trim($td->plaintext);
                }
                $counter++;
            }

            if (!empty($output_item)) {
                $output[] = $output_item;
            }
        }
        $html->clear();
    }
}

function scrap_standings($html)
{
    // global $output;
    if ($html && is_object($html) && isset($html->nodes)) {
        $items = $html->find("#team-fixture-league-tables tr");
        // loop through items on current page
        foreach ($items as $item) {
            $output_item = array();
            $counter = 0;
            $tds = $item->find("td");
            foreach ($tds as $td) {
                if ($counter > 0) {
                    $output_item[] = trim($td->plaintext);
                }
                $counter++;
            }

            if (!empty($output_item)) {
                $output[] = $output_item;
            }
        }
        $html->clear();
    }
}

function get_value($element, $selector_string, $index, $type = "text")
{
    $value = "";
    $cont = $element->find($selector_string, $index);
    if ($cont) {
        if ($type == "href") {
            $value = $cont->href;
        } elseif ($type == "src") {
            $value = $cont->src;
        } elseif ($type == "text") {
            $value = trim($cont->plaintext);
        } elseif ($type == "content") {
            $value = trim($cont->content);
        } elseif ($type == "outertext") {
            $value = trim($cont->outertext);
        } else {
            $value = $cont->innertext;
        }
    }

    return trim($value);
} */

function saveNewTeam($title, $subTitle, $teamData, $mainCategory, $assignedCategory, $club, $season, $teams, $dbTeams)
{
    $addedDocRef = $dbTeams->newDocument();
    printf('New Team ' . $title . ' ' . $subTitle . ' with ID ' . $addedDocRef->id() . PHP_EOL);
    $addedDocRef->set(array(
        "id" => $addedDocRef->id(),
        "title" => $title,
        "subTitle" => $subTitle ? $subTitle : $club["title"],
        "assignedClub" => $club{"id"},
        "assignedSeason" => $season{"id"},
        "isImported" => true,
        "isOfficialTeam" => true,
        "externalTeamLink" => $teamData["externalTeamLink"],
        "logoURL" => $teamData["logo"],
        "assignedTeamCategories" => array($mainCategory, $assignedCategory),
        "assignedPlayers" => array(),
        "assignedPositions" => array(),
        "assignedTrainings" => array(),
        "assignedCompetitions" => array(),
        "assignedEvents" => array(),
        'creation' => generateCreation()
    ));
    return $addedDocRef->id();
}

function saveNewLocation($title, $address, $dbLocations, $assignedCategory)
{
    $addedDocRef = $dbLocations->newDocument();
    printf('New Location ' . $title . ' with ID ' . $addedDocRef->id() . PHP_EOL);
    $addedDocRef->set(array(
        "id" => $addedDocRef->id(),
        "title" => $title,
        "isImported" => true,
        "address" => $address,
        "assignedCategory" => $assignedCategory,
        'creation' => generateCreation()
    ));
    return $addedDocRef->id();
}

function saveNewCategory($title, $dbCategories, $assignedCategoryType)
{
    $addedDocRef = $dbCategories->newDocument();
    printf('New Category ' . $title . ' with ID ' . $addedDocRef->id() . PHP_EOL);
    $addedDocRef->set(array(
        'id' => $addedDocRef->id(),
        'title' => $title,
        'description' => '',
        'assignedCategoryType' => $assignedCategoryType,
        'creation' => generateCreation(),
        'publication' => generatePublication()
    ));
    return $addedDocRef->id();
}

function generateAddressArray($addressArray)
{
    // format 5 Kunstrasenplatz, Hoof, Kunstrasen, Zum Sportheim, 66606 St. Wendel
    // oder   4 Rasenplatz, Weiersbach Rasenplatz, Auf dem Langenfeld, 55768 Hoppstädten-Weiersbach
    // oder   6 Rasenplatz, Ottweiler, Rasen, Im Alten Weiher, Im Alten Weiher, 66564 Ottweiler
    // oder   6 Kunstrasenplatz, Wiesbach, ProWin Stadion, Kunstrasen, Landstuhlstr., 66571 Eppelborn
    $zip = '';
    $county = '';
    $street = '';

    $city = trim($addressArray[1]);
    if (count($addressArray) === 6) {
        $street = trim($addressArray[4]);
        $county = substr(trim($addressArray[5]), 6);
        $zip = substr(trim($addressArray[5]), 0, 5);
    } elseif (count($addressArray) === 5) {
        $street = trim($addressArray[3]);
        $county = substr(trim($addressArray[4]), 6);
        $zip = substr(trim($addressArray[4]), 0, 5);
    } elseif (count($addressArray) === 4) {
        $city = explode(' ', trim($addressArray[1]))[0];
        $street = trim($addressArray[2]);
        $county = substr(trim($addressArray[3]), 6);
        $zip = substr(trim($addressArray[3]), 0, 5);
    }

    $streetName = $street;
    $houseNumber = '';

    if (preg_match('/^([^\d]*[^\d\s]) *(\d.*)$/', $street, $result)) {
        $streetName = $result[1];
        $houseNumber = $result[2];
    }

    if (substr($streetName, -4) === 'str.') {
        $streetName = str_replace("str.", "straße", $streetName);
    }
    return $address = array(
        'streetName' => $streetName,
        'houseNumber' => $houseNumber,
        'zip' => $zip,
        'city' => $city,
        'county' => $county
    );
}

function getCurrentSeason($seasons, $dbSeasons)
{
    $date = new DateTime();
    if ($date->format('n') < 7) {
        $seasonStartYear = new DateTime('first day of July last Year ' . $date->format('Y'));
        $clonedStartYear = clone $seasonStartYear;
        $seasonEndYear = $clonedStartYear->add(new DateInterval('P1Y'))->sub(new DateInterval('P1D'));
    } else {
        $seasonStartYear = new DateTime('first day of July ' . $date->format('Y'));
        $clonedStartYear = clone $seasonStartYear;
        $seasonEndYear = $clonedStartYear->add(new DateInterval('P1Y'))->sub(new DateInterval('P1D'));
    }

    $title = 'Saison ' . $seasonStartYear->format('Y') . '/' . $seasonEndYear->format('Y');
    if (key_exists($title, $seasons)) {
        return array(
            "id" => $seasons[$title],
            "StartDate" => $seasonStartYear->format('Y-m-d'),
            "EndDate" => $seasonEndYear->format('Y-m-d')
        );
    } else {
        $addedDocRef = $dbSeasons->newDocument();
        $addedDocRef->add(array(
            'id' => $addedDocRef->id(),
            'title' => $title,
            'isImported' => true,
            'description' => 'Alle Informationen zur Saison ' . $seasonStartYear->format('Y') . '/' . $seasonEndYear->format('Y'),
            'creation' => generateCreation(),
            'publication' => generatePublication()
        ));
        return array(
            "id" => $addedDocRef->id(),
            "StartDate" => $seasonStartYear->format('Y-m-d'),
            "EndDate" => $seasonEndYear->format('Y-m-d')
        );
    }
}


function getMainTeamCategoryName($teamCategoryName)
{
    $returnString = '';
    if (strpos($teamCategoryName, 'Junior') !== false) {
        $returnString .= 'Junioren';
    }
    if (strpos($teamCategoryName, 'Seniorinnen') !== false || strpos($teamCategoryName, 'Frauen') !== false) {
        $returnString .= 'Seniorinnen';
    }
    if (strpos($teamCategoryName, 'Senioren') !== false || strpos(strtolower($teamCategoryName), 'herren') !== false) {
        $returnString .= 'Senioren';
    }
    return $returnString;
}

function setMatchDate($row, $savedDate)
{
    // format Mo, 14.07.14 | 19:00 Altherren-D Ü60 | Kreisfreundschaftsspiele FS | 400035002
    // oder   15:00 Herren | Landesliga ME | 430022029
    $parts = explode('|', trim(strip_tags($row)));
    preg_match('~,(.*?)\|~', $row, $output); // "Ausschneiden des Datums zwischen , und |
    // Fall 1:
    if (count($output) === 2) {
        $date = trim($output[1]);
        $time = substr(trim($parts[1]), 7, 5);
        return DateTime::createFromFormat('d.m.y H:i', $date . " " . $time);
    } else {
        $time = substr(trim($row), 0, 5);
        if ($savedDate) {
            return DateTime::createFromFormat('d.m.y H:i', $savedDate->format('d.m.y') . " " . $time);
        } else {
            return false;
        }
    }
}

function getMatchDuration($teamCategoryName, $matchData)
{
    switch ($teamCategoryName) {
        case "A-Junioren":
            $matchDuration = 95;
            break;
        case "B-Junioren":
            $matchDuration = 90;
            break;
        case "C-Junioren":
            $matchDuration = 80;
            break;
        case "D-Junioren":
            $matchDuration = 70;
            break;
        case "E-Junioren":
            $matchDuration = 60;
            break;
        case "F-Junioren":
        case "G-Junioren":
            $matchDuration = 50;
            break;
        case "Altherren-A Ü32":
            $matchDuration = 85;
            break;
        default:
            $matchDuration = 105;
            break;
    }
    if (gettype($matchData["matchStartDate"]) === 'object') {
        $clone = clone $matchData["matchStartDate"];
        return $clone->modify('+' . $matchDuration . ' minute');
    }
    return false;
}

function getLocationCategoryName($locationCategoryName)
{
    $returnString = '';
    if (strpos($locationCategoryName, 'Hartplatz') !== false) {
        $returnString .= 'Hartplätze';
    }
    if (strpos($locationCategoryName, 'Rasenplatz') !== false) {
        $returnString .= 'Rasenplätze';
    }
    if (strpos($locationCategoryName, 'Kunstrasen') !== false) {
        $returnString .= 'Kunstrasenplätze';
    }
    if (strpos($locationCategoryName, 'Halle') !== false) {
        $returnString .= 'Hallen';
    }
    return $returnString;
}

function isTeamFromClub($team1, $team2, $clubTitle, $matchData)
{
    if (strpos($team1["name"], $clubTitle) !== false)
        return true;
    elseif (strpos($team2["name"], $clubTitle) !== false)
        return false;
    elseif (strpos($team1["name"], 'Bliesen') !== false
        && strpos($matchData["assignedCategories"]["assignedCategory"], 'Junioren') !== false)
        return true;
    else {
        return false;
    }
}

function generateCreation()
{
    $now = new DateTime();
    return array(
        'from' => 'system',
        'at' => $now->format(DATE_ISO8601)
    );
}

function generatePublication()
{
    return array(
        'from' => '',
        'at' => '',
        'status' => 0
    );
}

function generateMatchPlanTable($matches)
{

    $returnString = '';
    $returnString .= '<table class="table table-striped table-bordered table-hover table-sm">';
    $returnString .= '<thead class="thead-light">';
    $returnString .= '<tr>';
    $returnString .= '<th>Nr.</th>';
    $returnString .= '<th>Match-Type</th>';
    $returnString .= '<th>Kategorien</th>';
    $returnString .= '<th>Spielort</th>';
    $returnString .= '<th>Start</th>';
    $returnString .= '<th>Ende</th>';
    $returnString .= '<th>Heim</th>';
    $returnString .= '<th>Gast</th>';
    $returnString .= '<th>Link</th>';
    $returnString .= '</tr>';
    $returnString .= '</thead>';
    $returnString .= '<tbody>';

    $i = 1;
    foreach ($matches AS $match) {
        $returnString .= generateMatchPlanRow($match, $i);
        $i++;
    }

    $returnString .= '</tbody>';
    $returnString .= '</table>';

    return $returnString;
}

function generateMatchPlanRow($match, $i)
{
    $returnString = '<tr>';
    $returnString .= '<td scope="row">' . $i . '</td>';
    $returnString .= '<td>' . $match["matchType"] . '</td>';

    $returnString .= '<td>';
    foreach ($match["assignedCategories"] AS $category) {
        $returnString .= print_r($category, true);
    }
    $returnString .= '</td>';

    $returnString .= '<td>' . $match["assignedLocation"] . '</td>';
    $returnString .= '<td>' . $match["matchStartDate"]->format('d.m.Y H:i') . '</td>';
    $returnString .= '<td>' . $match["matchEndDate"]->format('H:i') . '</td>';
    $returnString .= '<td><img src="' . $match["homeTeam"]["logo"] . '" alt="' . $match["homeTeam"]["name"] . '"/><br />';
    $returnString .= $match["isHomeTeam"] ? '<b>' . $match["homeTeam"]["name"] . '</b>' : $match["homeTeam"]["name"];
    $returnString .= '</td>';
    $returnString .= '<td><img src="' . $match["guestTeam"]["logo"] . '" alt="' . $match["guestTeam"]["name"] . '"/><br />';
    $returnString .= !$match["isHomeTeam"] ? '<b>' . $match["guestTeam"]["name"] . '</b>' : $match["guestTeam"]["name"];
    $returnString .= '</td>';
    $returnString .= '<td><a target="_blank" href="' . $match["matchLink"] . '">Link</a></td>';
    $returnString .= '</tr>';
    return $returnString;
}

function generateHeader()
{
    return '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></head><body><div class="container-fluid"><h1>Spielplan</h1>';
}

function generateFooter()
{
    return '</div></body></html>';
}