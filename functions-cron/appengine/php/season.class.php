<?php

trait sfwSeason
{
    /**
     * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $seasonCollection = null;
    private $seasons = array();

    public function getSeasons($seasonDates = null)
    {
        $seasonsList = array();
        if($seasonDates){
            /**
             * @var $seasonStartYear DateTime
             * @var $seasonEndYear DateTime
             */
            $seasonStartYear = $seasonDates['startYear'];
            $seasonEndYear = $seasonDates['endYear'];
            $title = 'Saison ' . $seasonStartYear->format('Y') . '/' . $seasonEndYear->format('Y');
            foreach ($this->seasonCollection->where('title', '=', $title)->documents() as $doc) {
                $seasonsList[$doc["title"]] = $doc;
            }
        } else {
            foreach ($this->seasonCollection->documents() as $doc) {
                $seasonsList[$doc["title"]] = $doc;
            }
        }

        if (count($seasonsList) === 0) {
            $currentSeason = $this->setSeason(new DateTime(), $seasonsList);
            $seasonsList[$currentSeason["title"]] = $currentSeason;
        }

        return $seasonsList;
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

    public function getSeasonStartDate($season)
    {
        $parts = explode('/', $season["title"]);
        $startYear = substr($parts[0], -4);
        $startDate = DateTime::createFromFormat('d.m.Y', '01.07.' . $startYear);
        return $startDate;
    }

    public function getSeasonEndDate($season)
    {
        $parts = explode('/', $season["title"]);
        $endYear = substr($parts[1], 0);
        $endDate = DateTime::createFromFormat('d.m.Y', '30.06.' . $endYear);
        return $endDate;
    }

}
