<?php

trait sfwMatch
{
    /**
     * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $matchCollection = null;
    private $matches = array();

    /**
     * @param $match
     * @param $team array
     * @param $location
     * @param $teamCategory
     * @param $teamMainCategory
     * @param $batch
     * @return mixed
     */
    public function saveMatch($match, $team, $location, $teamCategory, $teamMainCategory, $batch)
    {
        $title = $match['assignedCategories']["assignedCategory"] . ': ' . $match['homeTeam']['title'] . ' – ' . $match['guestTeam']['title'];

        $otherEvent = null;
        if(key_exists('result', $match) && key_exists('result', $match)){
            $otherEvent = $match['result']['otherEvent'];
        }

        if (key_exists('newStartDate', $match))
            $otherEvent = array(
                'otherEvent' => sprintf(' <u>(verlegt auf %1$s)</u>', $match['newStartDate']->format(SFW_DATE_FORMAT))
            );

        return $this->saveFireStoreObject(
            $this->matchCollection,
            array(
                'title' => $title,
                'assignedCategories' => array($teamCategory, $teamMainCategory),
                'assignedLocation' => $location ? $location["id"] : null,
                'assignedTeam' => $team["id"],
                'guestTeam' => $match["guestTeam"],
                'homeTeam' => $match["homeTeam"],
                'isHomeTeam' => $match["isHomeTeam"],
                'matchEndDate' => $match["matchEndDate"],
                'matchLink' => $match["matchLink"],
                'matchStartDate' => $match["matchStartDate"],
                'matchType' => $match["matchType"],
                'matchId' => $match["matchID"],
                'result' => $otherEvent
            ),
            $batch);
    }

    /**
     * @param $startDate DateTime
     * @param $endDate DateTime
     * @return array
     */
    public function getMatchesBetweenStartAndEndDate($startDate, $endDate)
    {
        $matchList = [];
        $startDate->setTimezone(new DateTimeZone('UTC'));
        $endDate->setTimezone(new DateTimeZone('UTC'));

        $query = $this->matchCollection
            ->where('matchStartDate', '>=', $startDate)
            ->where('matchStartDate', '<=', $endDate);
        foreach ($query->documents() as $doc) {
            $matchList[$doc["title"] . '-' . $doc["matchLink"]] = array('id' => $doc['id']);
        }
        return $matchList;
    }

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
     * @param $doc \duzun\hQuery\Node
     * @param $clubTitle string
     * @return array
     */
    public function scrapeMatchPlan($doc, $clubTitle)
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

                    tk_print('if has class <u>row-headline</u>', $item->text());

                    $parts = explode('|', $item->text());

                    if (preg_match("/\d{2}.\d{2}.\d{4}/", $parts[0], $regex_match_date)) { // if dd.mm.yyyy found
                        if (preg_match("/\d{2}:\d{2}/", $parts[0], $regex_match_time)) {
                            $matchData["_matchStartDate"] = DateTime::createFromFormat('d.m.Y H:i', $regex_match_date[0] . ' ' . $regex_match_time[0]);
                        }
                    }

                    $matchData["assignedCategories"] = array(
                        "assignedCategory" => trim($parts[1]),
                        "assignedMainCategory" => $this->getTeamMainCategoryName(trim($parts[1]))
                    );

