<?php

trait sfwMatch
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $matchCollection = null;
  private $matches = array();

  /**
   * @param $club
   * @param $startDate DateTime
   * @param $endDate DateTime
   * @return mixed
   */
  public function getMatchesForClubAndDateInterval($club, $startDate, $endDate)
  {
    $matchList = array();
    foreach ($dbMatches = $this->matchCollection->documents() AS $doc) {
      /**
       * @var $doc array
       */
      if ($doc["assignedClub"] === $club["id"]
        && $doc["matchStartDate"]->get()->format('d.m.Y H:i:s') === $startDate->format('d.m.Y H:i:s')
        && $doc["matchEndDate"]->get()->format('d.m.Y H:i:s') === $endDate->format('d.m.Y H:i:s')) {
        $matchList[$doc["title"] . '-' . $doc["assignedLocation"] . '-' . $doc["matchStartDate"]->get()->format('d.m.Y H:i:s')] = $doc;
      }
    }
    return $matchList;
  }

  /**
   * @return array
   */
  public function getMatches()
  {
    if (count($this->matches) === 0) {
      $dbMatches = $this->matchCollection;
      foreach ($dbMatches->documents() as $doc) {
        /**
         * @var $doc array
         */
        $title = $doc["id"] . "-" . $doc["title"] . '-' . $doc["assignedLocation"] . '-' . $doc["matchStartDate"]->get()->format('d.m.Y H:i:s');
        echo $title . "<br />";
        $this->matches[$title] = $doc;
      }
    }
    return $this->matches;
  }


  public function saveMatch($matchData)
  {
    /**
     * @var $matchData array
     */
    #$startDate = new DateTime($matchData["matchStartDate"]->format(DATE_ATOM), new DateTimeZone(date_default_timezone_get()));
    #$startDate->setTimezone(new DateTimeZone('UTC'));
    #$endDate = new DateTime($matchData["matchEndDate"]->format(DATE_ATOM), new DateTimeZone(date_default_timezone_get()));
    #$endDate->setTimezone(new DateTimeZone('UTC'));
    $title = $matchData["title"] . '-' . $matchData["assignedLocation"] . '-' . $matchData["matchStartDate"]->format('d.m.Y H:i:s');
    if (!key_exists($title, $this->getMatches())) {
      $this->matches[$title] = $this->saveFireStoreObject($this->matchCollection, $matchData);
    }
  }

  /**
   * @param $club
   * @param $startDate DateTime
   * @param $endDate DateTime
   * @return mixed
   */
  public function getMatchPlan($club, $startDate, $endDate)
  {
    $url = 'http://www.fussball.de/ajax.club.matchplan/-/id/' . $club["fussballde"]["clubId"] . '/mime-type/HTML/mode/PAGE/show-filter/false/max/9999/datum-von/' . $startDate->format('Y-m-d') . '/datum-bis/' . $endDate->format('Y-m-d') . '/show-venues/checked/offset/0';
    return $this->curlRequest($url);
  }

  public function scrap_matchPlan($html, $club, $season)
  {
    $savedMatchDate = NULL;
    $i = 0;
    $output = array();
    $matchData = array();
    $assignedCategory = null;

    /**
     * @var $html simple_html_dom_node
     */
    if ($html && is_object($html) && isset($html->nodes)) {
      $items = $html->find("div.fixtures-matches-table > table > tbody > tr");
      // echo count($items);
      # echo "<br />";
      foreach ($items AS $item) {

        # echo $i . "<br />";

        $mainCategoryName = '';

        if ($i > 0) {
          /**
           * @var $item simple_html_dom_node
           */
          if ($item->getAttribute('class') === "row-headline visible-small") {

            // Spielart (z.B. Kreisfreundschaftsspiele) festlegen // weiter unten werden weitere Details geladen
            $parts = explode('|', $item->plaintext);
            $matchData["matchType"] = trim($parts[2]);

            // setze die Saison
            $assignedCategory = trim($parts[1]);
            $mainCategoryName = $this->getMainTeamCategoryName(trim($parts[1]));

            $matchData["assignedCategories"] = array(
              "assignedCategory" => $this->saveCategory(trim($parts[1]), $this->categoryTypes['team.types']["id"])["id"],
              "assignedMainCategory" => $this->saveCategory($mainCategoryName, $this->categoryTypes['team.types']["id"])["id"]
            );

          } elseif ($item->getAttribute('class') === "odd row-competition hidden-small" || $item->getAttribute('class') === "row-competition hidden-small") {

            $matchDate = $this->setMatchDate($item->plaintext, $savedMatchDate);
            if ($matchDate && key_exists("assignedMainCategory", $matchData["assignedCategories"])) {
              $matchData["matchStartDate"] = $savedMatchDate = $matchDate;
              $matchData["matchEndDate"] = new DateTime(); #$this->getMatchDuration($mainCategoryName, $matchData["matchStartDate"]);
            }

          } // Treffpunkt und Platzartz
          elseif ($item->getAttribute('class') === "odd row-venue hidden-small" || $item->getAttribute('class') === "row-venue hidden-small") {

            // Treffpunkt-Kategorie
            $parts = explode(',', $item->plaintext);
            $locationCategoryName = $this->getLocationCategoryName(trim($parts[0]));
            $locationCategoryNameIndex = $locationCategoryName . '-' . $this->categoryTypes["location.types"]["id"];
            if (!key_exists($locationCategoryNameIndex, $this->categories)) {
              $this->categories[$locationCategoryNameIndex] = $this->saveCategory($locationCategoryName, $this->categoryTypes["location.types"]["id"]);
            }
            $matchData["assignedCategories"]['assignedLocationCategory'] = $this->categories[$locationCategoryNameIndex]["id"];

            $address = $this->generateAddressArray($parts);
            $title = trim($parts[0]) . ' ' . $address['streetName'] . ', ' . $address['city']; //. ' ' .$address['city']. ', ' . $address['zip'] . ' ' . $address['county'];
            $this->saveLocation($title, $address, $this->categories[$locationCategoryNameIndex]);

            $matchData["assignedLocation"] = $this->locations[$title]["id"];

          } elseif ($item->getAttribute('class') !== "thead hidden-small") {

            foreach ($item->find('td') AS $cell) {
              /**
               * @var $cell simple_html_dom_node
               */
              if ($cell->getAttribute('class') === 'column-club') {
                # echo "Heim:" . $cell->plaintext . "<br />";
                $matchData["homeTeam"]["title"] = str_replace("&#8203;", "", trim($cell->plaintext));
                $matchData["homeTeam"]["externalTeamLink"] = ($cell->find('.club-wrapper', 0) && $cell->find('.club-wrapper', 0) !== null) ? $cell->find('.club-wrapper', 0)->getAttribute('href') : '';
                $matchData["homeTeam"]["logoURL"] = ($cell->find('.table-image span', 0) && $cell->find('.table-image span', 0) !== null) ?
                  str_replace('format/3', 'format/2', $cell->find('.table-image span', 0)->getAttribute('data-responsive-image')) : '';

              } elseif ($cell->getAttribute('class') === 'column-club no-border') {
                $matchData["guestTeam"]["title"] = str_replace("&#8203;", "", trim($cell->plaintext));
                $matchData["guestTeam"]["externalTeamLink"] = ($cell->find('.club-wrapper', 0) && $cell->find('.club-wrapper', 0) !== null) ? $cell->find('.club-wrapper', 0)->getAttribute('href') : '';
                $matchData["guestTeam"]["logoURL"] = ($cell->find('.table-image span', 0) && $cell->find('.table-image span', 0) !== null) ?
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
              $matchData["isHomeTeam"] = $this->isTeamFromClub($matchData["homeTeam"], $club["title"], $mainCategoryName);

              $teamData = null;
              if ($matchData["isHomeTeam"]) {
                $teamData = $matchData["homeTeam"];
              } else {
                $teamData = $matchData["guestTeam"];
              }

              $subTitle = $teamData["title"] ? $teamData["title"] : $club["title"];

              $team = array(
                'title' => $assignedCategory,
                'subTitle' => $subTitle ? $subTitle : $club["title"],
                'assignedClub' => $club["id"],
                "assignedSeason" => $season["id"],
                "isImported" => true,
                "isOfficialTeam" => true,
                'externalTeamLink' => $teamData['externalTeamLink'],
                'logoURL' => $teamData["logoURL"],
                "assignedTeamCategories" => array(
                  $matchData["assignedCategories"]["assignedMainCategory"],
                  $matchData["assignedCategories"]['assignedCategory']
                )
              );
              $matchData["assignedTeam"] = $this->saveTeam($team)["id"];
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
            $matchData["isImported"] = true;
            $matchData["isOfficialMatch"] = true;
            $matchData["title"] = $assignedCategory . ': ' . $matchData["homeTeam"]["title"] . ' - ' . $matchData["guestTeam"]["title"];
            $output[] = $matchData;
            $this->saveMatch($matchData);
            $matchData = [];
          }
        }
        $i++;
      }
      $html->clear();
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

    return $startDate->modify('+' . $matchDuration . ' minute');
  }

  /**
   * @param $row
   * @param $savedDate DateTime
   * @return bool|DateTime
   */
  public function setMatchDate($row, $savedDate)
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
    #$returnString .= '<th>Team</th>';
    $returnString .= '<th>Link</th>';
    $returnString .= '</tr>';
    $returnString .= '</thead>';
    $returnString .= '<tbody>';

    $i = 1;
    foreach ($matches AS $match) {
      $returnString .= $this->generateMatchPlanRow($match, $i);
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
    foreach ($match["assignedCategories"] AS $singleCategory) {
      #$returnString .= $category . '<br />';
      foreach ($this->categories as $title => $category) {
        if ($category['id'] === $singleCategory) {
          $returnString .= $category['title'] . '<br />';
        }
      }
    }
    $returnString .= '</td>';

    foreach ($this->locations as $title => $location) {
      if ($location["id"] === $match["assignedLocation"]) {
        $returnString .= '<td>' . $title . '</td>';
      }
    }

    /**
     * @var $match array
     */
    $returnString .= '<td>' . $match["matchStartDate"]->format('d.m.Y H:i') . '</td>';
    $returnString .= '<td>' . $match["matchEndDate"]->format('H:i') . '</td>';
    $returnString .= '<td><img src="' . $match["homeTeam"]["logoURL"] . '" alt="' . $match["homeTeam"]["title"] . '"/><br />';
    $returnString .= $match["isHomeTeam"] ? '<b>' . $match["homeTeam"]["title"] . '</b>' : $match["homeTeam"]["title"];
    $returnString .= '</td>';
    $returnString .= '<td><img src="' . $match["guestTeam"]["logoURL"] . '" alt="' . $match["guestTeam"]["title"] . '"/><br />';
    $returnString .= !$match["isHomeTeam"] ? '<b>' . $match["guestTeam"]["title"] . '</b>' : $match["guestTeam"]["title"];
    $returnString .= '</td>';

    #foreach($teams as $title => $id) {
    #    if($id === $match["assignedTeam"]) {
    #        $returnString .= '<td>' . $title . '</td>';
    #    }
    #}

    $returnString .= '<td><a target="_blank" href="' . $match["matchLink"] . '">Link</a></td>';
    $returnString .= '</tr>';
    return $returnString;
  }

}
