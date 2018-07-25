<?php

trait sfwSeason
{
  /**
   * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
   */
  public $seasonCollection = null;
  private $seasons = array();

  public function getSeasons()
  {
    if (count($this->seasons) === 0) {
      $dbSeasons = $this->seasonCollection;
      foreach ($dbSeasons->documents() as $doc) {
        $this->seasons[$doc["title"]] = $doc;
      }
    }
    if (count($this->seasons) === 0) {
      $currentSeason = $this->setSeason(new DateTime());
      $this->seasons[$currentSeason["title"]] = $currentSeason;
    }

    return $this->seasons;
  }

  private function saveSeason($data)
  {
    if (!key_exists($data["title"], $this->seasons)) {
      return $this->saveFireStoreObject($this->seasonCollection, $data);
    } else {
      return $this->seasons[$data["title"]];
    }
  }

  private function setSeason($startDate)
  {
    try {
      $date = $startDate ? $startDate : new DateTime();
      if ($date->format('n') < 7) {
        $seasonStartYear = new DateTime('first day of July last Year ' . $date->format('Y'));
        $clonedStartYear = clone $seasonStartYear;
        $seasonEndYear = $clonedStartYear
          ->add(new DateInterval('P1Y'))
          ->sub(new DateInterval('P1D'));
      } else {
        $seasonStartYear = new DateTime('first day of July ' . $date->format('Y'));
        $clonedStartYear = clone $seasonStartYear;
        $seasonEndYear = $clonedStartYear
          ->add(new DateInterval('P1Y'))
          ->sub(new DateInterval('P1D'));
      }

      $title = 'Saison ' . $seasonStartYear->format('Y') . '/' . $seasonEndYear->format('Y');
      return $this->saveSeason(array(
        'title' => $title,
        'isImported' => true,
        'description' => 'Alle Informationen zur Saison ' . $seasonStartYear->format('Y') . '/' . $seasonEndYear->format('Y')
      ));
    } catch (Exception $e) {
      var_dump($e);
      return false;
    }
  }

  public function generateSeasonHeading($season)
  {
    /**
     * @var $startDate DateTime
     * @var $endDate DateTime
     */
    $startDate = $this->getSeasonStartDate($season);
    $endDate = $this->getSeasonEndDate($season);
    return "<h1>Spielplan&nbsp; <small>" . $startDate->format('d.m.Y') . " &ndash; " . $endDate->format('d.m.Y') . "</small></h1>";
  }

  public function getSeasonStartDate($season)
  {
    $parts = explode('/', $season["title"]);
    $startYear = substr($parts[0], -4);
    $startDate = DateTime::createFromFormat('d.m.Y', '01.07.' . $startYear);
    return  $startDate;
  }

  public function getSeasonEndDate($season){
    $parts = explode('/', $season["title"]);
    $endYear = substr($parts[1], 0);
    $endDate = DateTime::createFromFormat('d.m.Y', '30.06.' . $endYear);
    return $endDate;
  }

}
