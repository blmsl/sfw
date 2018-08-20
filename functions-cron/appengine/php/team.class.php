<?php

trait sfwTeam
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $teamCollection = null;
  private $teams = array();

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
  }

  public function getTeamsBySeason($season){
    $teamList = [];
    $query = $this->teamCollection->where('assignedSeason', '=', $season["id"]);
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

}
