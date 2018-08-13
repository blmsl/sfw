<?php

trait sfwSeason
{
    /**
     * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $seasonCollection = null;
    private $seasons = array();

    /**
     * @param $seasonStartYear DateTime
     * @param $seasonEndYear DateTime
     * @return array
     */
    public function getSeasonByDate($seasonStartYear, $seasonEndYear)
    {
        $title = 'Saison ' . $seasonStartYear->format('Y') . '/' . $seasonEndYear->format('Y');

        $query= $this->seasonCollection->where('title', '=', $title);

        $snapshot = $query->documents();

        if($snapshot->isEmpty()){
            // create season within batch
        }

        // return first season with that title
        if($snapshot->size() === 1){
            foreach ($snapshot as $doc) {
                return $this->seasons[$doc["title"]] = array(
                    'id' => $doc["id"]
                );
            }
        }
    }

    private function saveSeason($data, $seasonList)
    {
        if (!key_exists($data["title"], $seasonList)) {
            return $this->saveFireStoreObject($this->seasonCollection, $data, null);
        } else {
            return $seasonList[$data["title"]];
        }
    }

    public function getCurrentSeason($startDate)
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
            return array('startYear' => $seasonStartYear, 'endYear' => $seasonEndYear);
        } catch (Exception $e) {
            var_dump($e);
            exit();
        }
    }

    private function setSeason($startDate, $seasonList)
    {
        $seasonDates = $this->getCurrentSeason($startDate);
        /**
         * @var $seasonStartYear DateTime
         * @var $seasonEndYear DateTime
         */
        $seasonStartYear = $seasonDates['startYear'];
        $seasonEndYear = $seasonDates['endYear'];

        $title = 'Saison ' . $seasonStartYear->format('Y') . '/' . $seasonEndYear->format('Y');
        return $this->saveSeason(array(
            'title' => $title,
            'isImported' => true,
            'description' => 'Alle Informationen zur Saison ' . $seasonStartYear->format('Y') . '/' . $seasonEndYear->format('Y')
        ), $seasonList);

    }

    public function generateSeasonHeading($season)
    {
        /**
         * @var $startDate DateTime
         * @var $endDate DateTime
         */
        $startDate = $this->getSeasonStartDate($season);
        $endDate = $this->getSeasonEndDate($season);
        return "<h4>Spielplan&nbsp; <small>" . $startDate->format('d.m.Y') . " &ndash; " . $endDate->format('d.m.Y') . "</small></h4>";
    }

    /**
     * @param $season DateTime
     * @return DateTime
     */
    public function getSeasonStartDate($season)
    {
        return DateTime::createFromFormat('d.m.Y H:i:s', '01.07.' . $season->format('Y') . ' 00:00:00');
    }

    /**
     * @param $season DateTime
     * @return DateTime
     */
    public function getSeasonEndDate($season)
    {
        return DateTime::createFromFormat('d.m.Y H:i:s', '30.06.' . $season->format('Y') . ' 23:59:59')->modify('+1 year');
    }

}
