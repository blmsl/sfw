<?php

trait sfwTeam
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $teamCollection = null;
  private $teams = array();

  public function getTeams()
  {
    if (count($this->teams) === 0) {
      $dbTeams = $this->teamCollection;
      foreach ($dbTeams->documents() as $team) {
        $this->teams[$team["title"] . "-" . $team["subTitle"] . "-" . $team["assignedSeason"]] = $team;
      }
    }
    return $this->teams;
  }

  public function saveTeam($team)
  {
    $title = $team["title"] . "-" . $team["subTitle"] . "-" . $team["assignedSeason"];
    if (!key_exists($title, $this->getTeams())) {
      $this->teams[$title] = $this->saveFireStoreObject($this->teamCollection, $team);
    }
    return $this->teams[$title];
  }

  public function getMainTeamCategoryName($teamCategoryName)
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

  function isTeamFromClub($team1, $clubTitle, $mainCategoryName)
  {
    if ($team1 === $clubTitle
      || strpos($team1["title"], $clubTitle) !== false
      || strpos($team1["title"], 'Bliesen') !== false && (strpos($mainCategoryName, 'Junioren') !== false) || $mainCategoryName === 'Junioren')
      return true;
    else {
      return false;
    }
  }

}
