<?php

use \Google\Cloud\Firestore\FieldValue;

trait sfwTeam
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $teamCollection = null;
  private $teams = array();

  public function updateTeam($id, $teamPageData, $batch)
  {
    return $this->updateFireStoreObject(
      $this->teamCollection,
      $id,
      $teamPageData,
      $batch);
  }

  public function getTeamByTeamData($teamData, $season, $club, $category, $mainCategory, $batch)
  {

    if ($teamData["title"] === 'Ü32 Senioren') {
      $teamData["title"] = 'Altherren-A Ü32';
    }

    $query = $this->teamCollection
      ->where('title', '=', $category["title"])
      ->where('subTitle', '=', $teamData["title"])
      ->where('assignedClub', '=', $club["id"])
      ->where('assignedSeason', '=', $season["id"]);
    $snapshot = $query->documents();

    if ($snapshot->isEmpty()) {

      return $this->saveFireStoreObject(
        $this->teamCollection,
        array(
          'title' => $category["title"],
          'isOfficialTeam' => true,
          'externalTeamLink' => $teamData["externalTeamLink"],
          'logoURL' => $teamData["logoURL"],
          'subTitle' => $teamData["title"],
          'assignedSeason' => $season["id"],
          'assignedClub' => $club["id"],
          'assignedTeamCategories' => array($category["id"], $mainCategory["id"])
        ),
        $batch);
    }

    // return first season with that title
    if ($snapshot->size() === 1) {
      foreach ($snapshot as $doc) {
        return array(
          'id' => $doc["id"],
          'title' => $doc["title"],
          'subTitle' => $doc["subTitle"],
          'assignedTeamCategories' => $doc["assignedTeamCategories"],
          'assignedSeason' => $doc["assignedSeason"],
          'assignedClub' => $doc["assignedClub"]
        );
      }
    }
    return array();
  }

  public function getTeamsBySeason($season)
  {
    $teamList = [];
    $query = $this->teamCollection->where('assignedSeason', '=', $season["id"]);
    foreach ($query->documents() as $doc) {
      $teamList[$doc["title"] . $doc["subTitle"]] =
        array(
          'id' => $doc['id'],
          'assignedClub' => $doc["assignedClub"],
          'assignedSeason' => $doc["assignedSeason"],
          'externalTeamLink' => $doc["externalTeamLink"],
          'title' => $doc['title'],
          'subTitle' => $doc['subTitle']
        );
    }
    return $teamList;
  }

  public function getTeamsByClubAndSeason($club, $season)
  {
    $teamList = [];
    $query = $this->teamCollection
      ->where('assignedClub', '=', $club["id"])
      ->where('assignedSeason', '=', $season["id"]);
    foreach ($query->documents() as $doc) {
      $teamList[$doc["title"] . $doc["subTitle"]] =
        array(
          'id' => $doc['id'],
          'assignedClub' => $doc["assignedClub"],
          'assignedSeason' => $doc["assignedSeason"],
          'title' => $doc['title'],
          'subTitle' => $doc['subTitle']
        );
    }
    return $teamList;
  }

  public function getTeamMainCategoryName($teamCategoryName)
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

  function isTeamFromClub($teamTitle, $clubTitle, $mainCategoryName)
  {
    if ($teamTitle === $clubTitle
      || strpos($teamTitle, $clubTitle) !== false
      || (strpos($teamTitle, 'Bliesen') !== false && ($mainCategoryName === 'Junioren'))) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @var $doc \duzun\hQuery\Node
   * @return array
   */
  public function scrapeTeamDetailPage($doc)
  {

    $assignedCompetitions = array();
    $competitions = $doc->find(".team-competitions div.factfile-data div div");
    /**
     * @var $competition \duzun\hQuery\Node
     */
    foreach ($competitions AS $competition) {
      if ($competition->find('.value a')) {
        $assignedCompetitions[] = array(
          'title' => $competition->find('.value a')->text(),
          'link' => $competition->find('.value a')->attr('href'),
          'competitionType' => $competition->find('.label')->text()
        );
      }
    }

    $currentStandings = array();
    $standings = $doc->find("#team-fixture-league-tables table tbody tr");
    if ($standings) {
      foreach ($standings as $row) {
        $output_item = array();
        $counter = 0;
        /**
         * @var $row \duzun\hQuery\Node
         */
        $tds = $row->find("td");
        foreach ($tds as $td) {
          if ($counter > 0) {
            $output_item[$this->getCellName($counter)] = trim($td->text());
          }
          $counter++;
        }
        if (!empty($output_item)) {
          $currentStandings[] = $output_item;
        }
      }
    }

    $eventList = array();
    $timeLine = $doc->find('#team-timeline .timeline-content .section ');
    if ($timeLine) {
      /**
       * @var $season \duzun\hQuery\Node
       */
      foreach ($timeLine AS $season) {

        $seasonDates = $this->getSeasonNameFromShortDate($season->find('.season .year'));

        /**
         * @var $event \duzun\hQuery\Element
         */
        foreach ($season->find('.event') as $event) {
          $eventList[] = array(
            'title' => $event->find('.title')->text(),
            'subTitle' => $event->find('.copy')->text(),
            'startDate' => $seasonDates['startDate']->format(DATE_RFC3339),
            'endDate' => $seasonDates['endDate']->format(DATE_RFC3339)
          );

        }
      }
    }

    return [
      ['path' => 'assignedCompetitions', 'value' => $assignedCompetitions],
      ['path' => 'currentStandings', 'value' => $currentStandings],
      ['path' => 'assignedEvents', 'value' => $eventList]
    ];
  }

  public function getCellName($counter)
  {
    $text = '';
    switch ($counter - 1) {
      case 0:
        $text .= "Rank";
        break;
      case 1:
        $text .= "Team";
        break;
      case 2:
        $text .= "Matches";
        break;
      case 3:
        $text .= "Won";
        break;
      case 4:
        $text .= "Draw";
        break;
      case 5:
        $text .= "Lost";
        break;
      case 6:
        $text .= "GoalRel";
        break;
      case 7:
        $text .= "GoalDiff";
        break;
      case 8:
        $text .= "Points";
        break;
    }
    return $text;
  }

}