                    # $matchData["assignedGender"] = $this->getTeamMainGenderName(trim($parts[1]));


                } elseif ($item->hasClass("odd row-competition hidden-small") || $item->hasClass("row-competition hidden-small")) {
                    tk_print('if has class <u>hidden-small</u>', $item->text());

                    $matchData["matchStartDate"] = @$matchData["_matchStartDate"] ?: $this->extractMatchDate($item);
                    if ($matchData["matchStartDate"] === false) $matchData["dontShowThis"] = true;
                    tk_print('its_date', $matchData["matchStartDate"]);

                    $matchData["matchType"] = $this->extractMatchType($item);
                    tk_print('its_team', $matchData["matchType"]);

                    $matchData["matchID"] = $this->extractMatchID($item);
                    tk_print('its_id', $matchData["matchID"]);

                    tk_print('dont_show', @$matchData["dontShowThis"] ?: false);


                    if (key_exists("assignedMainCategory", $matchData["assignedCategories"])) {
                        $matchData["matchEndDate"] = $this->getMatchDuration($matchData["assignedCategories"]["assignedCategory"], $matchData["matchStartDate"]);
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
                        if ($cell->attr('class') === 'column-club') {

                            $matchData["homeTeam"]["title"] = str_replace("&#8203;", "", trim($cell->text()));
                            $matchData["homeTeam"]["externalTeamLink"] = $cell->find('.club-wrapper') ? $cell->find('.club-wrapper')[0]->attr('href') : '';
                            $matchData["homeTeam"]["logoURL"] = $cell->find('.table-image span') ? str_replace('format/3', 'format/2', $cell->find('.table-image span')[0]->attr('data-responsive-image')) : '';

                            $matchData["isHomeTeam"] = $this->isTeamFromClub($matchData["homeTeam"]["title"], $clubTitle, $matchData["assignedCategories"]["assignedMainCategory"]);

                        } elseif ($cell->attr('class') === 'column-club no-border') {

                            $matchData["guestTeam"]["title"] = str_replace("&#8203;", "", trim($cell->text()));
                            $matchData["guestTeam"]["externalTeamLink"] = $cell->find('.club-wrapper') ? $cell->find('.club-wrapper')[0]->attr('href') : '';
                            $matchData["guestTeam"]["logoURL"] = $cell->find('.table-image span') ? str_replace('format/3', 'format/2', $cell->find('.table-image span')[0]->attr('data-responsive-image')) : '';

                        } elseif ($cell->attr('class') === 'column-score') {

                            // ToDo: 14.08.2018 19:00 || 'T' || 't' || 'U' || 'W' || 'V'
                            if (in_array(trim($cell->text()), array('Absetzung', 'Ausfall', 'Nichtantritt BEIDE', 'Nichtantritt GAST', 'Nichtantritt HEIM'))) {
                                $matchData["result"]["otherEvent"] = trim($cell->text());
                                tk_print('its_otherEvent', $matchData["result"]["otherEvent"]);
                            } elseif ($newStartDate = DateTime::createFromFormat('d.m.Y H:i', trim($cell->text()))) {
                                $matchData["newStartDate"] = $newStartDate;
                                tk_print('its_new_startdate', $newStartDate);
                            }

                        } elseif ($cell->attr('class') === 'column-detail') {
                            $matchData["matchLink"] = $cell->find('a') ? $cell->find('a')[0]->attr('href') : '';
                        }
                    }
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

        $newDate = null;

        if (!is_null($startDate) && is_object($startDate)) {
            $newDate = clone $startDate;
            $newDate = $newDate->modify('+' . $matchDuration . ' minute');
        }

        return $newDate;
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
                echo "<br /> <h5>PARTS: </h5>";
                var_dump($parts);
                echo "<br /> <h5>SUBSTR & ROW: </h5>";
                echo substr($row, 0, 5);
                var_dump($row);
            }
        }
    }

    public function extractMatchDate($element)
    {
        $matchDate = $element->find('.column-date')->text();
        $extractedValue = false;

        tk_print('extract_match_date', "called");

        if (empty($matchDate)) return $extractedValue;

        if (strlen($matchDate) == 5) {
            $extractedValue = DateTime::createFromFormat('H:i', $matchDate);
        } else {
            $justDate = substr(trim($matchDate), 4, 8);
            $justTime = substr(trim($matchDate), -5);
            $extractedValue = DateTime::createFromFormat('d.m.y H:i', "$justDate $justTime");
        }

        return $extractedValue;
    }

    public function extractMatchType($element)
    {
        $matchType = $element->find('.column-team')->text();

        if (empty($matchType)) return null;

        $parts = explode('|', $matchType);
        return trim($parts[1]);
    }

    public function extractMatchID($element)
    {
        $fullText = $element->text();
        $fullTextArr = explode('|', $fullText);
        $lastEl = array_values(array_slice($fullTextArr, -1))[0];
        $lastEl = trim($lastEl);

        return $lastEl;
    }


    public function generateMatchPlanTable($matches)
    {
        $returnString = '';
        $returnString .= '<table class="table table-striped table-bordered table-hover table-sm">' . PHP_EOL;
        $returnString .= '<thead class="thead-light">' . PHP_EOL;
        $returnString .= '<tr>' . PHP_EOL;
        $returnString .= '<th>Nr.</th>' . PHP_EOL;
        $returnString .= '<th>Titel</th>' . PHP_EOL;
        $returnString .= '<th>Match-Type</th>' . PHP_EOL;
        $returnString .= '<th>Kategorien</th>' . PHP_EOL;
        $returnString .= '<th>Spielort</th>' . PHP_EOL;
        $returnString .= '<th>Start</th>' . PHP_EOL;
        $returnString .= '<th>Ende</th>' . PHP_EOL;
        $returnString .= '<th>Heim</th>' . PHP_EOL;
        $returnString .= '<th>Gast</th>' . PHP_EOL;
        $returnString .= '<th>Link</th>' . PHP_EOL;
        $returnString .= '</tr>' . PHP_EOL;
        $returnString .= '</thead>' . PHP_EOL;
        $returnString .= '<tbody>' . PHP_EOL;

        foreach ($matches AS $match) {
            if (@$match["dontShowThis"] !== true) {
                $returnString .= @$this->generateMatchPlanRow($match);
            }
        }

        $returnString .= '</tbody>' . PHP_EOL;
        $returnString .= '</table>' . PHP_EOL;

        return $returnString;
    }

    /**
     * @param callable|string $innerHTML
     * @return string
     */
    function generateMatchPlanColumn($innerHTML)
    {
        if (is_callable($innerHTML)) $innerHTML = $innerHTML();
        return "<td>$innerHTML</td>" . PHP_EOL;
    }

    function generateMatchPlanRow($match)
    {
        if (empty($match)) return '';

        $html = "<tr>";
        $html .= $this->generateMatchPlanColumn($match['matchID']);
        $html .= $this->generateMatchPlanColumn(function () use ($match) {
            $end = $match['assignedCategories']["assignedCategory"] . ': ' . $match['homeTeam']['title'] . ' – ' . $match['guestTeam']['title'];
            if (key_exists('newStartDate', $match)) $end .= sprintf(' <u>(verlegt auf %1$s)</u>', $match['newStartDate']->format(SFW_DATE_FORMAT));
            return $end;
        });
        $html .= $this->generateMatchPlanColumn($match['matchType']);
        $html .= $this->generateMatchPlanColumn(implode(" | ", $match['assignedCategories']));
        $html .= $this->generateMatchPlanColumn(function () use ($match) {
            if (!empty($match['assignedLocation'])) {
                $location = $match['assignedLocation']['address'];
                $street = $location['streetName'] . (!empty($location['houseNumber']) ? ' ' . $location['houseNumber'] : '');
                return $street . ', ' . $location['zip'] . ' ' . $location['city'];
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
            '<a target="_blank" href="' . $match['matchLink'] . '">Spiel</a>'
        );
        $html .= "</tr>";

        return $html;
    }


}
