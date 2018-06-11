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

function scrap_matchPlan($html, $club, $locations, $teams, $categories, $dbCategories, $categoryTypes)
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
                    if(!key_exists($locationCategoryName, $categories)){
                        $categories[] = saveNewCategory($locationCategoryName, $dbCategories, $categoryTypes["location.types"]);
                    }
                    $matchData["assignedCategories"]['assignedLocationCategory'] = $categories[$locationCategoryName];

                    $title = trim($parts[0]).', '.trim($parts[1]).', '.trim($parts[2]).', '.trim($parts[3]).', '.trim($parts[4]);

                    if(!key_exists($title, $locations)){
                        $locations[] = saveNewLocation($parts, $dbCategories, $categories[$locationCategoryName]);
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
                            $teamData = $matchData["homeTeam"]["name"];
                        } elseif ($matchData["isGuestTeam"]) {
                            $teamData = $matchData["guestTeam"]["name"];
                        }

                        #$matchData["assignedTeam"] = getAssignedTeam($teams, $assignedCategory, $teamData);
                    }
                }

                // wenn alle Daten vorhanden -> Tabellenzeile generieren
                if (#key_exists('assignedTeam', $matchData) &&
                    key_exists('assignedCategories', $matchData) &&
                    key_exists('matchStartDate', $matchData) &&
                    key_exists('matchEndDate', $matchData) &&
                    key_exists('homeTeam', $matchData) &&
                    key_exists('guestTeam', $matchData)
                    #key_exists('assignedLocation', $matchData) &&
                    // $assignedCategory &&
                    #key_exists('isHomeTeam', $matchData)
                ) {
                    $matchData["title"] = $assignedCategory . ': ' . $matchData["homeTeam"]["name"] . ' - ' . $matchData["guestTeam"]["name"];
                    $output[] = $matchData;
                    #var_dump($matchData);
                    #echo "<br />";
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

function saveNewLocation($parts, $dbLocations, $assignedCategory){

    $addedDocRef = $dbLocations->newDocument();

    $streetAndHouseNumber = split_street(trim($parts[3]));

    $data = array(
        "id" => $addedDocRef->id(),
        "title" => trim($parts[0]).', '.trim($parts[1]),
        "isImported" => true,
        "address" => array(
            "city" => trim($parts[1]),
            "county" => substr(trim($parts[4]),6),
            "houseNumber" => $streetAndHouseNumber["number"],
            "streetName" => $streetAndHouseNumber["street"],
            "zip" => substr(trim($parts[4]),0, 5)
        ),
        "assignedCategoryType" => $assignedCategory,
        'creation' => generateCreation()
    );
    var_dump($data);
    exit();


    $addedDocRef->add($data);
    return array(
        $data["title"] => $addedDocRef->id()
    );
}

function saveNewCategory($title, $dbCategories, $assignedCategoryType){
    $addedDocRef = $dbCategories->newDocument();
    $addedDocRef->add(array(
        'id' => $addedDocRef->id(),
        'title' => $title,
        'description' => '',
        'assignedCategoryType' => $assignedCategoryType,
        'creation' => generateCreation(),
        'publication' => generatePublication()
    ));
    return array(
        $title => $addedDocRef->id()
    );
}

function split_street($streetStr)
{

    $aMatch = array();
    $pattern = '/(?P<address>\D+) (?P<number>\d+)(?P<numberAdd>\D*)/';
    preg_match($pattern, $streetStr, $aMatch);

    $street = (isset($aMatch[1])) ? $aMatch[1] : '';
    $number = (isset($aMatch[2])) ? $aMatch[2] : '';
    $numberAddition = (isset($aMatch[3])) ? $aMatch[3] : '';

    return array('street' => $street, 'number' => $number, 'numberAddition' => $numberAddition);

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