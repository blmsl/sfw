<?php

trait sfwMatch
{
    /**
     * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $matchCollection = null;
    private $matches = array();

    /**
     * @param $clubId string
     * @param $startDate DateTime
     * @param $endDate DateTime
     * @return mixed
     */
    public function generateMatchPlanUrl($clubId, $startDate, $endDate)
    {
        return 'http://www.fussball.de/ajax.club.matchplan/-/id/' . $clubId . '/mime-type/HTML/mode/PAGE/show-filter/false/max/9999/datum-von/' . $startDate->format('Y-m-d') . '/datum-bis/' . $endDate->format('Y-m-d') . '/show-venues/checked/offset/0';
    }

    /**
     * @param $doc hQuery_Node
     * @return array
     */
    public function scrapeMatchPlan($doc)
    {
        $savedMatchDate = NULL;
        $i = 0;
        $matchData = array();
        $output = array();

        $items = $doc->find("div.fixtures-matches-table > table > tbody > tr");

        if (!$items) exit('nix gefunden');

        /**
         * @var $item \duzun\hQuery\Element
         */
        foreach ($items AS $item) {

            # echo $i . "<br />";
            # $mainCategoryName = '';
            if ($i >= 0) {

                if ($item->hasClass("row-headline visible-small")) {

                    // reset match_data
                    if (!empty($matchData)) {
                        $output[] = $matchData;
                        $matchData = array();
                    }

                    #tk_print('if has class <u>row-headline</u>', $item->text());

                    if(preg_match("/\d{2}.\d{2}.\d{4}/", $item->text(), $regex_match)) { // if dd.mm.yyyy found
                        $matchData["_matchStartDate"] = DateTime::createFromFormat('d.m.Y H:i', $regex_match[0] . ' ' . '00:00');
                    }


                    $parts = explode('|', $item->text());
                    $matchData["assignedCategories"] = array(
                        "assignedCategory" => trim($parts[1]),
                        "assignedMainCategory" => $this->getTeamMainCategoryName(trim($parts[1]))
                    );


                } elseif ($item->hasClass("odd row-competition hidden-small") || $item->hasClass("row-competition hidden-small")) {
                    tk_print('if has class <u>hidden-small</u>', $item->text());

                    $matchData["matchStartDate"] = $this->extractMatchDate($item) ?: $matchData["_matchStartDate"];
                    tk_print('its_date', $matchData["matchStartDate"]);

                    $matchData["matchType"] = $this->extractMatchType($item);
                    tk_print('its_team', $matchData["matchType"]);

                    $matchData["matchID"] = $this->extractMatchID($item);
                    tk_print('its_id', $matchData["matchID"]);



                    if (key_exists("assignedMainCategory", $matchData["assignedCategories"])) {
                        $matchData["matchEndDate"] = $this->getMatchDuration($matchData["assignedCategories"]["assignedMainCategory"], $matchData["matchStartDate"]);
                    }

                } // Treffpunkt und Platzartz
                elseif ($item->hasClass("row-venue")) { // || $item->hasClass("row-venue hidden-small")

                    $parts = explode(',', trim($item->text()));
                    $matchData["assignedLocation"] = array(
                        'type' => trim($parts[0]),
                        'assignedLocationCategory' => $this->getLocationCategoryName(trim($parts[0])),
                        'address' => $this->generateAddressArray($parts),
                    );


                } else {

                    /**
                     * @var $cell \duzun\hQuery\Element
                     */
                    foreach ($item->find('td') AS $cell) {
                        if($cell->attr('class') === 'column-club') {

                            $matchData["homeTeam"]["title"] = str_replace("&#8203;", "", trim($cell->text()));
                            $matchData["homeTeam"]["externalTeamLink"] = $cell->find('.club-wrapper') ? $cell->find('.club-wrapper')[0]->attr('href') : '';
                            $matchData["homeTeam"]["logoURL"] = $cell->find('.table-image span') ? str_replace('format/3', 'format/2', $cell->find('.table-image span')[0]->attr('data-responsive-image')) : '';

                        } elseif($cell->attr('class') === 'column-club no-border'){

                            $matchData["guestTeam"]["title"] = str_replace("&#8203;", "", trim($cell->text()));
                            $matchData["guestTeam"]["externalTeamLink"] = $cell->find('.club-wrapper') ? $cell->find('.club-wrapper')[0]->attr('href') : '';
                            $matchData["guestTeam"]["logoURL"] = $cell->find('.table-image span') ? str_replace('format/3', 'format/2', $cell->find('.table-image span')[0]->attr('data-responsive-image')) : '';

                        } elseif($cell->attr('class') === 'column-score') {

                            // ToDo: 14.08.2018 19:00 || 'T' || 't' || 'U' || 'W' || 'V'
                            if (in_array(trim($cell->text()), array('Absetzung', 'Ausfall', 'Nichtantritt BEIDE', 'Nichtantritt GAST', 'Nichtantritt HEIM'))) {
                                $matchData["result"]["otherEvent"] = trim($cell->text());
                            } elseif($newStartDate = DateTime::createFromFormat('d.m.Y H:i', trim($cell->text()))){
                                # echo $newStartDate->format('d.m.Y H:i') . "<br />";
                            }

                        } elseif($cell->attr('class') === 'column-detail') {

                            $matchData["matchLink"] = $cell->find('a') ?  $cell->find('a')[0]->attr('href') : '';

                        } else {
                            # echo $cell->attr('class') . "<br />";
                        }
                    }

                    if (key_exists('homeTeam', $matchData) &&
                        key_exists('guestTeam', $matchData) &&
                        key_exists('assignedLocation', $matchData) &&
                        key_exists('isHomeTeam', $matchData) &&
                        key_exists('assignedCategories', $matchData)
                    ) {
                        var_dump($matchData);
                        if (key_exists('assignedCategories', $matchData) && key_exists('assignedMainCategory', $matchData["assignedCategories"])) {
                            $matchData["isHomeTeam"] = $this->isTeamFromClub($matchData["homeTeam"], $matchData["homeTeam"]["title"], $matchData["assignedCategories"]["assignedMainCategory"]);
                        }

                        $teamData = $matchData["isHomeTeam"] ? $matchData["homeTeam"] : $matchData["guestTeam"];

                        $matchData["assignedTeam"] = array(
                            'title' => $matchData['assignedCategories']["assignedCategory"],
                            'subTitle' => $teamData["title"],
                            'externalTeamLink' => $teamData['externalTeamLink'],
                            'logoURL' => $teamData["logoURL"],
                            "assignedTeamCategories" => array(
                                $matchData["assignedCategories"]["assignedMainCategory"],
                                $matchData["assignedCategories"]['assignedCategory']
                            )
                        );
                        var_dump($matchData);
                    }
                }

                // wenn alle Daten vorhanden -> Tabellenzeile generieren
                if (key_exists('assignedTeam', $matchData) &&
                    key_exists('assignedCategories', $matchData) &&
                    key_exists('matchStartDate', $matchData) &&
                    # key_exists('matchEndDate', $matchData) &&
                    key_exists('homeTeam', $matchData) &&
                    key_exists('guestTeam', $matchData) &&
                    key_exists('assignedLocation', $matchData) # &&
                    #key_exists('isHomeTeam', $matchData)
                ) {
                    #$matchData["isImported"] = true;
                    #$matchData["isOfficialMatch"] = true;
                    #$matchData["title"] = $assignedCategory . ': ' . $matchData["homeTeam"]["title"] . ' - ' . $matchData["guestTeam"]["title"];
                    #$output[] = $matchData;
                    #$this->saveMatch($matchData, $batch);
                    #$matchData = [];
                    var_dump($matchData);
                    exit();
                }


            }
            $i++;
        }

        // get last matchData
        if (!empty($matchData)) {
            $output[] = $matchData;
        }

        return $output;
    }


