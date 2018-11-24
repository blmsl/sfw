<?php

trait sfwClub
{
    /**
     * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $clubCollection = null;
    private $clubs = array();

    public $defaultClub = array(
        "title" => "SF Winterbach",
        "fussballde" => array(
            "clubId" => '00ES8GNBEO00001UVV0AG08LVUPGND5I',
            "clubUrl" => 'http://www.fussball.de/verein/sf-winterbach-saarland/-/id/00ES8GNBEO00001UVV0AG08LVUPGND5I'
        )
    );

    /**
     * @param $data array
     * @param $batch \Google\Cloud\Firestore\WriteBatch
     * @return array
     */
    public function getClubByTitle($data, $batch)
    {
        $query = $this->clubCollection->where('title', '=', $data["title"]);
        $snapshot = $query->documents();

        if ($snapshot->isEmpty()) {
            return $this->saveFireStoreObject($this->clubCollection, $data, $batch);
        }

        if ($snapshot->size() === 1) {
            foreach ($snapshot as $doc) {
                return array(
                    'id' => $doc["id"],
                    'title' => $doc["title"],
                    'fussballde' => array(
                        'clubId' => $doc["fussballde"]["clubId"],
                        'clubUrl' => $doc["fussballde"]["clubUrl"]
                    ),
                    array('management' => array())
                );
            }
        }
    }

}
