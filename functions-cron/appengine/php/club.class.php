<?php

trait sfwClub
{
    /**
     * @var $matchCollection \Google\Cloud\Firestore\CollectionReference
     */
    public $clubCollection = null;

    private $clubs = array(
        'SF Winterbach' => array(
            "title" => "SF Winterbach",
            "fussballDeName" => 'sf-winterbach-saarland',
            "fussballDeId" => '00ES8GNBEO00001UVV0AG08LVUPGND5I'
        )
    );

    public function getClubDataByTitle($title)
    {
        if (key_exists($title, $this->clubs)) {
            return $this->clubs[$title];
        }
    }


    public function getClubByTitle($title)
    {
        var_dump($this->clubCollection);
        $query = $this->clubCollection->where('title', '==', $title);
        $snapshot = $query->documents();
        var_dump($query);
        echo $snapshot->size();

        if ($snapshot->isEmpty()) {
            // create club or exit with error?!
          return null;
        }

        /* return first season with that title
        if ($snapshot->size() === 1) {
            foreach ($snapshot as $doc) {
                return $this->clubs[$doc["title"]] = array(
                    'id' => $doc["id"],
                    'title' => $doc["title"],
                    'fussballde' => array(
                        'clubId' => $doc["fussballde"]["clubId"],
                        'clubUrl' => $doc["fussballde"]["clubUrl"]
                    )
                );
            }
        } */
    }

}