    /**
     * @param $teamCategoryName
     * @param $startDate DateTime
     * @return mixed
     */
    public function getMatchDuration($teamCategoryName, $startDate)
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
        $newDate = clone $startDate;
        return $newDate->modify('+' . $matchDuration . ' minute');
    }

    /**
     * @param $row
     * @param $savedDate DateTime
     * @return bool|DateTime
     */
    public function setMatchDate($row, $savedDate)
    {
        $row = str_replace(array("\r", "\n", "\t"), ' ', $row);
        // format Mo, 14.07.14 | 19:00 Altherren-D Ü60 | Kreisfreundschaftsspiele FS | 400035002
        // oder   15:00 Herren | Landesliga ME | 430022029
        $parts = explode('|', strip_tags($row));

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
                /*
                echo "<br /> <h5>PARTS: </h5>";
                var_dump($parts);
                echo "<br /> <h5>SUBSTR & ROW: </h5>";
                echo substr($row, 0,5);
                var_dump($row); */
            }
        }
    }

    public function extractMatchDate($element) {
        $matchDate = $element->find('.column-date')->text();
        $extractedValue = null;

        if (empty($matchDate)) return false;

        if (strlen($matchDate) == 5) {
            $extractedValue = DateTime::createFromFormat('H:i', $matchDate);
        } else {
            $justDate = substr(trim($matchDate), 4, 8);
            $justTime = substr(trim($matchDate), -5);
            $extractedValue = DateTime::createFromFormat('d.m.y H:i', "$justDate $justTime");
        }

        return $extractedValue;
    }

    public function extractMatchType($element) {
        $matchType = $element->find('.column-team')->text();
        return $matchType;
    }

    public function extractMatchID($element) {
        $fullText = $element->text();
        $fullTextArr = explode('|', $fullText);
        $lastEl = array_values(array_slice($fullTextArr, -1))[0];
        $lastEl = trim($lastEl);

        return $lastEl;
    }


    public function generateMatchPlanTable($matches)
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
        #$returnString .= '<th>Team</th>';
        $returnString .= '<th>Link</th>';
        $returnString .= '</tr>';
        $returnString .= '</thead>';
        $returnString .= '<tbody>';

        foreach ($matches AS $match) {
            $returnString .= @$this->generateMatchPlanRow($match);
        }

        $returnString .= '</tbody>';
        $returnString .= '</table>';

        return $returnString;
    }

    /**
     * @param callable|string $innerHTML
     * @return string
     */
    function generateMatchPlanColumn($innerHTML) {
        if (is_callable($innerHTML)) $innerHTML = $innerHTML();
        return "<td>$innerHTML</td>";
    }

    function generateMatchPlanRow($match) {
        if(empty($match)) return "";

        $html = "<tr>";
        $html .= $this->generateMatchPlanColumn($match['matchID']);
        $html .= $this->generateMatchPlanColumn($match['matchType']);
        $html .= $this->generateMatchPlanColumn(implode(" | ", $match['assignedCategories']));
        $html .= $this->generateMatchPlanColumn(function () use ($match) {
            if (!empty($match['assignedLocation'])) {
                $location = $match['assignedLocation']['address'];
                $street = $location['streetName'] . (!empty($location['houseNumber']) ? ' '.$location['houseNumber'] : '');
                return  $street . ', ' . $location['zip'] . ' ' . $location['city'];
            }
            return null;
        });
        $html .= $this->generateMatchPlanColumn($match['matchStartDate']->format(SFW_DATE_FORMAT));
        $html .= $this->generateMatchPlanColumn($match['matchEndDate']->format(SFW_DATE_FORMAT));
        $html .= $this->generateMatchPlanColumn(function () use ($match) {
            return sprintf(
                '<img width="60px" src="%2$s" alt="logo" /> <a href="%1$s"> %3$s</a>',
                $match['homeTeam']['externalTeamLink'],
                $match['homeTeam']['logoURL'],
                $match['homeTeam']['title']
            );
        });
        $html .= $this->generateMatchPlanColumn(function () use ($match) {
            return sprintf(
                '<img width="60px" src="%2$s" alt="logo" /> <a href="%1$s"> %3$s</a>',
                $match['guestTeam']['externalTeamLink'],
                $match['guestTeam']['logoURL'],
                $match['guestTeam']['title']
            );
        });
        $html .= $this->generateMatchPlanColumn(
            '<a target="_blank" href="'.$match['matchLink'].'">Spiel</a>'
        );
        $html .= "</tr>";

        return $html;
    }

    /* function generateMatchPlanRow($match, $i)
    * {
    * $returnString = '<tr>';
    * $returnString .= '<td scope="row">' . $i . '</td>';
    * $returnString .= '<td>' . $match["matchType"] . '</td>';
    *
    * $returnString .= '<td>';
    * foreach ($match["assignedCategories"] AS $singleCategory) {
    * #$returnString .= $category . '<br />';
    * foreach ($this->categories as $title => $category) {
    * if ($category['id'] === $singleCategory) {
    * $returnString .= $category['title'] . '<br />';
    * }
    * }
    * }
    * $returnString .= '</td>';
    *
    * foreach ($this->locations as $title => $location) {
    * if ($location["id"] === $match["assignedLocation"]) {
    * $returnString .= '<td>' . $title . '</td>';
    * }
    * }
    *
    * /**
    * @var $match array
    *
    * $returnString .= '<td>' . $match["matchStartDate"]->format('d.m.Y H:i') . '</td>';
    * $returnString .= '<td>' . $match["matchEndDate"]->format('H:i') . '</td>';
    * $returnString .= '<td><img src="' . $match["homeTeam"]["logoURL"] . '" alt="' . $match["homeTeam"]["title"] . '"/><br />';
    * $returnString .= $match["isHomeTeam"] ? '<b>' . $match["homeTeam"]["title"] . '</b>' : $match["homeTeam"]["title"];
    * $returnString .= '</td>';
    * $returnString .= '<td><img src="' . $match["guestTeam"]["logoURL"] . '" alt="' . $match["guestTeam"]["title"] . '"/><br />';
    * $returnString .= !$match["isHomeTeam"] ? '<b>' . $match["guestTeam"]["title"] . '</b>' : $match["guestTeam"]["title"];
    * $returnString .= '</td>';
    *
    * #foreach($teams as $title => $id) {
    * #    if($id === $match["assignedTeam"]) {
    * #        $returnString .= '<td>' . $title . '</td>';
    * #    }
    * #}
    *
    * $returnString .= $match["matchLink"] ?
    * '<td><a target="_blank" href="' . $match["matchLink"] . '">Link</a></td>'
    * :
    * '<td>&nbsp;</td>';
    *
    * $returnString .= '</tr>';
    * return $returnString;
    * }*/
}
